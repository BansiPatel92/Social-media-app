"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const bodyParser = require("body-parser"); // pull information from HTML POST (express4)
const compression = require("compression");
const dotenv = require("dotenv");
const express = require("express");
const helmet = require("helmet"); // Security
const methodOverride = require("method-override"); // simulate DELETE and PUT (express4)
const morgan = require("morgan"); // log requests to the console (express4)
const path = require("path");
const trimRequest = require("trim-request");
const logger_1 = require("./helpers/logger");
const routes_1 = require("./routes");
const database_1 = require("./database");
const multipart = require("connect-multiparty");
dotenv.config();
// initialize database
database_1.DB.init();
class App {
    constructor() {
        this.logger = logger_1.Log.getLogger();
        const NODE_ENV = process.env.NODE_ENV;
        const PORT = process.env.PORT;
        // const PORT = '3000';
        this.app = express();
        this.app.use(helmet());
        this.app.all("/*", (req, res, next) => {
            // res.setHeader("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Request-Headers", "*");
            // tslint:disable-next-line: max-line-length
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Headers, Authorization, token, x-device-type, x-app-version, x-build-number, uuid, x-auth-token");
            res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
            if (req.method === "OPTIONS") {
                res.writeHead(200);
                res.end();
            }
            else {
                next();
            }
        });
        if (NODE_ENV === "development") {
            this.app.use(express.static(path.join(process.cwd(), "public")));
            // set the static files location of bower_components
            this.app.use(morgan("dev")); // log every request to the console
        }
        else {
            this.app.use(compression());
            // set the static files location /public/img will be /img for users
            this.app.use(express.static(path.join(process.cwd(), "dist"), { maxAge: "7d" }));
        }
        this.app.use(bodyParser.json({ limit: "50mb" }));
        this.app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
        this.app.use(bodyParser.json(), (error, req, res, next) => {
            if (error) {
                return res.status(400).json({ error: "ERR_GENRIC_SYNTAX" });
            }
            next();
        });
        this.app.use(bodyParser.json({ type: "application/vnd.api+json" })); // parse application/vnd.api+json as json
        this.app.use(methodOverride());
        this.app.use(multipart());
        this.app.use(trimRequest.all);
        const routes = new routes_1.Routes();
        this.app.use("/api/modules", routes.path());
        this.app.listen(PORT, () => {
            this.logger.info(`The server is running on port localhost: ${process.env.PORT}`);
            this.app.use((err, req, res, next) => {
                if (err) {
                    // I prefer global error handler rather than writing try/catch in each function
                    // If we want to give different errors, for that we can manage by making one common file for all error messages
                    // generally I'm sending email from here so, I can get idea what went wrong on server
                    res.status(500).json({ error: "ERR_INTERNAL_SERVER" });
                    return;
                }
                next();
            });
        });
    }
}
exports.App = App;
//# sourceMappingURL=server.js.map