const { sendMail } = require("../middleware/nodemailer");
const User = require("../model/User");

const getAllUser = async (req, res, next) => {
  try {
    const data = await User.find(req.query);
    res.status(200).send({ success: true, data, message: "User Fetched" });
  } catch (error) {
    res.status(400).send({ message: error.message, success: false });
  }
};
const sendEmailconfirmation = async (req, res) => {
  try {
    const { email } = req.body;

    sendMail(email, {}, (res) => {
      res.status(200).send({ success: true, message: "Email sent" });
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ message: error.message, success: false });
  }
};
const cretaeUser = async (req, res) => {
  try {
    const savedData = await User.create(req.body);
    res.status(200).send({ savedData });
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = {
  getAllUser,
  cretaeUser,
  sendEmailconfirmation,
};
