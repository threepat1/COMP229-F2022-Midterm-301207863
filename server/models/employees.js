let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// create a model class
let Employee = mongoose.Schema(
  {
    Employeeid: Number,
    Employeename: String,
    Department: String,
    Designation: String,
    Salary: Number,
  },
  {
    collection: "employees",
  }
);

module.exports = mongoose.model("Employee", Employee);
