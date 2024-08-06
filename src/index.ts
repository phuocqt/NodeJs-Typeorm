import { createConnection } from "typeorm";
import express from "express";
import { Client } from "./entities/Client";
import { Banker } from "./entities/Banker";
import { Transaction } from "./entities/Transaction";
import { createClientRouter } from "./routes/create_client";
import { createBankerRouter } from "./routes/create_banker";
import { connectBankerToClientRouter } from "./routes/connect_banker_to_client";
import { createTransactionRouter } from "./routes/create_transaction";
import { deleteClientRouter } from "./routes/delete_client";
import { fetchClientsRouter } from "./routes/fetch_clients";
import swaggerDocs from "./swagger";

const bodyParser = require("body-parser");
const app = express();

const main = async () => {
  try {
    await createConnection({
      type: "postgres",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || "5432"),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Client, Banker, Transaction],
      synchronize: true,
    });
    console.log("Connected to Postgres");
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(createClientRouter);
    app.use(createBankerRouter);
    app.use(connectBankerToClientRouter);
    app.use(createTransactionRouter);
    app.use(deleteClientRouter);
    app.use(fetchClientsRouter);

    app.listen(3000, () => {
      console.log("Now running on port 3000");
      swaggerDocs(app, 3000);
    });
  } catch (error) {
    console.error(error);
    throw new Error("Unable to connect to db");
  }
};

main();
