const mongoUri =
  "mongodb+srv://koinpr:koinpr@cluster0.6pyekdm.mongodb.net/?retryWrites=true&w=majority";
const JWT_SECRET = "IILDJM,ADS8F003L3[]394+F-39-FJD]D938473BDLD";
const DUFFEL_BASE = "https://api.duffel.com/air";
const AuthHeaderDuffel = {
  "Duffel-Version": "v1",
  Authorization:
    // "Bearer duffel_live_HLWbLH5baISHMnGCBiIykL9nSZn1_xs6znVJvpFFqJ0",
    "Bearer duffel_test_oj0MQHJVFnb2I-1ib5zDLB0XUruml2M7Hun4BtzVovg",
};

const STRIPE_PUBLISHED_KEY =
  "pk_test_51LvRExSIN5fQiccBSd6yIzTwcqvxNHBOZEnG6LMPb6xKJoj3itueNsk2AAOZJhYyHSawl81wfp6TGgBbKbtdcOTR00vWjaJw03";
const STRIPE_SECRET_KEY =
  "sk_test_51LvRExSIN5fQiccBKZiKsLwkFGViyecO66rrplY4k4uRDv7LhBJAfgJIJ6lYZqQIYkrzJRQH052co3qPT0CgxbnH00X4AUc3lQ";

const FRONTEND_URL = "http://localhost:3000";
const MAIEL_ID = "lakheraakshay@gmail.com";
const PASSWORD = "lkocyakupdjnvuat";

module.exports = {
  JWT_SECRET,
  MAIEL_ID,
  PASSWORD,
  DUFFEL_BASE,
  AuthHeaderDuffel,
};
