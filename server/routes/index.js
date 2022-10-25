//File name: COMP229-F2022-Midterm-301207863
//Author's name: Threepat Kiatkamol
//student ID: 301207863
//Wep app name: https://comp229-f2022-midterm-30120786.herokuapp.com/employees

// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// define the game model
let employee = require("../models/employees");

/* GET home page. wildcard */
router.get("/", (req, res, next) => {
  res.render("content/index", {
    title: "Home",
    employees: "",
  });
});

module.exports = router;
