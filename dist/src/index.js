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
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const Client_1 = require("./entities/Client");
const Banker_1 = require("./entities/Banker");
const Transaction_1 = require("./entities/Transaction");
const create_client_1 = require("./routes/create_client");
const create_banker_1 = require("./routes/create_banker");
const connect_banker_to_client_1 = require("./routes/connect_banker_to_client");
const create_transaction_1 = require("./routes/create_transaction");
const delete_client_1 = require("./routes/delete_client");
const fetch_clients_1 = require("./routes/fetch_clients");
const swagger_1 = __importDefault(require("./swagger"));
const bodyParser = require("body-parser");
const app = express_1.default();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield typeorm_1.createConnection({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "123456",
            database: "typeorm",
            entities: [Client_1.Client, Banker_1.Banker, Transaction_1.Transaction],
            synchronize: true,
        });
        console.log("Connected to Postgres");
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(create_client_1.createClientRouter);
        app.use(create_banker_1.createBankerRouter);
        app.use(connect_banker_to_client_1.connectBankerToClientRouter);
        app.use(create_transaction_1.createTransactionRouter);
        app.use(delete_client_1.deleteClientRouter);
        app.use(fetch_clients_1.fetchClientsRouter);
        app.listen(3000, () => {
            console.log("Now running on port 3000");
            swagger_1.default(app, 3000);
        });
    }
    catch (error) {
        console.error(error);
        throw new Error("Unable to connect to db");
    }
});
main();
//# sourceMappingURL=index.js.map