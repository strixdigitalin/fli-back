require("./Connection");
const app = require("./addon");

const OfferRoutes = require("./src/router/OfferRoutes");
const OrderRoutes = require("./src/router/OrderRoutes");
const PaymentRoutes = require("./src/router/Payment");
const AuthRoutes = require("./src/router/AuthRoutes");
const UserRoutes = require("./src/router/UserRoutes");

app.use("/offer", OfferRoutes);
app.use("/order", OrderRoutes);
app.use("/payment", PaymentRoutes);
app.use("/stripe", PaymentRoutes);
app.use("/auth", AuthRoutes);
app.use("/user", UserRoutes);
// app.use("/user", UserRoutes);
// app.use("/flight/offer",OfferRoutes)

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
