"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankerSchema = void 0;
const zod_1 = require("zod");
exports.BankerSchema = zod_1.z.object({
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
    employeeNumber: zod_1.z.string().length(10),
});
//# sourceMappingURL=banker.js.map