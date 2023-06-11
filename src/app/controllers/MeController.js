const Course = require("../models/Course");
const { multipleMongooseToObject } = require("../../util/mongoose");

class MeController {
  // [GET] /
  async storedCourses(req, res, next) {
    try {
      const coursesRaw = await Course.find().exec();
      res.render("me/stored-courses", {
        courses: multipleMongooseToObject(coursesRaw),
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  // [GET] /search
}

module.exports = new MeController();
