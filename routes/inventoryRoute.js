// Needed Resources 
const express = require("express");
const router = new express.Router() ;
const invController = require("../controllers/invController");
const Util = require('../utilities/index');

// Route to build inventory by classification view
router.get("/type/:classificationId", Util.handleErrors(invController.buildByClassificationId));

// Route to build inventory item by item Id
router.get("/detail/:itemId", Util.handleErrors(invController.buildByInventoryId));

module.exports = router;
