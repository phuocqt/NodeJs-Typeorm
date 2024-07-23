import express from "express";
import { Client } from "../entities/Client";
import { Banker } from "../entities/Banker";

const router = express.Router();

/**
 * @openapi
 * '/api/banker/{bankerId}/client/{clientId}':
 *  put:
 *     tags:
 *     - Client-Banker
 *     summary: connect banker-client
 *     parameters:
 *      - name: bankerId
 *        in: path
 *        description: The id of the banker
 *        required: true
 *      - name: clientId
 *        in: path
 *        description: The id of the client
 *        required: true
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.put("/api/banker/:bankerId/client/:clientId", async (req, res) => {
  const { bankerId, clientId } = req.params;

  const client = await Client.findOne(parseInt(clientId));

  const banker = await Banker.findOne(parseInt(bankerId));

  if (banker && client) {
    banker.clients = [client];
    await banker.save();
    return res.json({
      msg: "banker connected to client",
    });
  } else {
    return res.status(409).json({
      msg: "banker or client not found",
    });
  }
});

export { router as connectBankerToClientRouter };
