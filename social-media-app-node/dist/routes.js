"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const express = require("express");
const middleware_1 = require("./middleware");
const userRoute_1 = require("./v1/user/userRoute");
class Routes {
    constructor() {
        this.basePath = "/app/dist";
    }
    defaultRoute(req, res) {
        res.json({
            message: "Hello !",
        });
    }
    path() {
        const router = express.Router();
        const middleware = new middleware_1.Middleware();
        router.use("/user", userRoute_1.UserRoute);
        // router.use("/category", middleware.getUserAuthorized, CategoryRoute);
        router.all("/*", (req, res) => {
            return res.status(404).json({
                error: "ERR_URL_NOT_FOUND",
            });
        });
        return router;
    }
}
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map