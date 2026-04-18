import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { DatabaseSync } = require('node:sqlite');
export function createSqliteDatabase(path) {
    return new DatabaseSync(path);
}
//# sourceMappingURL=sqlite.js.map