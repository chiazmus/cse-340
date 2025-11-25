// Needed Resources 
const express = require("express");
const router = new express.Router() ;
const Util = require('../utilities/index');
const accountController = require("../controllers/accountController");
const regValidate = require('../utilities/account-validation')

// Route to build the login view
router.get("/login", Util.handleErrors(accountController.buildLogin));

// Route to build the registration view
router.get("/register", Util.handleErrors(accountController.buildRegistration));

// Rout to build the registration posting thingy
// Process the registration data
router.post(
  "/register",
  regValidate.registationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)

module.exports = router;