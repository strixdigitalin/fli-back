const { AuthHeaderDuffel, DUFFEL_BASE } = require("../../GlobalConstants");
const Notification = require("../model/Notification");
var axios = require("axios");
const duffel = require("../middleware/Duffel");

const cancelOrder = async (req, res, next) => {
  console.log(req.body, "<<< this is body");
  const { ORDER_ID } = req.params;
  try {
    const data = await duffel.orderCancellations.create({
      order_id: ORDER_ID,
    });
    res.status(200).send({
      success: true,
      message: "Flight Canceled",
      data,
    });
  } catch (error) {
    res.status(200).send({
      success: true,
      message: "Error occured",
      error,
    });
  }
};

const getORder = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, "< <<<this is order id");
    const data = await duffel.orders.get(id);
    res.status(200).send({
      success: true,
      data,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error occured",
      error,
    });
  }
};
const orderChangeRequest = async (req, res, next) => {
  try {
    const { SLICE_TO_REMOVE_ID, ORDER_ID, ORIGIN, DESTINATION, CLASS, DATE } =
      req.body;
    const data = await duffel.orderChangeRequests.create({
      order_id: ORDER_ID,
      slices: {
        remove: [{ slice_id: SLICE_TO_REMOVE_ID }],
        add: [
          {
            origin: ORIGIN,
            destination: DESTINATION,
            departure_date: DATE,
            cabin_class: CLASS,
          },
        ],
      },
    });
    res.status(200).send({
      success: true,
      message: "Done",
      data,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error Occured",
      error,
    });
  }
};

module.exports = { cancelOrder, getORder, orderChangeRequest };
