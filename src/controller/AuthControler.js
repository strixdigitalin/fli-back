const { validateUserDetail, generateJWt } = require("../middleware/auth");
const User = require("../model/User");
const bcrypt = require("bcrypt");
const { isValidRequestBody, isValid } = require("../validator/validator");

module.exports = {
  createUser: async (req, res, next) => {
    try {
      const userDetails = req.body;
      console.log(userDetails, "<<this is userdate");
      const isValid = await validateUserDetail(req, res, next);
      if (!isValid) {
        return null;
      }
      // const { firstName, lastName } = userDetails;

      const hashedPassword = await bcrypt.hash(userDetails.password, 10);
      userDetails.password = hashedPassword;
      const savedData = await User.create(userDetails);
      res.status(200).send({
        success: true,
        message: "User successfully created",
        user: savedData._doc,
      });
    } catch (error) {
      res.status(404).send({ success: false, message: error.message });
    }
  },
  login: async (req, res, next) => {
    try {
      const loginDetails = req.body;

      const { email, password } = loginDetails;

      if (!isValidRequestBody(loginDetails)) {
        return res
          .status(400)
          .send({ status: false, message: "Please provide login details" });
      }

      if (!isValid(email)) {
        return res
          .status(400)
          .send({ status: false, message: "Email-Id is required" });
      }

      if (!isValid(password)) {
        return res
          .status(400)
          .send({ status: false, message: "Password is required" });
      }

      const userData = await User.findOne({ email });

      if (!userData) {
        return res.status(401).send({
          status: false,
          message: `Login failed!! Email-Id is incorrect!`,
        });
      }

      const checkPassword = await bcrypt.compare(password, userData.password);
      const token = generateJWt({
        _id: userData._id,
        role: userData.role,
      });
      if (!checkPassword)
        return res.status(401).send({
          status: false,
          message: `Login failed!! password is incorrect.`,
        });

      delete userData["password"];
      return res.status(200).send({
        status: true,
        message: "LogIn Successful!!",
        data: { ...userData._doc, token },
      });
    } catch (err) {
      return res.status(500).send({ status: false, error: err.message });
    }
  },
};
