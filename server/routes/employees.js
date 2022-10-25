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
   res.render("employees/add",{title:"Add employee"});
});

// POST process the Employee Details page and create a new Employee - CREATE
router.post("/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let newEmployee = employee({
    Employeeid: req.body.Employeeid,
    Employeename: req.body.Employeename,
    Department: req.body.Department,
    Designation: req.body.Designation,
    Salary: req.body.Salary,
  });
  employee.create(newEmployee,(err,Employee) =>{
    if(err){
      console.log(err);
      res.end(err);
    }else{
      res.redirect("/employees");
    }
  });
});

// GET the Employee Details page in order to edit an existing Employee
router.get("/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let id = req.params.id;

  employee.findById(id, (err, employee) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //show the edit view
      res.render("employees/details", {title: "Edit Employee",employees: employee});

    }
  });
});

// POST - process the information passed from the details form and update the document
router.post("/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let id = req.params.id;

  let updateEmployee = employee({
    _id: id,
    Employeename: req.body.Employeename,
    Department: req.body.Department,
    Designation: req.body.Designation,
    Salary: req.body.Salary,
  });
  employee.updateOne({_id:id}, updateEmployee,(err)=>{
    if(err){
      console.log(err);
      res.end(err);
    } else{
      res.redirect("/employees");
    }
  })

});

// GET - process the delete by specific employeename
// add :Employeename to acquire the parameter  
router.get("/delete/:Employeename", (req, res, next) => {
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
       //refresh employees
       res.redirect("/employees");
     }
   });
});

module.exports = router;
