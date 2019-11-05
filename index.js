const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const mongoConnect = require("./util/database");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const { get404 } = require("./controllers/error");

const app = express();
const PORT = 4545;

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// app.get("/", (req, res, next) => {
//   res.send("<h1>hello World </h1>");
// });

app.use("/admin", adminRoutes);
app.use(shopRoutes.router);

app.use(get404);

mongoConnect(client => {
  // console.log(client);
  app.listen(PORT, () => {
    console.log(`Server Started on  http://localhost:${PORT}`);
  });
});
