const Stripe = require("stripe")(
  "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"
);
const createPAyment = async (req, res, nex) => {
  try {
    const { type, currency, amount, order_id } = req.body;
    console.log(req.body, "<<this is payment");
    const data = await duffel.payments.create({
      payment: {
        type: type,
        currency: currency,
        amount: amount,
      },
      // requires_instant_payment: true,
      order_id: order_id,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error,
    });
  }
};

const CreateCheckoutSession = async (req, res) => {
  const { user } = req.body;
  console.log(req.body, "<<<< req query");
  const data = await Payments.create({
    // stripeId: session.id,
    user: user,
    // detail: session,
  });

  const session = await Stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "INR",
          product_data: {
            name: "Flight",
          },
          unit_amount: 5000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000/success/" + data._id,
    cancel_url: "http://localhost:3000/cancel",
  });
  console.log(session, "<<<this is url");

  console.log(data, "<<< this is data");
  const update = await Payments.findByIdAndUpdate(
    data._id,
    {
      stripeId: session.id,
      detail: session,
    },
    { new: true }
  );
  res
    .status(400)
    .send({ success: true, message: "Redirect", url: session.url });
};

const getPayments = async (req, res) => {
  try {
    // const { user } = req.query;
    // console.log(req.query, "<<< this i user");
    const data = await Payments.find(req.query);
    res.status(200).send({ success: true, message: "", data });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  createPAyment,
  CreateCheckoutSession,
  getPayments,
};
