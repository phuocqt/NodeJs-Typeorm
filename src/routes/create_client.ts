import express from "express";
import { Client } from "../entities/Client";

const router = express.Router();

/**
 * @openapi
 * '/api/client':
 *  post:
 *   tags:
 *   - Client
 *   summary: Create client
 *   requestBody:
 *     required: true
 *     contents:
 *      application/json:
 *       schema:
 *            $ref: '#/components/schemas/CreateClientInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateClientResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.post("/api/client", async (req, res) => {
  const { firstName, lastName, email, cardNumber, balance } = req.body;

  const client = Client.create({
    first_name: firstName,
    last_name: lastName,
    email,
    card_number: cardNumber,
    balance,
  });

  await client.save();

  return res.json(client);
});

export { router as createClientRouter };
