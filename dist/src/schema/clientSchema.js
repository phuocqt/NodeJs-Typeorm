"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientSchema = void 0;
const zod_1 = require("zod");
exports.ClientSchema = zod_1.z.object({
    firstName: zod_1.z.string({
        required_error: "firstName is required",
    }),
    lastName: zod_1.z.string({
        required_error: "lastName is required",
    }),
    email: zod_1.z
        .string({
        required_error: "email is required",
    })
        .email(),
    cardNumber: zod_1.z.string().length(10),
    balance: zod_1.z.number(),
});
//# sourceMappingURL=clientSchema.js.map