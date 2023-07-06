const path = require("path");
const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
var morgan = require("morgan");
const methodOverride = require("method-override");
const port = 3000;

const SortMiddleware = require("./app/middlewares/SortMiddleware");

const route = require("./routes");
const db = require("./config/db");

//Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, "public")));

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use(methodOverride("_method"));

app.use(SortMiddleware);

//HTTP logger
//app.use(morgan("combined"));

//Teamplate engine
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    helpers: require("./helpers/handlebars"),
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

//Home, Search, contact

// Routes init
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
