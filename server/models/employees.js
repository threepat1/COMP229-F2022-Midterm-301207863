//File name: COMP229-F2022-Midterm-301207863
//Author's name: Threepat Kiatkamol
//student ID: 301207863
//Wep app name: https://comp229-f2022-midterm-30120786.herokuapp.com/employees

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
