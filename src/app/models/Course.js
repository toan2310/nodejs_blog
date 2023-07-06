const mongoose = require("mongoose");
var slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Schema = mongoose.Schema;

const Course = new Schema(
  {
    _id: { type: Number },
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    videoId: { type: String, required: true },
    level: { type: String },
    slug: { type: String, slug: "name", unique: true },
  },
  {
    _id: false,
    timestamps: true,
  }
);

//Custom query helpers
Course.query.sortabe = function (req) {
  if (req.query.hasOwnProperty("_sort")) {
    const isValidtype = ["asc", "desc"].includes(req.query.type);
    const { column, type } = req.query;
    return this.sort({
      [column]: isValidtype ? type : "desc",
    });
  }
  return this;
};

mongoose.plugin(slug);

Course.plugin(AutoIncrement);
Course.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

module.exports = mongoose.model("Course", Course);
