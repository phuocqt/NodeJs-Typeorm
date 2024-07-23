import express from "express";
import { Banker } from "../entities/Banker";
import { validateResource } from "../middleware/validateResource";
import { BankerSchema } from "../schema/banker";

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
router.post("/api/banker", validateResource(BankerSchema), async (req, res) => {
  const { firstName, lastName, email, cardNumber, employeeNumber } = req.body;

  const banker = Banker.create({
    first_name: firstName,
    last_name: lastName,
    email,
    card_number: cardNumber,
    employee_number: employeeNumber,
  });

  const isExistingEmail = await Banker.findOne({
    where: {
      email,
    },
  });
  const isExistingCardNumber = await Banker.findOne({
    where: {
      card_number: cardNumber,
    },
  });
  const isExistingEmployeeNumber = await Banker.findOne({
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

  await banker.save();

  return res.json(banker);
});

export { router as createBankerRouter };
