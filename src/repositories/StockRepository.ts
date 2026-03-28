// @ts-nocheck
import connection from "../database/connection.js";

class StockRepository {
  static async getAll(tenant_id) {
    const connect = await connection.connect();
    const stocks = await connect.query(
      "SELECT * FROM stocks WHERE tenant_id = $1 ORDER BY id DESC",
      [tenant_id]
    );
    connect.release();
    return stocks.rows;
  }

  static async create(stock) {
    const connect = await connection.connect();
    const result = await connect.query(
      `INSERT INTO stocks (name, code, description, quantity, purchasePrice, salePrice, tenant_id, createdAt, updatedAt)
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW()) RETURNING *`,
      [stock.name, stock.code, stock.description, stock.quantity, stock.purchasePrice, stock.salePrice, stock.tenant_id]
    );
    connect.release();
    return result.rows[0];
  }

  static async update(id, tenant_id, data) {
    const connect = await connection.connect();
    const result = await connect.query(
      `UPDATE stocks SET name = $1, code = $2, description = $3, quantity = $4, purchasePrice = $5, salePrice = $6, updatedAt = NOW()
       WHERE id = $7 AND tenant_id = $8 RETURNING *`,
      [data.name, data.code, data.description, data.quantity, data.purchasePrice, data.salePrice, id, tenant_id]
    );
    connect.release();
    return result.rows[0];
  }

  static async remove(id, tenant_id) {
    const connect = await connection.connect();
    const result = await connect.query(
      `DELETE FROM stocks WHERE id = $1 AND tenant_id = $2 RETURNING *`,
      [id, tenant_id]
    );
    connect.release();
    return result.rows[0];
  }
}

export default StockRepository;
