const Course = require("../models/Course");
const { multipleMongooseToObject } = require("../../util/mongoose");

class SiteController {
  // [GET] /
  async index(req, res, next) {
    try {
      const coursesRaw = await Course.find().exec();
      res.render("home", {
        courses: multipleMongooseToObject(coursesRaw),
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  // [GET] /search
  search(req, res) {
    res.render("search");
  }
}

module.exports = new SiteController();
