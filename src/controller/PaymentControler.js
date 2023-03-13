const { AuthHeaderDuffel, DUFFEL_BASE } = require("../../GlobalConstants");
const Notification = require("../model/Notification");
var axios = require("axios");
const duffel = require("../middleware/Duffel");
const createPAyment = async (req, res, nex) => {
  try {
    const { type, currency, amount, order_id } = req.body;

    const data = await duffel.payments.create({
      payment: {
        type: type,
        currency: currency,
        amount: amount,
      },
      order_id: order_id,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error,
    });
  }
};

module.exports = { createPAyment };
