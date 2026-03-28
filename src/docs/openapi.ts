import {
  OpenAPIRegistry,
  OpenApiGeneratorV3
} from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import User from "../models/Users";
import Auth from "../models/Auth.js";
import Service from "../models/Services";
import OrderOfService from "../models/OrderOfService";
import StatusPayment from "../models/StatusPayment";
import StatusService from "../models/StatusService";
import TypeProduct from "../models/TypesProduct";
import Tenant from "../models/Tenants";
import Stock from "../models/Stock";

const registry = new OpenAPIRegistry();

registry.register("Register", Auth.registerSchema);
registry.register("Login", Auth.loginSchema);
registry.register("Service", Service.schema);
registry.register("OrderOfService", OrderOfService.schema);
registry.register("StatusPayment", StatusPayment.schema);
registry.register("StatusService", StatusService.schema);
registry.register("TypeProduct", TypeProduct.schema);
registry.register("Tenant", Tenant.schema);
registry.register("Stock", Stock.schema);

registry.registerComponent("securitySchemes", "bearerAuth", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
});

const security = [{ bearerAuth: [] }];

// ========================
// AUTH
// ========================

registry.registerPath({
  method: "post",
  path: "/auth/register",
  tags: ["Autenticação"],
  request: {
    body: {
      content: { "application/json": { schema: Auth.registerSchema } },
      required: true,
    }
  },
  responses: { 201: { description: "Usuário criado" } }
});

registry.registerPath({
  method: "post",
  path: "/auth/login",
  tags: ["Autenticação"],
  request: {
    body: {
      content: { "application/json": { schema: Auth.loginSchema } },
      required: true,
    }
  },
  responses: { 201: { description: "Usuário logado" } }
});


// ========================
// USERS
// ========================

registry.registerPath({
  method: "get",
  path: "/users",
  tags: ["Usuários"],
  security,
  responses: { 200: { content: { "application/json": { schema: User.listResponseSchema } }, description: "Usuários listados" } }
});

registry.registerPath({
  method: "get",
  path: "/users/signature/{id}",
  tags: ["Usuários"],
  security,
  request: { params: z.object({ id: z.string() }) },
  responses: { 200: { description: "Assinatura do usuário" } }
});

registry.registerPath({
  method: "delete",
  path: "/users/{id}",
  tags: ["Usuários"],
  security,
  request: { params: z.object({ id: z.string() }) },
  responses: { 204: { description: "Usuário deletado" } }
});

// ========================
// TENANTS
// ========================

registry.registerPath({
  method: "get",
  path: "/tenants",
  tags: ["Unidades"],
  security,
  responses: { 200: { content: { "application/json": { schema: Tenant.listResponseSchema } }, description: "Unidades listadas" } }
});

registry.registerPath({
  method: "post",
  path: "/tenants",
  tags: ["Unidades"],
  security,
  request: {
    body: {
      content: { "application/json": { schema: Tenant.createSchema } },
      required: true,
    }
  },
  responses: { 201: { content: { "application/json": { schema: Tenant.responseSchema } }, description: "Unidade criada" } }
});

registry.registerPath({
  method: "delete",
  path: "/tenants/{id}",
  tags: ["Unidades"],
  security,
  request: { params: z.object({ id: z.string() }) },
  responses: { 204: { description: "Unidade deletada" } }
});

// ========================
// SERVICES
// ========================

registry.registerPath({
  method: "get",
  path: "/services",
  tags: ["Serviços"],
  security,
  responses: { 200: { content: { "application/json": { schema: Service.listResponseSchema } }, description: "Serviços listados" } }
});

registry.registerPath({
  method: "get",
  path: "/services/warehouse",
  tags: ["Serviços"],
  security,
  responses: { 200: { content: { "application/json": { schema: Service.listResponseSchema } }, description: "Serviços do almoxerifado listados" } }
});

