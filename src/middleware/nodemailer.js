const nodemailer = require("nodemailer");
const { callbackPromise } = require("nodemailer/lib/shared");
const { MAIEL_ID, PASSWORD } = require("../../GlobalConstants");

let mailTransporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: MAIEL_ID,
    pass: PASSWORD,
  },
});

let mailDetails = (otp) => {
  return {
    from: MAIEL_ID,
    to: "",
    subject: "Vefiy your account",
    html: "<div style='color:white;display:flex;justify-content:center;width:100%'>Your Order has been confirmed</div>",
  };
  // html: "",
};

const sendMail = (email, data, callBack) => {
  mailTransporter.sendMail(
    {
      ...mailDetails(data),
      to: email,
    },
    function (err, data) {
      if (err) {
        console.log("Error Occurs", err);
        callBack(false);
      } else {
        console.log("Email sent successfully");
        callBack(true);
      }
    }
  );
};

module.exports = { sendMail };
