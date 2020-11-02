"use strict";
/* Here as we discussed I have used mysql. If you want to
test my mongodb knowledge, You can give me a test query for the same
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = void 0;
/* We can use Sequlize also here, But I have used it for my ease as I found as a reference*/
const jmEzMySql = require("jm-ez-mysql");
class DB {
    static init() {
        jmEzMySql.init({
            acquireTimeout: 100 * 60 * 1000,
            connectTimeout: 100 * 60 * 1000,
            connectionLimit: 10000,
            database: process.env.DATABASE,
            dateStrings: true,
            host: process.env.DBHOST,
            multipleStatements: true,
            password: process.env.DBPASSWORD,
            timeout: 100 * 60 * 1000,
            timezone: "utc",
            user: process.env.DBUSER,
        });
    }
}
exports.DB = DB;
//# sourceMappingURL=database.js.map