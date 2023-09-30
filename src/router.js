const express = require("express");
const router = express.Router();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");
router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(swaggerDocument));

const usersController = require("./controllers/usersController");
const usersMiddleware = require("./middlewares/usersMiddleware");
router.post(
  "/users/register",
  usersMiddleware.validateRegister,
  usersController.register
);
router.post(
  "/users/login",
  usersMiddleware.validateLogin,
  usersController.login
);

const authMiddleware = require("./middlewares/authMiddleware")

const servicesController = require("./controllers/servicesController");
const servicesMiddleware = require("./middlewares/servicesMiddleware");
router.get("/services", authMiddleware.authToken, servicesController.getAll);
router.get(
  "/services/warehouse",
  authMiddleware.authToken,
  servicesController.getAllWharehouse
);
router.post(
  "/services",
  authMiddleware.authToken,
  servicesMiddleware.validateCreate,
  servicesController.create
);
router.put(
  "/services/warehouse/:id/:value",
  authMiddleware.authToken,
  servicesController.updateWarehouse
);
router.put(
  "/services/info/client/:id",
  authMiddleware.authToken,
  servicesMiddleware.validateUpdateInfoClient,
  servicesController.updateInfoClient
);
router.put(
  "/services/status/:id/:status",
  authMiddleware.authToken,
  servicesController.updateStatusService
);
router.put(
  "/services/status/payment/:id/:status",
  authMiddleware.authToken,
  servicesController.updateStatusPayment
);
router.delete(
  "/services/:id/:cod/:typeTable",
  authMiddleware.authToken,
  servicesController.remove
);

const orderOfServiceController = require("./controllers/orderOfServiceController");
const orderOfServiceMiddleware = require("./middlewares/orderOfServiceMiddleware");
router.get(
  "/order_of_service/",
  authMiddleware.authToken,
  orderOfServiceController.getAll
);
router.get(
  "/order_of_service/:cod",
  authMiddleware.authToken,
  orderOfServiceController.getUnique
);
router.put(
  "/order_of_service/estimate/:cod",
  authMiddleware.authToken,
  orderOfServiceMiddleware.validateUpdateEstimate,
  orderOfServiceController.updateEstimate
);
router.delete(
  "/order_of_service/estimate/:cod/:idEstimate",
  authMiddleware.authToken,
  orderOfServiceController.removeEstimate
);

module.exports = router;
