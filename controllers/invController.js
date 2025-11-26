const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

const invCont = {};

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId;
  const data = await invModel.getInventoryByClassificationId(classification_id);
  const grid = await utilities.buildClassificationGrid(data);
  let nav = await utilities.getNav();
  const className = data[0].classification_name;
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  });
}

/* ***************************
 *  Build Inventory by item id
 * ************************** */

invCont.buildByInventoryId = async function (req, res, next) {
  const inventory_id = req.params.itemId;
  const data = await invModel.getItemById(inventory_id);
  const itemDiv = await utilities.buildInventoryDiv(data);
  let nav = await utilities.getNav();
  const itemName = `${data.inv_year} ${data.inv_make} ${data.inv_model}`;
  res.render("./inventory/vehicle", {
    title: `${data.inv_year} ${data.inv_make} ${data.inv_model}`,
    nav,
    itemDiv,
  });
}

/* ***************************
 *  Build Management View
 * ************************** */

invCont.buildManagement = async function (req, res, next) {
  let nav = await utilities.getNav();
  res.render("./inventory/management", {
    title: `Inventory Management`,
    nav,
  });
}

/* ***************************
 *  Build Add Classification
 * ************************** */

invCont.buildAddClassification = async function (req, res, next) {
  let nav = await utilities.getNav();
  res.render("./inventory/add-classification", {
    title: `Add New Classification`,
    nav,
  });
}

/* ***************************
 *  Add Classification
 * ************************** */

invCont.addClassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  const { classification_name } = req.body

  const regResult = await invModel.addClassification(classification_name)

  if (regResult) {
    req.flash(
      "notice",
      `Classification ${classification_name} sucessfully added.`
    )
    res.status(201).render("./inventory/management", {
      title: "Inventory Management",
      nav,
    })
  } else {
    req.flash("notice", "Sorry, adding the classification failed.")
    res.status(501).render("./inventory/add-classification", {
      title: "Add New Classification",
      nav,
    })
  }
}

/* ***************************
 *  Build Add Inventory
 * ************************** */

invCont.buildAddInventory = async function (req, res, next) {
  let nav = await utilities.getNav();
  let classList = await utilities.buildClassificationList();
  res.render("./inventory/add-inventory", {
    title: `Add New Item`,
    nav,
    classList,
  });
}

/* ***************************
 *  Add Item
 * ************************** */

invCont.addItem = async function (req, res, next) {
  let nav = await utilities.getNav()
  const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body

  const regResult = await invModel.addItem(inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id)

  if (regResult) {
    req.flash(
      "notice",
      `Item ${inv_make} ${inv_model} sucessfully added.`
    )
    res.status(201).render("./inventory/management", {
      title: "Inventory Management",
      nav,
    })
  } else {
    req.flash("notice", "Sorry, adding the item failed.")
    res.status(501).render("./inventory/add-inventory", {
      title: "Add New Item",
      nav,
    })
  }
}

module.exports = invCont;