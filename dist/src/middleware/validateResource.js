"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateResource = void 0;
const zod_1 = require("zod");
const validateResource = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            res.status(400).json({ errors: error.errors });
        }
        else {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
};
exports.validateResource = validateResource;
//# sourceMappingURL=validateResource.js.map