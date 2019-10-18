const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 4545;
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes.router);

app.use((req, res, next) => {
  res.send("<h1>Page Not Found</h1>");
});

app.listen(PORT, () => {
  console.log(`Server Started on  http://localhost:${PORT}`);
});
