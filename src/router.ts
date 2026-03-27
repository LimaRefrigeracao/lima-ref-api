import { Router, json } from 'express';
import { serve, setup } from 'swagger-ui-express';
import { generateOpenApiDocument } from "./docs/openapi";

import AuthController from './controllers/AuthController';
import UsersController from './controllers/UsersController';
import ServicesController from './controllers/ServicesController.js';
import OrderOfServiceController from './controllers/OrderOfServiceController.js';
import StatusPaymentController from './controllers/StatusPaymentController.js';
import StatusServiceController from './controllers/StatusServiceController.js';
import TypesProductController from './controllers/TypesProductController.js';
import ToolsController from './controllers/ToolsController.js';
import TenantsController from './controllers/TenantsController';

import AuthMiddleware from './middlewares/AuthMiddleware';
import ValidateMiddleware from "./middlewares/ValidateMiddleware";

import Auth from './models/Auth.js';
import Service from './models/Services';
import OrderOfService from './models/OrderOfService';
import StatusPayment from './models/StatusPayment';
import StatusService from './models/StatusService';
import TypeProduct from './models/TypesProduct';
import Tenant from './models/Tenants';

const router = Router();
const openApiDocument = generateOpenApiDocument();

router.use(json());
router.use('/', serve);
router.get('/', setup(openApiDocument));

// ========================
// AUTH
// ========================

router.post(
  '/auth/register',
  ValidateMiddleware.validateSchema(Auth.registerSchema),
  AuthController.register
);

router.post(
  '/auth/login',
  ValidateMiddleware.validateSchema(Auth.loginSchema),
  AuthController.login
);


// ========================
// USERS
// ========================

router.get(
  '/users',
  AuthMiddleware.authToken,
  UsersController.getAll
);

router.get(
  '/users/signature/:id',
  AuthMiddleware.authToken,
  UsersController.getSignature
);

router.delete(
  '/users/:id',
  AuthMiddleware.authToken,
  UsersController.remove
);

// ========================
// TENANTS
// ========================

router.get(
  '/tenants',
  AuthMiddleware.authToken,
  TenantsController.getAll
);

router.post(
  '/tenants',
  AuthMiddleware.authToken,
  ValidateMiddleware.validateSchema(Tenant.createSchema),
  TenantsController.create
);

router.delete(
  '/tenants/:id',
  AuthMiddleware.authToken,
  TenantsController.remove
);

// ========================
// SERVICES
// ========================

router.get(
  '/services',
  AuthMiddleware.authToken,
  ServicesController.getAll
);

router.get(
  '/services/warehouse',
  AuthMiddleware.authToken,
  ServicesController.getAllWharehouse
);

router.post(
  '/services',
  AuthMiddleware.authToken,
  ValidateMiddleware.validateSchema(Service.createSchema),
  ServicesController.create
);

router.put(
  '/services/warehouse/:id/:value',
  AuthMiddleware.authToken,
  ServicesController.updateWarehouse
);

router.put(
  '/services/info/client/:id',
  AuthMiddleware.authToken,
  ValidateMiddleware.validateSchema(Service.updateInfoClientSchema),
  ServicesController.updateInfoClient
);

router.put(
  '/services/status/:id/:status',
  AuthMiddleware.authToken,
  ServicesController.updateStatusService
);

router.put(
  '/services/status/payment/:id/:status',
  AuthMiddleware.authToken,
  ServicesController.updateStatusPayment
);

router.delete(
  '/services/:id/:cod/:typeTable',
  AuthMiddleware.authToken,
  ServicesController.remove
);

// ========================
// ORDER OF SERVICE
// ========================

router.get(
  '/order_of_service/',
  AuthMiddleware.authToken,
  OrderOfServiceController.getAll
);

router.get(
  '/order_of_service/:cod',
  AuthMiddleware.authToken,
  OrderOfServiceController.getUnique
);

router.put(
  '/order_of_service/estimate/:cod',
  AuthMiddleware.authToken,
  ValidateMiddleware.validateSchema(OrderOfService.updateEstimateSchema),
  OrderOfServiceController.updateEstimate
);

router.delete(
  '/order_of_service/estimate/:cod/:idEstimate',
  AuthMiddleware.authToken,
  OrderOfServiceController.removeEstimate
);

// ========================
// STATUS PAYMENT
// ========================

router.get(
  '/status_payment',
  AuthMiddleware.authToken,
  StatusPaymentController.getAll
);

router.post(
  '/status_payment',
  AuthMiddleware.authToken,
  ValidateMiddleware.validateSchema(StatusPayment.createSchema),
  StatusPaymentController.create
);

router.delete(
  '/status_payment/:id',
  AuthMiddleware.authToken,
  StatusPaymentController.remove
);

// ========================
// STATUS SERVICE
// ========================

router.get(
  '/status_service',
  AuthMiddleware.authToken,
  StatusServiceController.getAll
);

router.post(
  '/status_service',
  AuthMiddleware.authToken,
  ValidateMiddleware.validateSchema(StatusService.createSchema),
  StatusServiceController.create
);

router.delete(
  '/status_service/:id',
  AuthMiddleware.authToken,
  StatusServiceController.remove
);

// ========================
// TYPES PRODUCT
// ========================

router.get(
  '/types_product',
  AuthMiddleware.authToken,
  TypesProductController.getAll
);

router.post(
  '/types_product',
  AuthMiddleware.authToken,
  ValidateMiddleware.validateSchema(TypeProduct.createSchema),
  TypesProductController.create
);

router.delete(
  '/types_product/:id',
  AuthMiddleware.authToken,
  TypesProductController.remove
);

// ========================
// TOOLS
// ========================

router.get(
  '/tools/notifications',
  AuthMiddleware.authToken,
  ToolsController.getNotifications
);

export default router;

