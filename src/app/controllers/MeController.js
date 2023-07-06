const Course = require("../models/Course");
const { multipleMongooseToObject } = require("../../util/mongoose");

class MeController {
  // [GET] /me/stored/courses
  // async storedCourses(req, res, next) {
  //   try {
  //     let courseQuery = Course.find();

  //     if (req.query.hasOwnProperty("_sort")) {
  //       const { column, type } = req.query;
  //       courseQuery = courseQuery.sort({ [column]: type });
  //     }

  //     const courses = await courseQuery.exec();
  //     const deletedCount = await Course.countDocumentsDeleted();

  //     res.render("me/stored-courses", {
  //       deletedCount,
  //       courses: multipleMongooseToObject(courses),
  //     });
  //   } catch (err) {
  //     console.error(err);
  //     next(err);
  //   }
  // }
  async storedCourses(req, res, next) {
    try {
      let courseQuery = Course.find();

      if (req.query.hasOwnProperty("_sort")) {
        const isValidtype = ["asc", "desc"].includes(req.query.type);
        const { column, type } = req.query;
        courseQuery = courseQuery.sort({
          [column]: isValidtype ? type : "desc",
        });
      }

      const courses = await courseQuery.exec();
      const deletedCount = await Course.countDocumentsDeleted();

      res.render("me/stored-courses", {
        deletedCount,
        courses: multipleMongooseToObject(courses),
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
