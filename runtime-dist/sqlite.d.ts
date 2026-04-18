type StatementParams<Params extends unknown[]> = Params extends [] ? unknown[] : Params;
export interface PreparedStatement<Params extends unknown[] = [], Result = unknown> {
    get(...params: StatementParams<Params>): Result | undefined;
    all(...params: StatementParams<Params>): Result[];
    run(...params: StatementParams<Params>): unknown;
}
export interface SqliteDatabase {
    exec(sql: string): void;
    close(): void;
    prepare<Params extends unknown[] = [], Result = unknown>(sql: string): PreparedStatement<Params, Result>;
}
export declare function createSqliteDatabase(path: string): SqliteDatabase;
export {};
//# sourceMappingURL=sqlite.d.ts.map