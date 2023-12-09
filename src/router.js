const express = require("express");
const router = express.Router();

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger-output.json');
const bodyParser = require('body-parser');

/* Controllers */
const usersController = require("./controllers/usersController");
const servicesController = require("./controllers/servicesController");
const orderOfServiceController = require("./controllers/orderOfServiceController");
const statusPaymentController = require("./controllers/statusPaymentController");
const statusServiceController = require("./controllers/statusServiceController");
const typesProductController = require("./controllers/typesProductController");
const panelControlController = require("./controllers/panelControlController");
const panelAnalyticalController = require("./controllers/panelAnalyticalController");
const toolsController = require("./controllers/toolsController");

/* Middlewares */
const authMiddleware = require("./middlewares/authMiddleware");
const usersMiddleware = require("./middlewares/usersMiddleware");
const servicesMiddleware = require("./middlewares/servicesMiddleware");
const orderOfServiceMiddleware = require("./middlewares/orderOfServiceMiddleware");
const statusPaymentMiddleware = require("./middlewares/statusPaymentMiddleware");
const statusServiceMiddleware = require("./middlewares/statusServiceMiddleware");
const typesProductMiddleware = require("./middlewares/typesProductMiddleware");

/* Routes */
router.use(bodyParser.json());
router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(swaggerFile)
  /*
    #swagger.ignore = true
  */
);


router.get(
  "/users", authMiddleware.authToken,
  usersController.getAll
  /*
    #swagger.tags = ['Usuários']
    #swagger.security = [{
      "bearerAuth": []
    }] 
  */
);
router.get(
  "/users/signature/:id",
  authMiddleware.authToken,
  usersController.getSignature
  /*
    #swagger.tags = ['Usuários']
    #swagger.security = [{
      "bearerAuth": []
    }] 
  */
);
router.post(
  "/users",
  authMiddleware.authToken,
  usersMiddleware.validateRegister,
  usersController.register
  /*
    #swagger.tags = ['Usuários']
    #swagger.security = [{
      "bearerAuth": []
    }] 
  */
);
router.post(
  "/users/login",
  usersMiddleware.validateLogin,
  usersController.login
  /*
    #swagger.tags = ['Usuários']
  */
);
router.delete(
  "/users/:id", authMiddleware.authToken, 
  usersController.remove
  /*
    #swagger.tags = ['Usuários']
    #swagger.security = [{
      "bearerAuth": []
    }] 
  */
);



router.get(
  "/services", authMiddleware.authToken, 
  servicesController.getAll
  /*
    #swagger.tags = ['Serviços']
    #swagger.security = [{
      "bearerAuth": []
    }] 
  */
);
router.get(
  "/services/warehouse",
  authMiddleware.authToken,
  servicesController.getAllWharehouse
  /*
    #swagger.tags = ['Serviços']
    #swagger.security = [{
      "bearerAuth": []
    }] 
  */
);
router.post(
  "/services",
  authMiddleware.authToken,
  servicesMiddleware.validateCreate,
  servicesController.create
  /*
    #swagger.tags = ['Serviços']
    #swagger.security = [{
      "bearerAuth": []
    }] 
  */
);
router.put(
  "/services/warehouse/:id/:value",
  authMiddleware.authToken,
  servicesController.updateWarehouse
  /*
    #swagger.tags = ['Serviços']
    #swagger.security = [{
      "bearerAuth": []
    }] 
  */
);
router.put(
  "/services/info/client/:id",
  authMiddleware.authToken,
  servicesMiddleware.validateUpdateInfoClient,
  servicesController.updateInfoClient
  /*
    #swagger.tags = ['Serviços']
    #swagger.security = [{
      "bearerAuth": []
    }] 
  */
);
router.put(
  "/services/status/:id/:status",
  authMiddleware.authToken,
  servicesController.updateStatusService
  /*
    #swagger.tags = ['Serviços']
    #swagger.security = [{
      "bearerAuth": []
    }] 
  */
);
router.put(
  "/services/status/payment/:id/:status",
  authMiddleware.authToken,
  servicesController.updateStatusPayment
  /*
    #swagger.tags = ['Serviços']
    #swagger.security = [{
      "bearerAuth": []
    }] 
  */
);
router.delete(
  "/services/:id/:cod/:typeTable",
  authMiddleware.authToken,
  servicesController.remove
  /*
    #swagger.tags = ['Serviços']
    #swagger.security = [{
      "bearerAuth": []
    }] 
  */
);



