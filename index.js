require("./Connection");
const app = require("./addon");

const OfferRoutes = require("./src/router/OfferRoutes");
const OrderRoutes = require("./src/router/OrderRoutes");
const PaymentRoutes = require("./src/router/Payment");
const AuthRoutes = require("./src/router/AuthRoutes");
const UserRoutes = require("./src/router/UserRoutes");
const BlogRoutes = require("./src/router/BlogRoutes");

app.use("/offer", OfferRoutes);
app.use("/order", OrderRoutes);
app.use("/payment", PaymentRoutes);
app.use("/stripe", PaymentRoutes);
app.use("/auth", AuthRoutes);
app.use("/user", UserRoutes);
app.use("/blog", BlogRoutes);
// app.use("/user", UserRoutes);
// app.use("/flight/offer",OfferRoutes)dd

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
