import type { Request, Response } from 'express';
import StockService from "../services/StockService";
import ResponseHandler from "../utils/ResponseHandler";
import Stock from "../models/Stock.js";

export default class StockController {
  static async getAll(req: Request, res: Response) {
    const { tenant_id } = (req as any).user;
    const stocks = await StockService.getAll(tenant_id);
    return ResponseHandler.success(res, stocks, "Estoque listado com sucesso");
  }

  static async create(req: Request, res: Response) {
    const { tenant_id } = (req as any).user;
    const stockData = Stock.fromRequest ? Stock.fromRequest({ ...req.body, tenant_id }) : { ...req.body, tenant_id };
    const created = await StockService.create(stockData);
    return ResponseHandler.success(res, created, "Item de estoque criado com sucesso", 201);
  }

  static async update(req: Request, res: Response) {
    const { tenant_id } = (req as any).user;
    const { id } = req.params;
    const updated = await StockService.update(id, tenant_id, req.body);
    return ResponseHandler.success(res, updated, "Item de estoque atualizado com sucesso");
  }

  static async remove(req: Request, res: Response) {
    const { tenant_id } = (req as any).user;
    const { id } = req.params;
    const removed = await StockService.remove(id, tenant_id);
    return ResponseHandler.success(res, removed, "Item de estoque removido com sucesso");
  }
}
