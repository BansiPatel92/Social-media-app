import * as bodyParser from "body-parser"; // pull information from HTML POST (express4)
import * as compression from "compression";
import * as dotenv from "dotenv";
import * as express from "express";
import * as helmet from "helmet"; // Security
import * as methodOverride from "method-override"; // simulate DELETE and PUT (express4)
import * as morgan from "morgan"; // log requests to the console (express4)
import * as path from "path";
import * as trimRequest from "trim-request";
import { Log } from "./helpers/logger";
import { Routes } from "./routes";
import { DB } from "./database";
import * as multipart from "connect-multiparty";

dotenv.config();
// initialize database
DB.init();

export class App {
  protected app: express.Application;
  private logger = Log.getLogger();
  constructor() {
    const NODE_ENV = process.env.NODE_ENV;
    const PORT = process.env.PORT as string;
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
      } else {
        next();
      }
    });

    if (NODE_ENV === "development") {
      this.app.use(express.static(path.join(process.cwd(), "public")));
      // set the static files location of bower_components
      this.app.use(morgan("dev")); // log every request to the console
    } else {
      this.app.use(compression());
      // set the static files location /public/img will be /img for users
      this.app.use(express.static(path.join(process.cwd(), "dist"), { maxAge: "7d" }));
    }
    this.app.use(bodyParser.json({ limit: "50mb" }));
    this.app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

    this.app.use(bodyParser.json(), (error: any, req: any, res: any, next: () => void) => {
      if (error) {
        return res.status(400).json({ error: "ERR_GENRIC_SYNTAX" });
      }
      next();
    });

    this.app.use(bodyParser.json({ type: "application/vnd.api+json" })); // parse application/vnd.api+json as json
    this.app.use(methodOverride());
    this.app.use(multipart());
    this.app.use(trimRequest.all);
    const routes = new Routes();
    this.app.use("/api/modules", routes.path());
    this.app.listen(PORT, () => {
      this.logger.info(`The server is running on port localhost: ${process.env.PORT}`);
      this.app.use((err: any, req: any, res: any, next: () => void) => {
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
