const connection = require("./connection") 
const utilities = require("../utils/utils.js") 

const getUnique = async (cod) => {
  const connect = await connection.connect() 
  const order_of_service = await connect.query(
    `SELECT * FROM order_of_service WHERE cod_order = ${cod}`
  ) 
  connect.release() 
  return order_of_service.rows 
} 

const create = async (cod_order, created_at) => {
  const query =
    "INSERT INTO order_of_service(cod_order, created_at) VALUES ($1, $2)" 

  const values = [cod_order, created_at] 

  const connect = await connection.connect() 
  const created = await connect.query(query, values) 
  connect.release() 

  return created.rowCount 
} 

const removeEstimate = async (cod, idEstimate) => {
  const getOrderValue = await getUnique(cod) 
  let estimateArray = JSON.parse(getOrderValue[0].estimate) 

  estimateArray = estimateArray.filter((element) => element.id != idEstimate) 

  let newValue = 0 
  for (const record of estimateArray) {
    newValue += record.price 
  }
  estimateArray = JSON.stringify(estimateArray) 
  const query =
    "UPDATE order_of_service SET estimate = $1 ,value = $2 WHERE cod_order = $3" 

  const values = [estimateArray, newValue, cod] 
  const connect = await connection.connect() 
  const removed = await connect.query(query, values) 
  connect.release() 

  return removed.rowCount 
} 

const updateEstimate = async (estimateArray, value, cod) => {
  const estimate = estimateArray 

  const query =
    "UPDATE order_of_service SET estimate = $1, value = $2 WHERE cod_order = $3" 

  const values = [estimate, value, cod] 
  const connect = await connection.connect() 
  const updated = await connect.query(query, values) 
  connect.release() 

  return updated.rowCount 
} 

const remove = async (cod_order) => {
  const connect = await connection.connect() 
  const removed = await connect.query(
    "DELETE FROM order_of_service WHERE cod_order = $1",
    [cod_order]
  ) 
  connect.release() 
  return removed.rowCount 
} 

module.exports = {
  getUnique,
  create,
  removeEstimate,
  updateEstimate,
  remove,
} 
