const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const db = require("./db");
const bodyParser = require('body-parser')
const PORT = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api", routes);

db.sync().then(() => {
    console.log('Data base synchronized!')
  app.listen(PORT, () => {
    console.log(`The server is listening at port ${PORT}`);
  });
});