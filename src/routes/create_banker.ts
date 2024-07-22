import express from "express";
import { Banker } from "../entities/Banker";

const router = express.Router();

/**
 * @openapi
 * '/api/banker':
 *  post:
 *     tags:
 *     - Banker
 *     summary: add a banker
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateBankerInput'
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.post("/api/banker", async (req, res) => {
  const { firstName, lastName, email, cardNumber, employeeNumber } = req.body;

  const banker = Banker.create({
    first_name: firstName,
    last_name: lastName,
    email,
    card_number: cardNumber,
    employee_number: employeeNumber,
  });

  await banker.save();

  return res.json(banker);
});

export { router as createBankerRouter };
