const utilities = require("../utilities/")
const baseController = {}

baseController.buildHome = async function(req, res){
  const nav = await utilities.getNav()
  req.flash("notice", "This is a flash message.")
  res.render("index", {title: "Home", nav})
}

baseController.causeError = (req, res, next) => {
  throw new Error("This is a 500 error from the controller!")
}

module.exports = baseController