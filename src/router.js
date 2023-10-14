const express = require("express");
const router = express.Router();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

/* Controllers */
const usersController = require("./controllers/usersController");
const servicesController = require("./controllers/servicesController");
const orderOfServiceController = require("./controllers/orderOfServiceController");
const statusPaymentController = require("./controllers/statusPaymentController");
const statusServiceController = require("./controllers/statusServiceController");
const typesProductController = require("./controllers/typesProductController");
const panelControlController = require("./controllers/panelControlController");

/* Middlewares */
const authMiddleware = require("./middlewares/authMiddleware");
const usersMiddleware = require("./middlewares/usersMiddleware");
const servicesMiddleware = require("./middlewares/servicesMiddleware");
const orderOfServiceMiddleware = require("./middlewares/orderOfServiceMiddleware");
const statusPaymentMiddleware = require("./middlewares/statusPaymentMiddleware");
const statusServiceMiddleware = require("./middlewares/statusServiceMiddleware");
const typesProductMiddleware = require("./middlewares/typesProductMiddleware");

/* Routes */
router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(swaggerDocument));

/* Users */
router.get("/users", authMiddleware.authToken, usersController.getAll);
router.get(
  "/users/signature/:id",
  authMiddleware.authToken,
  usersController.getSignature
);
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
router.delete("/users/:id", authMiddleware.authToken, usersController.remove);

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

/* Order of Services */
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

/* Status Payment */
router.get(
  "/status_payment",
  authMiddleware.authToken,
  statusPaymentController.getAll
);
router.post(
  "/status_payment",
  authMiddleware.authToken,
  statusPaymentMiddleware.validateCreate,
  statusPaymentController.create
);
router.delete(
  "/status_payment/:id",
  authMiddleware.authToken,
  statusPaymentController.remove
);

/* Status Service */
router.get(
  "/status_service",
  authMiddleware.authToken,
  statusServiceController.getAll
);
router.post(
  "/status_service",
  authMiddleware.authToken,
  statusServiceMiddleware.validateCreate,
  statusServiceController.create
);
router.delete(
  "/status_service/:id",
  authMiddleware.authToken,
  statusServiceController.remove
);

/* Types Product */
router.get(
  "/types_product",
  authMiddleware.authToken,
  typesProductController.getAll
);
router.post(
  "/types_product",
  authMiddleware.authToken,
  typesProductMiddleware.validateCreate,
  typesProductController.create
);
router.delete(
  "/types_product/:id",
  authMiddleware.authToken,
  typesProductController.remove
);


/* Panel Control */
router.get(
  "/panel_control/product_by_service",
  authMiddleware.authToken,
  panelControlController.getCountProductByService
);

module.exports = router;
