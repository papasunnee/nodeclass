const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const { mongoConnect } = require("./util/database");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const { get404 } = require("./controllers/error");

const User = require("./models/user");

const app = express();
const PORT = 4545;

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("5dc3db0f826bb34504e5d44e")
    .then(user => {
      req.user = new User({ ...user });
      console.log({ user });
      next();
    })
    .catch(err => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes.router);
app.use(get404);

mongoConnect(client => {
  app.listen(PORT, () => {
    console.log(`Server Started on  http://localhost:${PORT}`);
  });
});
