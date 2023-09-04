import mysql from "mysql";
import Connection from "./Connection";
import util from "util";

export default class MySqlConnectionAdapter implements Connection {
  readonly conn: mysql.Connection;

  constructor(config: {
    host: string;
    port: string;
    user: string;
    password: string;
    database: string;
  }) {
    this.conn = mysql.createConnection(
      config as unknown as mysql.ConnectionConfig
    );
  }

  public static startDefault() {
    return new MySqlConnectionAdapter({
      database: "db",
      host: "127.0.0.1",
      port: "3307",
      user: "root",
      password: "root",
    });
  }

  async query(query: string, args: any[] = []): Promise<any> {
    args.forEach((value: any, index: number) => {
      if (value instanceof Date) {
        value = value
          .toISOString()
          .replace(/T/, " ") // replace T with a space
          .replace(/\..+/, "");
      }
      switch (typeof value) {
        case "string":
          query = query.replace(`$${index + 1}`, `'${value}'`);
          break;
        case "undefined":
          query = query.replace(`$${index + 1}`, "NULL");
          break;
        default:
          query = query.replace(`$${index + 1}`, value);
          break;
      }
    });

    return new Promise((resolve, reject) =>
      this.conn.query(query, (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      })
    );
  }
  disconnect(): Promise<any> {
    this.conn.end();
    return Promise.resolve();
  }
}
