import { v4 as uuidv4 } from "uuid";

export default class Utils {
  /**
   * Generates a date string in YYYY-MM-DD format for the current UTC time.
   */
  static generateDateLocale(): string {
    const dateUTC = new Date(Date.now());
    const year = dateUTC.getFullYear();
    const month = String(dateUTC.getMonth() + 1).padStart(2, "0");
    const day = String(dateUTC.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  /**
   * Formats an ISO 8601 date string, number (timestamp), or Date object into YYYY-MM-DD.
   */
  static formatDate(dateISO8601: string | number | Date): string {
    const date = new Date(dateISO8601);
    const ano = date.getFullYear();
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const dia = String(date.getDate() + 1).padStart(2, "0");
    return `${ano}-${mes}-${dia}`;
  }

  /**
   * Generates a unique UUID v4 string.
   */
  static generateUuid(): string {
    return uuidv4();
  }
}
