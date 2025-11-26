// Needed Resources 
const express = require("express");
const router = new express.Router() ;
const invController = require("../controllers/invController");
const Util = require('../utilities/index');
const invValidate = require('../utilities/inventory-validation')

// Route to build inventory by classification view
router.get("/type/:classificationId", Util.handleErrors(invController.buildByClassificationId));

// Route to build inventory item by item Id
router.get("/detail/:itemId", Util.handleErrors(invController.buildByInventoryId));

// Route to build item management
router.get("/", Util.handleErrors(invController.buildManagement));

// Route to build classification adding
router.get("/add-classification", Util.handleErrors(invController.buildAddClassification));

// Route to build inventory adding
router.get("/add-inventory", Util.handleErrors(invController.buildAddInventory));

// Handle Adding the classification
router.post(
  "/add-classification",
  invValidate.ClassificationRules(),
  invValidate.checkClassificationData,
  Util.handleErrors(invController.addClassification),
)

// Handle Adding the inventory
router.post(
  "/add-inventory",
  invValidate.InventoryRules(),
  invValidate.checkItemData,
  Util.handleErrors(invController.addItem),
)

module.exports = router;
