const pool = require("../database/");

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name");
}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    );
    return data.rows;
  } catch (error) {
    console.error("getclassificationsbyid error " + error);
  }
}

/* ***************************
 *  Get details of a specific item in inventory
 * ************************** */

async function getItemById(inventory_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i
      WHERE i.inv_id = $1;`,
      [inventory_id]
    );
    return data.rows[0] || null;
  } catch (error) {
    console.error("getinventorybyid error " + error);
  }
}

/* ***************************
 *  Add a item (inv_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id)
 * ************************** */

async function addItem(inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id) {
  try {
    return await pool.query(`INSERT INTO inventory (inv_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id) 
                             VALUES (default, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,[inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id]);
  } catch (error) {
    console.error("add item error: " + error);
  }  
}

/* ***************************
 *  Add a classification ( classification_id)
 * ************************** */

async function addClassification(classification_name) {
  try {
    return await pool.query('INSERT INTO classification (classification_id, classification_name) VALUES (default, $1) RETURNING *',[classification_name]);
  } catch (error) {
    console.error("add classification error: " + error);
  }  
}

module.exports = {getClassifications, getInventoryByClassificationId, getItemById, addClassification, addItem};