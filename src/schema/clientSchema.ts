import { z } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateClientInput:
 *      type: object
 *      required:
 *        - firstName
 *        - lastName
 *        - email
 *        - cardNumber
 *        - balance
 *      properties:
 *        firstName:
 *          type: string
 *          default: Jane
 *        lastName:
 *          type: string
 *          default: Doe
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 *        cardNumber:
 *          type: string
 *          default: 1234567890
 *        balance:
 *          type: string
 *          default: 200
 */
export const ClientSchema = z.object({
  firstName: z.string({
    required_error: "firstName is required",
  }),
  lastName: z.string({
    required_error: "lastName is required",
  }),
  email: z
    .string({
      required_error: "email is required",
    })
    .email(),
  cardNumber: z.number().min(1000000000).max(9999999999),
  balance: z.number(),
});
