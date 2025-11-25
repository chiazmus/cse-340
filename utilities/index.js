const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>';
      grid += '</div>'
      grid += '</li>'
    });
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

/* **************************************
* Build the item view HTML
* ************************************ */

Util.buildInventoryDiv = async function(data){
  let div
  console.log(data)
  if (data) {
    div = `<div id="item-display">
      <img src="${data.inv_image}" alt="Image of ${data.inv_make} ${data.inv_model} on CSE Motors">
      <div id="details">
          <h2>${data.inv_year} ${data.inv_make} ${data.inv_model}</h2>
          <p>${data.inv_description}</p>
          <ul>
            <li><b>Miles:</b> ${data.inv_miles.toLocaleString()}</li>
            <li><b>Color:</b> ${data.inv_color}</li>
            <li><b>Price:</b> $${Number(data.inv_price).toLocaleString()}</li>
          </ul>
      </div>
    </div>`
  } else {
    div = '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return div
}

/* **************************************
* Build the login view HTML
* ************************************ */

Util.buildLoginForm = async function(){
  let form
  form = `<div id="login-form">
            <form action="/account/login" method="post">
              <label class="label-input">Email: <input type="email" id="account_email" name="account_email" required></label>
              <label class="label-input">Password: <input type="text" id="account_password" name="account_password" required minlength="12" pattern="(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+"
              title="Must contain at least one number and one uppercase letter, and one special character, and at least 12 characters long."></label>
              <input type="submit" value="Login">
            </form>
            <p>No account? <a href="/account/register">Sign Up</a></p>
          </div>`
  return form
}


/* **************************************
* Build the register view HTML
* ************************************ */

Util.buildRegisterForm = async function(){
  let form
  form = `<div id="register-form">
            <form action="/account/register" method="post">
              <label class="label-input">First Name: <input type="text" id="account_firstname" name="account_firstname" required value="<%= locals.account_firstname %>"></label>
              <label class="label-input">Last Name: <input type="text" id="account_lastname" name="account_lastname" required value="<%= locals.account_lastname %>"></label>
              <label class="label-input">Email Address: <input type="email" id="account_email" name="account_email" required value="<%= locals.account_email %>"></label>
              <label class="label-input">Password: <input type="text" id="account_password" name="account_password" minlength="12" pattern="(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+"
              title="Must contain at least one number and one uppercase letter, and one special character, and at least 12 characters long." required></label>
              <input type="submit" value="Register">
            </form>
          </div>`
  return form
}


// Middleware for throwing errors
Util.causeError = (req, res, next) => {
  throw new Error("This is a 500 error from middleware!")
};

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)


module.exports = Util