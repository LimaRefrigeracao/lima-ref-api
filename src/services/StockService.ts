// @ts-nocheck
import StockRepository from "../repositories/StockRepository.js";

class StockService {
  static async getAll(tenant_id) {
    return StockRepository.getAll(tenant_id);
  }

  static async create(stock) {
    return StockRepository.create(stock);
  }

  static async update(id, tenant_id, data) {
    return StockRepository.update(id, tenant_id, data);
  }

  static async remove(id, tenant_id) {
    return StockRepository.remove(id, tenant_id);
  }
}

export default StockService;