registry.registerPath({
  method: "post",
  path: "/services",
  tags: ["Serviços"],
  security,
  request: {
    body: {
      content: { "application/json": { schema: Service.createSchema } },
      required: true,
    }
  },
  responses: { 201: { content: { "application/json": { schema: Service.responseSchema } }, description: "Serviço criado" } }
});

registry.registerPath({
  method: "put",
  path: "/services/warehouse/{id}/{value}",
  tags: ["Serviços"],
  security,
  request: { params: z.object({ id: z.string(), value: z.string() }) },
  responses: { 200: { description: "Serviço do almoxerifado atualizado" } }
});

registry.registerPath({
  method: "put",
  path: "/services/info/client/{id}",
  tags: ["Serviços"],
  security,
  request: {
    params: z.object({ id: z.string() }),
    body: {
      content: { "application/json": { schema: Service.updateInfoClientSchema } },
      required: true,
    }
  },
  responses: { 200: { description: "Informação do cliente atualizada" } }
});

registry.registerPath({
  method: "put",
  path: "/services/status/{id}/{status}",
  tags: ["Serviços"],
  security,
  request: { params: z.object({ id: z.string(), status: z.string() }) },
  responses: { 200: { description: "Status de serviço atualizado" } }
});

registry.registerPath({
  method: "put",
  path: "/services/status/payment/{id}/{status}",
  tags: ["Serviços"],
  security,
  request: { params: z.object({ id: z.string(), status: z.string() }) },
  responses: { 200: { description: "Status de pagamento atualizado" } }
});

registry.registerPath({
  method: "delete",
  path: "/services/{id}/{cod}/{typeTable}",
  tags: ["Serviços"],
  security,
  request: { params: z.object({ id: z.string(), cod: z.string(), typeTable: z.string() }) },
  responses: { 204: { description: "Serviço deletado" } }
});

// ========================
// ORDER OF SERVICE
// ========================

registry.registerPath({
  method: "get",
  path: "/order_of_service/",
  tags: ["Ordens de Serviço"],
  security,
  responses: { 200: { content: { "application/json": { schema: OrderOfService.listResponseSchema } }, description: "Ordens de Serviço listadas" } }
});

registry.registerPath({
  method: "get",
  path: "/order_of_service/{cod}",
  tags: ["Ordens de Serviço"],
  security,
  request: { params: z.object({ cod: z.string() }) },
  responses: { 200: { content: { "application/json": { schema: OrderOfService.responseSchema } }, description: "Ordem de Serviço detalhada" } }
});

registry.registerPath({
  method: "put",
  path: "/order_of_service/estimate/{cod}",
  tags: ["Ordens de Serviço"],
  security,
  request: {
    params: z.object({ cod: z.string() }),
    body: {
      content: { "application/json": { schema: OrderOfService.updateEstimateSchema } },
      required: true,
    }
  },
  responses: { 200: { description: "Orçamento da Ordem de Serviço atualizado" } }
});

registry.registerPath({
  method: "delete",
  path: "/order_of_service/estimate/{cod}/{idEstimate}",
  tags: ["Ordens de Serviço"],
  security,
  request: { params: z.object({ cod: z.string(), idEstimate: z.string() }) },
  responses: { 204: { description: "Orçamento removido" } }
});

// ========================
// STATUS PAYMENT
// ========================

registry.registerPath({
  method: "get",
  path: "/status_payment",
  tags: ["Status de Pagamento"],
  security,
  responses: { 200: { content: { "application/json": { schema: StatusPayment.listResponseSchema } }, description: "Status de Pagamento listados" } }
});

registry.registerPath({
  method: "post",
  path: "/status_payment",
  tags: ["Status de Pagamento"],
  security,
  request: {
    body: {
      content: { "application/json": { schema: StatusPayment.createSchema } },
      required: true,
    }
  },
  responses: { 201: { content: { "application/json": { schema: StatusPayment.responseSchema } }, description: "Status de Pagamento criado" } }
});

