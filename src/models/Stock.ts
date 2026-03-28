import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export default class Stock {
  id: number | null;
  name: string;
  code: string;
  description?: string;
  quantity: number;
  purchasePrice: number;
  salePrice: number;

  constructor({
    id = null,
    name = "",
    code = "",
    description = "",
    quantity = 0,
    purchasePrice = 0,
    salePrice = 0,
  }: any = {}) {
    this.id = id;
    this.name = name;
    this.code = code;
    this.description = description;
    this.quantity = quantity;
    this.purchasePrice = purchasePrice;
    this.salePrice = salePrice;
  }

  static fromRequest(body: any = {}) {
    return new Stock({
      id: body.id || null,
      name: body.name,
      code: body.code,
      description: body.description,
      quantity: body.quantity,
      purchasePrice: body.purchasePrice,
      salePrice: body.salePrice,
    });
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      code: this.code,
      description: this.description,
      quantity: this.quantity,
      purchasePrice: this.purchasePrice,
      salePrice: this.salePrice,
    };
  }

  static schema = z.object({
    id: z.number().nullable().optional().openapi({ example: 1 }),
    name: z.string().min(1, 'Campo "Nome" é obrigatório.').openapi({ example: "Parafuso" }),
    code: z.string().min(1, 'Campo "Código" é obrigatório.').openapi({ example: "P001" }),
    description: z.string().nullable().optional().openapi({ example: "Parafuso de aço inox" }),
    quantity: z.number().int().openapi({ example: 100 }),
    purchasePrice: z.number().openapi({ example: 2.5 }),
    salePrice: z.number().openapi({ example: 5.0 }),
  }).openapi("Stock");

  static createSchema = z.object({
    name: z.string().min(1, 'Campo "Nome" é obrigatório.').openapi({ example: "Parafuso" }),
    code: z.string().min(1, 'Campo "Código" é obrigatório.').openapi({ example: "P001" }),
    description: z.string().nullable().optional().openapi({ example: "Parafuso de aço inox" }),
    quantity: z.number().int().openapi({ example: 100 }),
    purchasePrice: z.number().openapi({ example: 2.5 }),
    salePrice: z.number().openapi({ example: 5.0 }),
  }).openapi("StockCreate");
}
