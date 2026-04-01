import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export default class OrderOfService {
  cod_order: number | null;
  tenant_id: number | null;
  estimate: string | null;
  value: number;
  created_at: string | null;

  constructor({
    cod_order = null,
    tenant_id = null,
    estimate = null,
    value = 0,
    created_at = null,
  }: any = {}) {
    this.cod_order = cod_order;
    this.tenant_id = tenant_id;
    this.estimate = estimate;
    this.value = value;
    this.created_at = created_at;
  }

  static fromRequest(body: any = {}) {
    return new OrderOfService({
      cod_order: body.cod_order || null,
      tenant_id: body.tenant_id || null,
      estimate: body.estimate,
      value: body.value,
      created_at: body.created_at || null,
    });
  }

  static fromRequestParams(params: any = {}) {
    return new OrderOfService({
      cod_order: params.cod || params.cod_order
    });
  }

  toJSON() {
    return {
      cod_order: this.cod_order,
      tenant_id: this.tenant_id,
      estimate: this.estimate,
      value: this.value,
      created_at: this.created_at,
    };
  }

  static schema = z.object({
    cod_order: z.union([z.string(), z.number()]).nullable().optional().openapi({ example: 1001 }),
    tenant_id: z.number().nullable().optional().openapi({ example: 1 }),
    estimate: z.string().nullable().optional().openapi({ example: '[{"type":"peca","description":"Compressor","price":500,"amount":1}]' }),
    value: z.number().nullable().optional().openapi({ example: 500.00 }),
    created_at: z.string().nullable().optional().openapi({ example: "2023-11-01 10:00:00" }),
  }).openapi("OrderOfService");

  static createSchema = z.object({
    tenant_id: z.number().nullable().optional().openapi({ example: 1 }),
    estimate: z.string().nullable().optional().openapi({ example: '[{"type":"peca","description":"Compressor","price":500,"amount":1}]' }),
    value: z.number().openapi({ example: 500.00 })
  }).openapi("OrderOfServiceCreate");

  static updateEstimateSchema = z.object({
    type: z.string().min(1, 'Campo "Tipo" é obrigatório.').openapi({ example: "peca" }),
    description: z.string().min(1, 'Campo "Descrição" é obrigatório.').openapi({ example: "Filtro de Ar" }),
    price: z.union([z.string(), z.number()]).refine(val => val !== "", { message: 'Campo "Preço" é obrigatório.' }).openapi({ example: 50.00 }),
    amount: z.union([z.string(), z.number()]).optional().openapi({ example: 2 })
  }).superRefine((data, ctx) => {
    if (data.type !== "simples") {
      if (data.amount === undefined || data.amount === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Campo "Quantidade" é obrigatório.',
          path: ["amount"]
        });
      }
    }
  }).openapi("OrderUpdateEstimate");

  static responseSchema = z.object({
    success: z.boolean(),
    msg: z.string(),
    data: OrderOfService.schema
  }).openapi("OrderOfServiceResponse");

  static listResponseSchema = z.object({
    success: z.boolean(),
    msg: z.string(),
    data: z.array(OrderOfService.schema)
  }).openapi("OrderOfServiceListResponse");
}

