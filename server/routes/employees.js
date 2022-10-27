//File name: COMP229-F2022-Midterm-301207863
//Author's name: Threepat Kiatkamol
//student ID: 301207863
//Wep app name: https://comp229-f2022-midterm-30120786.herokuapp.com/employees

// modules required for routing
let express = require("express");
const { write } = require("fs");
let router = express.Router();
let mongoose = require("mongoose");

// define the employee model
let employee = require("../models/employees");

/* GET employee List page. READ */
router.get("/", (req, res, next) => {
  // find all employee in the employee_detail collection
  employee.find((err, employees) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("employees/index", {
        title: "Employees",
        employees: employees,
      });
    }
  });
});

//  GET the Employee Details page in order to add a new employee
router.get("/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  //show the add page when you click add employee
   res.render("employees/add",{title:"Add employee"});
});

// POST process the Employee Details page and create a new Employee - CREATE
router.post("/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  //create new employee data on mongo atlas
  let newEmployee = employee({
    Employeeid: req.body.Employeeid,
    Employeename: req.body.Employeename,
    Department: req.body.Department,
    Designation: req.body.Designation,
    Salary: req.body.Salary,
  });
  //create new data
  employee.create(newEmployee,(err,Employee) =>{
    if(err){
      console.log(err);
      res.end(err);
    }else{
      //if successful, it will update on employee list
      res.redirect("/employees");
    }
  });
});

// GET the Employee Details page in order to edit an existing Employee
router.get("/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  //get id params to match with data which we want to edit
  let id = req.params.id;
  //system will find matching id from params
  employee.findById(id, (err, employee) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // if successful, 
      //show the edit view and old information 
      res.render("employees/details", {title: "Edit Employee",employees: employee});

    }
  });
});

// POST - process the information passed from the details form and update the document
router.post("/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  //declare id params that we have
  let id = req.params.id;
  //declare the information of employee that match the query
  let updateEmployee = employee({
    _id: id,
    Employeeid:req.body.Employeeid,
    Employeename: req.body.Employeename,
    Department: req.body.Department,
    Designation: req.body.Designation,
    Salary: req.body.Salary,
  });
  //update the information of employee by id 
  employee.updateOne({_id:id}, updateEmployee,(err)=>{
    if(err){
      console.log(err);
      res.end(err);
    } else{
      //if successful
      //update infomation on employee list
      res.redirect("/employees");
    }
  })

});

// GET - process the delete by specific employeename
// add :Employeename to acquire the parameter  
router.get("/delete", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
    //declare name that get from employee name
   let name = req.params.Employeename;
   //remove the name that choose from collections
   employee.remove({ Employeename:name }, (err) => {
    //if has an error
     if (err) {
      // show the error statement
       console.log(err);
       res.end(err);
     } else {
      // if successful,
       //update on employees list
       res.redirect("/employees");
     }
   });
});

router.get()

module.exports = router;
