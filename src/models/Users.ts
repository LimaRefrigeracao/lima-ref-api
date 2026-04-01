import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export default class User {
  id: number | null;
  tenant_id: number | null;
  username: string;
  email: string;
  password: string | null;
  root: boolean;
  admin: boolean;
  signature: string | null;
  remember: boolean;

  constructor({
    id = null,
    tenant_id = null,
    username = "",
    email = "",
    password = null,
    root = false,
    admin = false,
    signature = null,
    remember = false,
  }: any = {}) {
    this.id = id;
    this.tenant_id = tenant_id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.root = root;
    this.admin = admin;
    this.signature = signature;
    this.remember = remember;
  }

  static fromRequest(body: any = {}) {
    return new User({
      id: body.id || null,
      tenant_id: body.tenant_id || null,
      username: body.username,
      email: body.email,
      password: body.password || null,
      root: body.root || false,
      admin: body.admin || false,
      signature: body.signature || null,
      remember: body.remember || false,
    });
  }

  static fromRequestParams(params: any = {}) {
    return new User({
      id: params.id
    });
  }

  toJSON() {
    return {
      id: this.id,
      tenant_id: this.tenant_id,
      username: this.username,
      email: this.email,
      root: this.root,
      admin: this.admin,
      signature: this.signature,
    };
  }

  static schema = z.object({
    id: z.number().nullable().optional().openapi({ example: 1 }),
    tenant_id: z.number().nullable().optional().openapi({ example: 1 }),
    username: z.string().min(1, 'Nome de Usuário é obrigatório.').openapi({ example: "joao123" }),
    email: z.string().email('Email é obrigatório e deve ser válido.').openapi({ example: "joao@operix.com.br" }),
    root: z.boolean().optional().openapi({ example: false }),
    admin: z.boolean().optional().openapi({ example: true }),
    signature: z.string().nullable().optional().openapi({ example: "data:image/png;base64,..." }),
  }).openapi("User");

  static createSchema = z.object({
    username: z.string().min(1, 'Nome de Usuário é obrigatório.').openapi({ example: "joao123" }),
    email: z.string().email('Email é obrigatório e deve ser válido.').openapi({ example: "joao@operix.com.br" }),
    password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres.').openapi({ example: "senha123" }),
    tenant_id: z.number().nullable().optional().openapi({ example: 1 }),
    root: z.boolean().optional().openapi({ example: false }),
    admin: z.boolean().optional().openapi({ example: true }),
    signature: z.string().nullable().optional().openapi({ example: "data:image/png;base64,..." }),
  }).openapi("UserCreate");

  static responseSchema = z.object({
    success: z.boolean(),
    msg: z.string(),
    data: User.schema
  }).openapi("UserResponse");

  static listResponseSchema = z.object({
    success: z.boolean(),
    msg: z.string(),
    data: z.array(User.schema)
  }).openapi("UserListResponse");
}

