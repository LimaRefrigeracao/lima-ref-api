const express = require("express") 
const router = express.Router() 

const swaggerUi = require("swagger-ui-express") 
const swaggerDocument = require("../swagger.json") 
router.use("/", swaggerUi.serve) 
router.get("/", swaggerUi.setup(swaggerDocument)) 


const usersController = require("./controllers/usersController") 
const usersMiddleware = require("./middlewares/usersMiddleware") 
router.post("/users/register", usersMiddleware.validateRegister, usersController.register) 
router.post("/users/login") 


const servicesController = require("./controllers/servicesController") 
const servicesMiddleware = require("./middlewares/servicesMiddleware") 
router.get("/services", servicesController.getAll) 
router.get("/services/warehouse", servicesController.getAllWharehouse) 
router.post(
  "/services",
  servicesMiddleware.validateCreate,
  servicesController.create
) 
router.put(
  "/services/warehouse/:id/:value",
  servicesController.updateWarehouse
) 
router.put(
  "/services/info/client/:id",
  servicesMiddleware.validateUpdateInfoClient,
  servicesController.updateInfoClient
) 
router.put(
  "/services/status/:id/:status",
  servicesController.updateStatusService
) 
router.put(
  "/services/status/payment/:id/:status",
  servicesController.updateStatusPayment
) 
router.delete("/services/:id/:cod", servicesController.remove) 


const orderOfServiceController = require("./controllers/orderOfServiceController") 
const orderOfServiceMiddleware = require("./middlewares/orderOfServiceMiddleware") 
router.get("/order_of_service/:cod", orderOfServiceController.getUnique) 
router.put(
  "/order_of_service/estimate/:cod",
  orderOfServiceMiddleware.validateUpdateEstimate,
  orderOfServiceController.updateEstimate
) 
router.delete(
  "/order_of_service/estimate/:cod/:idEstimate",
  orderOfServiceController.removeEstimate
) 

module.exports = router 
