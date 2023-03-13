const { AuthHeaderDuffel, DUFFEL_BASE } = require("../../GlobalConstants");
const Notification = require("../model/Notification");
var axios = require("axios");
const duffel = require("../middleware/Duffel");

const createBooking = async (req, res, next) => {
  console.log(req.body, "<<< this is body");
  const {
    OFFER_ID,
    TOTAL_AMOUNT,
    TOTAL_CURRENCY,
    // ADULT_PASSENGER_ID_2,
    // INFANT_PASSENGER_ID,
    ADULT_PASSENGER_ID_1,
  } = req.body;
  try {
    const data = await duffel.orders.create({
      selected_offers: [OFFER_ID],
      payments: [
        {
          type: "balance",
          currency: TOTAL_CURRENCY,
          amount: TOTAL_AMOUNT,
        },
      ],
      passengers: [
        {
          phone_number: "+918989802546",
          email: "potts@example.com",
          born_on: "1983-11-02",
          title: "mrs",
          gender: "m",
          family_name: "Potts",
          given_name: "Pepper",
          id: ADULT_PASSENGER_ID_1,
        },
      ],
    });
    res.status(200).send({
      success: true,
      message: "Flight booked",
      data,
    });
  } catch (error) {
    res.status(400).send({ success: false, message: "Error Occured", error });
  }
};

module.exports = { createBooking };
