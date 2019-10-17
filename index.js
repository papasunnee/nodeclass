const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const adminRoutes = require("./routes/admin");

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/admin", adminRoutes);

app.get("/", (req, res, next) => {
  res.send("<h1>Miracle is Here</h1>");
});

app.use("/", (req, res, next) => {
  res.send("<h1>Page Not Found</h1>");
});

app.listen(4545, () => {
  console.log(`Server Started`);
});