router.get(
  "/order_of_service/",
  authMiddleware.authToken,
  orderOfServiceController.getAll
  /*
    #swagger.tags = ['Ordens de Serviço']
    #swagger.security = [{
      "bearerAuth": []
    }] 
  */
);
router.get(
  "/order_of_service/:cod",
  authMiddleware.authToken,
  orderOfServiceController.getUnique
  /*
    #swagger.tags = ['Ordens de Serviço']
    #swagger.security = [{
      "bearerAuth": []
    }] 
  */
);
router.put(
  "/order_of_service/estimate/:cod",
  authMiddleware.authToken,
  orderOfServiceMiddleware.validateUpdateEstimate,
  orderOfServiceController.updateEstimate
  /*
    #swagger.tags = ['Ordens de Serviço']
    #swagger.security = [{
      "bearerAuth": []
    }] 
  */
);
router.delete(
  "/order_of_service/estimate/:cod/:idEstimate",
  authMiddleware.authToken,
  orderOfServiceController.removeEstimate
  /*
    #swagger.tags = ['Ordens de Serviço']
    #swagger.security = [{
      "bearerAuth": []
    }] 
  */
);



router.get(
  "/status_payment",
  authMiddleware.authToken,
  statusPaymentController.getAll
  /*
    #swagger.tags = ['Status de Pagamento']
    #swagger.security = [{
      "bearerAuth": []
    }] 
  */
);
router.post(
  "/status_payment",
  authMiddleware.authToken,
  statusPaymentMiddleware.validateCreate,
  statusPaymentController.create
  /*
    #swagger.tags = ['Status de Pagamento']
    #swagger.security = [{
      "bearerAuth": []
    }] 
  */
);
router.delete(
  "/status_payment/:id",
  authMiddleware.authToken,
  statusPaymentController.remove
  /*
    #swagger.tags = ['Status de Pagamento']
    #swagger.security = [{
      "bearerAuth": []
    }] 
  */
);



router.get(
  "/status_service",
  authMiddleware.authToken,
  statusServiceController.getAll
  /*
    #swagger.tags = ['Status de Serviço']
    #swagger.security = [{
      "bearerAuth": []
    }] 
  */
);
router.post(
  "/status_service",
  authMiddleware.authToken,
  statusServiceMiddleware.validateCreate,
  statusServiceController.create
  /*
    #swagger.tags = ['Status de Serviço']
    #swagger.security = [{
      "bearerAuth": []
    }] 
  */
);
router.delete(
  "/status_service/:id",
  authMiddleware.authToken,
  statusServiceController.remove
  /*
    #swagger.tags = ['Status de Serviço']
    #swagger.security = [{
      "bearerAuth": []
    }] 
  */
);


router.get(
  "/types_product",
  authMiddleware.authToken,
  typesProductController.getAll
  /*
    #swagger.tags = ['Tipos de Produtos']
    #swagger.security = [{
      "bearerAuth": []
    }] 
  */
);
router.post(
  "/types_product",
  authMiddleware.authToken,
  typesProductMiddleware.validateCreate,
  typesProductController.create
  /*
    #swagger.tags = ['Tipos de Produtos']
    #swagger.security = [{
      "bearerAuth": []
    }] 
  */
);
router.delete(
  "/types_product/:id",
  authMiddleware.authToken,
  typesProductController.remove
  /*
    #swagger.tags = ['Tipos de Produtos']
    #swagger.security = [{
      "bearerAuth": []
    }] 
  */
);


router.get(
  "/panel_control/product_by_service",
  authMiddleware.authToken,
  panelControlController.getCountProductByService
  /*
    #swagger.tags = ['Paineis de Controle']
    #swagger.security = [{
      "bearerAuth": []
    }] 
  */
);

router.get(
  "/panel_control/status_by_service",
  authMiddleware.authToken,
  panelControlController.getCountStatusByService
  /*
    #swagger.tags = ['Paineis de Controle']
    #swagger.security = [{
      "bearerAuth": []
    }] 
  */
);

router.get(
  "/panel_control/status_payment_by_service",
  authMiddleware.authToken,
  panelControlController.getCountStatusPaymentByService
  /*
    #swagger.tags = ['Paineis de Controle']
    #swagger.security = [{
      "bearerAuth": []
    }] 
  */
);

router.get(
  "/panel_control/info_performace_yearly",
  authMiddleware.authToken,
  panelControlController.getInfoPerformaceYearly
  /*
    #swagger.tags = ['Paineis de Controle']
    #swagger.security = [{
      "bearerAuth": []
    }] 
  */
);

router.get(
  "/panel_analytical/info_values_os_paid",
  //authMiddleware.authToken,
  panelAnalyticalController.getSumValuesOrdersPaid
  /*
    #swagger.tags = ['Paineis de Analíticos']
    #swagger.security = [{
      "bearerAuth": []
    }] 
  */
);


router.get(
  "/tools/notifications",
  authMiddleware.authToken,
  toolsController.getNotifications
  /*
    #swagger.tags = ['Utilitários']
    #swagger.security = [{
      "bearerAuth": []
    }] 
  */
);


module.exports = router;
