import express from "express";
import { Client } from "../entities/Client";

const router = express.Router();

/**
 * @openapi
 * '/api/client/{clientId}':
 *  delete:
 *     tags:
 *     - Client
 *     summary: create a transaction
 *     parameters:
 *      - name: clientId
 *        in: path
 *        description: The id of the product
 *        required: true
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.delete("/api/client/:clientId", async (req, res) => {
  const { clientId } = req.params;

  const response = await Client.delete(clientId);

  return res.json(response);
});

export { router as deleteClientRouter };
