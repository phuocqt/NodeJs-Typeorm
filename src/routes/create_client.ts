import express from "express";
import { Client } from "../entities/Client";
import { ClientSchema } from "../schema/clientSchema";
import { validateResource } from "../middleware/validateResource";

const router = express.Router();

/**
 * @openapi
 * '/api/client':
 *  post:
 *     tags:
 *     - Client
 *     summary: add a client
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateClientInput'
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.post("/api/client", validateResource(ClientSchema), async (req, res) => {
  const { firstName, lastName, email, cardNumber, balance } = req.body;

  const client = Client.create({
    first_name: firstName,
    last_name: lastName,
    email,
    card_number: cardNumber,
    balance,
  });

  const isExistingEmail = await Client.findOne({
    where: {
      email,
    },
  });
  const isExistingCardNumber = await Client.findOne({
    where: {
      card_number: cardNumber,
    },
  });

  if (isExistingEmail)
    return res.status(409).json({
      error: "Conflict",
      message: "A client with this email already exists",
    });
  if (isExistingCardNumber)
    return res.status(409).json({
      error: "Conflict",
      message: "A client with this card number already exists",
    });

  await client.save();

  return res.json(client);
});

export { router as createClientRouter };
