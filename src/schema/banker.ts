import { z } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateBankerInput:
 *      type: object
 *      required:
 *        - firstName
 *        - lastName
 *        - email
 *        - cardNumber
 *        - employeeNumber
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
 *        employeeNumber:
 *          type: string
 *          default: 1234567890
 */
export const BankerSchema = z.object({
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
  cardNumber: z.string().length(10),
  employeeNumber: z.string().length(10),
});
