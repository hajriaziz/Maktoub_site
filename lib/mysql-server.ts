import { query, queryOne, transaction, generateUUID } from "./mysql-client"

// Helper pour construire des requêtes avec jointures
export class QueryBuilder {
  private selectFields: string[] = []
  private fromTable = ""
  private joins: string[] = []
  private whereConditions: string[] = []
  private orderByFields: string[] = []
  private limitValue?: number
  private offsetValue?: number
  private params: any[] = []

  select(fields: string | string[]) {
    if (Array.isArray(fields)) {
      this.selectFields.push(...fields)
    } else {
      this.selectFields.push(fields)
    }
    return this
  }

  from(table: string) {
    this.fromTable = table
    return this
  }

  leftJoin(table: string, condition: string) {
    this.joins.push(`LEFT JOIN ${table} ON ${condition}`)
    return this
  }

  innerJoin(table: string, condition: string) {
    this.joins.push(`INNER JOIN ${table} ON ${condition}`)
    return this
  }

  where(condition: string, value?: any) {
    this.whereConditions.push(condition)
    if (value !== undefined) {
      this.params.push(value)
    }
    return this
  }

  orderBy(field: string, direction: "ASC" | "DESC" = "ASC") {
    this.orderByFields.push(`${field} ${direction}`)
    return this
  }

  limit(value: number) {
    this.limitValue = value
    return this
  }

  offset(value: number) {
    this.offsetValue = value
    return this
  }

  build(): { sql: string; params: any[] } {
    let sql = `SELECT ${this.selectFields.join(", ")} FROM ${this.fromTable}`

    if (this.joins.length > 0) {
      sql += " " + this.joins.join(" ")
    }

    if (this.whereConditions.length > 0) {
      sql += " WHERE " + this.whereConditions.join(" AND ")
    }

    if (this.orderByFields.length > 0) {
      sql += " ORDER BY " + this.orderByFields.join(", ")
    }

    if (this.limitValue !== undefined) {
      sql += ` LIMIT ${this.limitValue}`
    }

    if (this.offsetValue !== undefined) {
      sql += ` OFFSET ${this.offsetValue}`
    }

    return { sql, params: this.params }
  }

  async execute<T = any>(): Promise<T[]> {
    const { sql, params } = this.build()
    return query<T>(sql, params)
  }

  async executeOne<T = any>(): Promise<T | null> {
    const { sql, params } = this.build()
    return queryOne<T>(sql, params)
  }
}

// Fonctions utilitaires pour les opérations courantes
export const db = {
  query,
  queryOne,
  transaction,
  generateUUID,
  builder: () => new QueryBuilder(),
}

export default db
