/* Here as we discussed I have used mysql. If you want to
test my mongodb knowledge, You can give me a test query for the same
*/

/* We can use Sequlize also here, But I have used it for my ease as I found as a reference*/

import * as jmEzMySql from "jm-ez-mysql";

export class DB {
    public static init() {
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
