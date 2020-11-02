"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseBuilder = void 0;
class ResponseBuilder {
    static successMessage(msg) {
        const rb = new ResponseBuilder();
        rb.code = 200;
        rb.msg = msg;
        return rb;
    }
    static errorMessage(msg) {
        const rb = new ResponseBuilder();
        rb.code = 500;
        rb.error = msg != null ? msg : "ERR_INTERNAL_SERVER";
        return rb;
    }
    static badRequest(msg) {
        const rb = new ResponseBuilder();
        rb.code = 400;
        rb.error = msg;
        return rb;
    }
    static data(result, msg) {
        const rb = new ResponseBuilder();
        rb.code = 200;
        if (result) {
            result.message = msg;
        }
        rb.result = result;
        rb.msg = msg || null;
        return rb;
    }
    static error(err, msg) {
        const rb = new ResponseBuilder();
        if (err instanceof ResponseBuilder) {
            return err;
        }
        rb.code = 500;
        rb.error = err || "ERR_INTERNAL_SERVER";
        rb.msg = msg || null;
        rb.description = err.description;
        rb.result = err ? "ERR_THROW_BY_CODE" : "ERR_INTERNAL_SERVER";
        return rb;
    }
}
exports.ResponseBuilder = ResponseBuilder;
//# sourceMappingURL=responseBuilder.js.map