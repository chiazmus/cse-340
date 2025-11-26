const utilities = require(".")
const { body, validationResult } = require("express-validator")
const invModel = require("../models/inventory-model")
const validate = {}

validate.ClassificationRules = () => {
return [
    body("classification_name")
    .trim()
    .notEmpty()
    .withMessage("Classification name is required."),
]
}

validate.InventoryRules = () => {
return [
    body("inv_make")
    .trim()
    .notEmpty()
    .withMessage("Item make is required."),
    body("inv_model")
    .trim()
    .notEmpty()
    .withMessage("Item model is required."),
    body("inv_description")
    .trim()
    .notEmpty()
    .withMessage("Item description is required."),
    body("inv_color")
    .trim()
    .notEmpty()
    .withMessage("Item color is required."),
    body("inv_price")
    .trim()
    .notEmpty()
    .isNumeric()
    .withMessage("Item price is required, and must be a number."),
    body("inv_year")
    .trim()
    .notEmpty()
    .isNumeric()
    .withMessage("Item year is required, and must be a number."),
    body("inv_miles")
    .trim()
    .notEmpty()
    .isNumeric()
    .withMessage("Item miles is required, and must be a number."),
    body("classification_id")
    .trim()
    .notEmpty()
    .isNumeric()
    .withMessage("You must choose a classification.")

]
}

validate.checkItemData = async (req, res, next) => {
  const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    let classList = await utilities.buildClassificationList()
    res.render("inventory/add-inventory", {
      errors,
      title: "Add New Item",
      nav,
      classList,
    })
    return
  }
  next()
}

validate.checkClassificationData = async (req, res, next) => {
  const { classification_name } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("inventory/add-classification", {
      errors,
      title: "Add New Classification",
      nav,
    })
    return
  }
  next()
}

module.exports = validate;