"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
const winston_1 = require("winston");
const { combine, timestamp, prettyPrint, colorize, } = winston_1.format;
class Log {
    static getLogger() {
        return winston_1.createLogger({
            format: combine(timestamp(), prettyPrint(), colorize()),
            level: "debug",
            transports: [new winston_1.transports.Console()],
        });
    }
}
exports.Log = Log;
//# sourceMappingURL=logger.js.map