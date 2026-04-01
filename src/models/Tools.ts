import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export default class Tool {
  id: number | null;
  name: string;

  constructor({
    id = null,
    name = "",
  }: any = {}) {
    this.id = id;
    this.name = name;
  }

  static fromRequest(body: any = {}) {
    return new Tool({
      id: body.id || null,
      name: body.name,
    });
  }

  static fromRequestParams(params: any = {}) {
    return new Tool({
      id: params.id
    });
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
    };
  }

  static schema = z.object({
    id: z.number().nullable().optional().openapi({ example: 1 }),
    name: z.string().min(1, 'Campo "Nome" é obrigatório.').openapi({ example: "Chave Inglesa" }),
  }).openapi("Tool");

  static createSchema = z.object({
    name: z.string().min(1, 'Campo "Nome" é obrigatório.').openapi({ example: "Martelo" }),
  }).openapi("ToolCreate");

  static responseSchema = z.object({
    success: z.boolean(),
    msg: z.string(),
    data: Tool.schema
  }).openapi("ToolResponse");

  static listResponseSchema = z.object({
    success: z.boolean(),
    msg: z.string(),
    data: z.array(Tool.schema)
  }).openapi("ToolListResponse");
}
