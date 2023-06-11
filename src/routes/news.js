var express = require("express");
var router = express.Router();

const newsController = require("../app/controllers/NewsController");

// newsController
router.get("/:slug", newsController.show);
router.get("/", newsController.index);

module.exports = router;
