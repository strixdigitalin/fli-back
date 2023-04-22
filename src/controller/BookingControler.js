const duffel = require("../middleware/Duffel");
const User = require("../model/User");
const bcrypt = require("bcrypt");

const createBooking = async (req, res, next) => {
  console.log(req.body, "<<< this is body");
  const {
    OFFER_ID,
    TOTAL_AMOUNT,
    TOTAL_CURRENCY,
    // ADULT_PASSENGER_ID_2,
    // INFANT_PASSENGER_ID,
    ADULT_PASSENGER_ID_1,
    phone_number,
    email,
    born_on,
    gender,
    lastName,
    firstName,
    middleName,
  } = req.body;
  try {
    const data = await duffel.orders.create({
      selected_offers: [OFFER_ID],
      type: "instant",
      payments: [
        {
          type: "balance",
          currency: TOTAL_CURRENCY,
          amount: TOTAL_AMOUNT,
        },
      ],
      passengers: [
        {
          phone_number: phone_number,
          email: email,
          born_on: born_on,
          title: gender == "m" ? "mr" : "mrs",
          gender: gender,
          family_name: lastName,
          given_name: firstName + middleName,
          id: ADULT_PASSENGER_ID_1,
        },
      ],
    });
    const oneser = await User.find({ email });
    if (oneser.length) {
      const user = await User.findOneAndUpdate(
        { email },
        { $push: { bookings: data.data.id } },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Flight booked",
        data,
        user,
      });
    } else {
      const userDetails = {
        firstName,
        gender,
        email,
        lastName: lastName,
        dob: born_on,
        password: "Password@123",
        bookings: data.data.id,
      };
      const hashedPassword = await bcrypt.hash(userDetails.password, 10);
      userDetails.password = hashedPassword;
      const savedData = await User.create(userDetails);
      res.status(200).send({
        success: true,
        message: "Flight booked",
        data,
        user: savedData,
      });
    }
  } catch (error) {
    res.status(400).send({ success: false, message: error.message, error });
  }
};

module.exports = { createBooking };
