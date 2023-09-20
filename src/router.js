const express = require("express");
const router = express.Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

const servicesController = require("./controllers/servicesController");
const servicesMiddleware = require("./middlewares/servicesMiddleware");

router.use("/", swaggerUi.serve);

router.get("/", swaggerUi.setup(swaggerDocument));
router.get("/services", servicesController.getAll);
router.get("/services/warehouse", servicesController.getAllWharehouse);

router.post(
  "/services",
  servicesMiddleware.validateCreate,
  servicesController.create
);

router.put("/services/warehouse/:id/:value", servicesController.updateWarehouse);

router.delete("/services/:id", servicesController.remove);

module.exports = router;