registry.registerPath({
  method: "delete",
  path: "/status_payment/{id}",
  tags: ["Status de Pagamento"],
  security,
  request: { params: z.object({ id: z.string() }) },
  responses: { 204: { description: "Status de Pagamento deletado" } }
});

// ========================
// STATUS SERVICE
// ========================

registry.registerPath({
  method: "get",
  path: "/status_service",
  tags: ["Status de Serviço"],
  security,
  responses: { 200: { content: { "application/json": { schema: StatusService.listResponseSchema } }, description: "Status de Serviço listados" } }
});

registry.registerPath({
  method: "post",
  path: "/status_service",
  tags: ["Status de Serviço"],
  security,
  request: {
    body: {
      content: { "application/json": { schema: StatusService.createSchema } },
      required: true,
    }
  },
  responses: { 201: { content: { "application/json": { schema: StatusService.responseSchema } }, description: "Status de Serviço criado" } }
});

registry.registerPath({
  method: "delete",
  path: "/status_service/{id}",
  tags: ["Status de Serviço"],
  security,
  request: { params: z.object({ id: z.string() }) },
  responses: { 204: { description: "Status de Serviço deletado" } }
});

// ========================
// TYPES PRODUCT
// ========================

registry.registerPath({
  method: "get",
  path: "/types_product",
  tags: ["Tipos de Produtos"],
  security,
  responses: { 200: { content: { "application/json": { schema: TypeProduct.listResponseSchema } }, description: "Tipos de Produtos listados" } }
});

registry.registerPath({
  method: "post",
  path: "/types_product",
  tags: ["Tipos de Produtos"],
  security,
  request: {
    body: {
      content: { "application/json": { schema: TypeProduct.createSchema } },
      required: true,
    }
  },
  responses: { 201: { content: { "application/json": { schema: TypeProduct.responseSchema } }, description: "Tipo de Produto criado" } }
});

registry.registerPath({
  method: "delete",
  path: "/types_product/{id}",
  tags: ["Tipos de Produtos"],
  security,
  request: { params: z.object({ id: z.string() }) },
  responses: { 204: { description: "Tipo de Produto deletado" } }
});

// ========================
// STOCK
// ========================

registry.registerPath({
  method: "get",
  path: "/stock",
  tags: ["Estoque"],
  security,
  responses: { 200: { content: { "application/json": { schema: Stock.schema } }, description: "Estoque listado" } }
});

registry.registerPath({
  method: "post",
  path: "/stock",
  tags: ["Estoque"],
  security,
  request: {
    body: {
      content: { "application/json": { schema: Stock.createSchema } },
      required: true,
    }
  },
  responses: { 201: { content: { "application/json": { schema: Stock.schema } }, description: "Estoque criado" } }
});

registry.registerPath({
  method: "put",
  path: "/stock/{id}",
  tags: ["Estoque"],
  security,
  request: { params: z.object({ id: z.string() }) },
  responses: { 204: { description: "Estoque atualizado" } }
});

registry.registerPath({
  method: "delete",
  path: "/stock/{id}",
  tags: ["Estoque"],
  security,
  request: { params: z.object({ id: z.string() }) },
  responses: { 204: { description: "Estoque deletado" } }
});


// ========================
// TOOLS
// ========================

registry.registerPath({
  method: "get",
  path: "/tools/notifications",
  tags: ["Utilitários"],
  security,
  responses: { 200: { description: "Notificações" } }
});


export function generateOpenApiDocument() {
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Operix API",
      description: "API do sistema de gestão inteligente para serviços técnicos e manutenções (Operix).",
      contact: {
        name: 'João Pedro P. Lima',
        url: 'https://joaopedrosh.github.io/website',
        email: 'devx.contato@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3333',
        description: 'Desenvolvimento'
      },
      {
        url: 'https://operix-service-api.cloudx.work',
        description: "Produção"
      }
    ],
  });
}
