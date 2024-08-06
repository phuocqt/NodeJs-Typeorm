"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBankerRouter = void 0;
const express_1 = __importDefault(require("express"));
const Banker_1 = require("../entities/Banker");
const validateResource_1 = require("../middleware/validateResource");
const banker_1 = require("../schema/banker");
const router = express_1.default.Router();
exports.createBankerRouter = router;
router.post("/api/banker", validateResource_1.validateResource(banker_1.BankerSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, cardNumber, employeeNumber } = req.body;
    const banker = Banker_1.Banker.create({
        first_name: firstName,
        last_name: lastName,
        email,
        card_number: cardNumber,
        employee_number: employeeNumber,
    });
    const isExistingEmail = yield Banker_1.Banker.findOne({
        where: {
            email,
        },
    });
    const isExistingCardNumber = yield Banker_1.Banker.findOne({
        where: {
            card_number: cardNumber,
        },
    });
    const isExistingEmployeeNumber = yield Banker_1.Banker.findOne({
        where: {
            employee_number: employeeNumber,
        },
    });
    if (isExistingEmail)
        return res.status(409).json({
            error: "Conflict",
            message: "A baker with this email already exists",
        });
    if (isExistingCardNumber)
        return res.status(409).json({
            error: "Conflict",
            message: "A banker with this card number already exists",
        });
    if (isExistingEmployeeNumber)
        return res.status(409).json({
            error: "Conflict",
            message: "A banker with this employee number already exists",
        });
    yield banker.save();
    return res.json(banker);
}));
//# sourceMappingURL=create_banker.js.map