var express = require("express");

var burger = require("../models/burger.js");


var router = express.Router();

// Import the model (cat.js) to use its database functions.

router.get("/", function(req, res) {
    burger.all(function(data) {
      var hbsObject = {
        burgers: data
      };
      console.log("hsbObject:", hbsObject);
      res.render("index", hbsObject);
    });
  });
  
  router.post("/api/newburger", function(req, res) {
    burger.create(
        req.body.burgername, function(result) {
        // Send back the ID of the new quote
        res.json({ id: result.insertId });
        console.log(res.body);
      });
  });
  
  router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
  
    console.log("condition", condition);
  
    burger.update({
      devoured: true,
    }, condition, function(result) {
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });
  
//   router.delete("/api/cats/:id", function(req, res) {
//     var condition = "id = " + req.params.id;
  
//     cat.delete(condition, function(result) {
//       if (result.affectedRows == 0) {
//         // If no rows were changed, then the ID must not exist, so 404
//         return res.status(404).end();
//       } else {
//         res.status(200).end();
//       }
//     });
//   });
  
  // Export routes for server.js to use.
  module.exports = router;
  