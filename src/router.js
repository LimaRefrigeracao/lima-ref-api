const express = require("express");
const router = express.Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

const servicesController = require("./controllers/servicesController");
const orderOfServiceController = require("./controllers/orderOfServiceController");
const servicesMiddleware = require("./middlewares/servicesMiddleware");
const orderOfServiceMiddleware = require("./middlewares/orderOfServiceMiddleware");

router.use("/", swaggerUi.serve);

router.get("/", swaggerUi.setup(swaggerDocument));
router.get("/services", servicesController.getAll);
router.get("/services/warehouse", servicesController.getAllWharehouse);
router.get("/order_of_service/:cod", orderOfServiceController.getUnique);

router.post(
  "/services",
  servicesMiddleware.validateCreate,
  servicesController.create
);

router.put("/services/warehouse/:id/:value", servicesController.updateWarehouse);
router.put(
  "/services/info/client/:id",
  servicesMiddleware.validateUpdateInfoClient,
  servicesController.updateInfoClient
);
router.put(
  "/services/status/:id/:status",
  servicesController.updateStatusService
);
router.put(
  "/services/status/payment/:id/:status",
  servicesController.updateStatusPayment
);
router.put(
  "/order_of_service/estimate/:cod",
  orderOfServiceMiddleware.validateUpdateEstimate,
  orderOfServiceController.updateEstimate
);

router.delete("/services/:id/:cod", servicesController.remove);
router.delete("/order_of_service/estimate/:cod/:idEstimate", orderOfServiceController.removeEstimate);

module.exports = router;
