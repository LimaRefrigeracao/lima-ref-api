const express = require("express");
const router = express.Router();

const servicesController = require("./controllers/servicesController");
const servicesMiddleware = require("./middlewares/servicesMiddleware");

router.get("/services", servicesController.getAll);
router.post(
  "/services",
  servicesMiddleware.validateCreate,
  servicesController.create
);
router.put(
  "/services/:id",
  servicesMiddleware.validateUpdate,
  servicesController.update
);
router.delete("/services/:id", servicesController.remove);

module.exports = router;
