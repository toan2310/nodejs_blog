const Course = require("../models/Course");
const { multipleMongooseToObject } = require("../../util/mongoose");

class MeController {
  // [GET] /me/stored/courses
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

  // [GET] /me/trash/courses
  async trashCourses(req, res, next) {
    try {
      const coursesRaw = await Course.findDeleted().exec();
      res.render("me/trash-courses", {
        courses: multipleMongooseToObject(coursesRaw),
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
}

module.exports = new MeController();
