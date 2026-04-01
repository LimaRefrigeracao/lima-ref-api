import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import User from "./Users.js";

extendZodWithOpenApi(z);

export default class Auth {
  static fromRequestLogin(body: any = {}) {
    return new User({
      username: body.username,
      password: body.password,
      remember: body.remember || false,
    });
  }

  static fromRequest(body: any = {}) {
    return new User({
      id: body.id || null,
      tenant_id: body.tenant_id || body.tenant || null,
      username: body.username,
      email: body.email,
      password: body.password || body.passwordHash || null,
      root: typeof body.root !== "undefined" ? body.root : false,
      admin: typeof body.admin !== "undefined" ? body.admin : false,
      signature: body.signature || null,
    });
  }

  static registerSchema = z.object({
    username: z.string().min(1, 'Nome de Usuário é obrigatório.').openapi({ example: "joao123" }),
    email: z.string().email('Email é obrigatório e deve ser válido.').openapi({ example: "joao@operix.com.br" }),
    password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres.').openapi({ example: "senha123" }),
    confirmPassword: z.string().min(1, 'Confirmar Senha é obrigatório.'),
    tenant_id: z.union([z.string(), z.number()]).refine(val => val !== "", {
      message: 'Unidade é obrigatória.'
    }),
    root: z.boolean().optional(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não conferem.",
    path: ["confirmPassword"],
  }).openapi("Register");

  static loginSchema = z.object({
    username: z.string().min(1, 'Usuário é obrigatório.').openapi({ example: "joao123" }),
    password: z.string().min(1, 'Senha é obrigatória.').openapi({ example: "senha123" }),
    remember: z.boolean().optional(),
  }).openapi("Login");

  static responseSchema = z.object({
    success: z.boolean(),
    msg: z.string(),
    data: z.object({
      token: z.string(),
      user: z.object({
        id: z.number(),
        username: z.string(),
        email: z.string(),
        root: z.boolean(),
        admin: z.boolean(),
        tenant_id: z.number()
      })
    })
  }).openapi("AuthResponse");

  static fromRequestParams(params: any = {}) {
    return User.fromRequestParams(params);
  }

  toJSON() {
    return {};
  }

  static schema = Auth.loginSchema;
  static createSchema = Auth.registerSchema;

  static listResponseSchema = z.object({
    success: z.boolean(),
    msg: z.string(),
    data: z.array(Auth.responseSchema.shape.data)
  }).openapi("AuthListResponse");
}
