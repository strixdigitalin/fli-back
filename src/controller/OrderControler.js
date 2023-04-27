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

const getServices = async (req, res) => {
  try {
    const { orderId } = req.params;
    console.log(orderId);
    const data = await duffel.orders.get(orderId);
    res.status(200).send({ success: true, data });
  } catch (error) {
    console.log(error);
    res.status(400).send({ success: false, error: error.message });
  }
};

const getAllORders = async (req, res) => {
  try {
    let orders = duffel.orders.list({
      after: "g2wAAAACbQAAABBBZXJvbWlzdC1LaGFya2l2bQAAAB=",
      before: "g2wAAAACbQAAABBBZXJvbWlzdC1LaGFya2l2bQAAAB=",
      limit: 1,
      booking_reference: "RZPNX8",
      awaiting_payment: false,
      sort: "payment_required_by",
      "owner_id[]": [
        "arl_00009VME7DBKeMags5CliQ",
        "arl_00009VME7DCOaPRQvNhcMu",
      ],
      "origin_id[]": ["arp_lhr_gb", "arp_jfk_us"],
      "destination_id[]": ["arp_lhr_gb", "arp_jfk_us"],
      "passenger_name[]": ["Earhart", "Smith"],
      requires_action: true,
    });
    res
      .status(200)
      .send({ success: true, message: "Orders Fetched", data: orders });
  } catch (error) {
    res.status(400).send({ success: false, message: error, error });
  }
};
module.exports = {
  cancelOrder,
  getORder,
  orderChangeRequest,
  getServices,
  getAllORders,
};
