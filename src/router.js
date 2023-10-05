const express = require("express");
const router = express.Router();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

/* Controllers */
const usersController = require("./controllers/usersController");
const servicesController = require("./controllers/servicesController");
const orderOfServiceController = require("./controllers/orderOfServiceController");

/* Middlewares */
const authMiddleware = require("./middlewares/authMiddleware");
const usersMiddleware = require("./middlewares/usersMiddleware");
const servicesMiddleware = require("./middlewares/servicesMiddleware");
const orderOfServiceMiddleware = require("./middlewares/orderOfServiceMiddleware");

/* Routes */
router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(swaggerDocument));

/* Users */
router.get("/users", authMiddleware.authToken, usersController.getAll);
router.get("/users/signature/:id", authMiddleware.authToken, usersController.getSignature);
router.post(
  "/users",
  authMiddleware.authToken,
  usersMiddleware.validateRegister,
  usersController.register
);
router.post(
  "/users/login",
  usersMiddleware.validateLogin,
  usersController.login
);
router.delete(
  "/users/:id",
  authMiddleware.authToken,
  usersController.remove
);

/* Services */
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

/* Order of services */
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
