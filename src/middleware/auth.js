const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Users = require("../model/CustomerModel");
const { JWT_SECRET } = require("../../GlobalConstants");

const userAuthentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res
        .status(400)
        .send({ status: false, message: `Token Not Found` });
    }

    let splitToken = token.split(" ");

    let decodeToken = jwt.verify(splitToken[1], JWT_SECRET);

    if (!decodeToken) {
      return res.status(401).send({ status: false, message: `Invalid Token` });
    } else {
      req.userId = decodeToken.userId;

      next();
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

const SplitBearer = (req) => {
  return req.headers.authorization.split(" ")[1];
};

const generateJWt = (data) => {
  console.log(data, "<<<<datasss");
  const token = jwt.sign(
    {
      ...data,
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
  return token;
};

// this is for login if session is expired and password and email are correct then it will generate new token
const checkSessionsOrGenerateNew = async (user, res, next, callBack) => {
  //   const token = SplitBearer(req);
  try {
    const decode = jwt.verify(user.jwtToken, process.env.JWT_SECRET);

    console.log(decode, "<<<jwt");
    callBack(true);

    // next();
  } catch (e) {
    console.log(e, "<<<error");
    const updateToken = await Users.findByIdAndUpdate(
      user._id,
      {
        jwtToken: generateJWt({ email: user.email, userType: user.userType }),
      },
      { new: true }
    );
    console.log("updating user", updateToken);

    res.status(401).send({
      success: false,
      message: "Creating New Token, Please login",
      updateToken,
    });
  }
};

// this only check session
const checkSession = async (req, res, next) => {
  console.log("checking session");
  jwt.verify(SplitBearer(req), JWT_SECRET, (err, decode) => {
    if (err) {
      console.log("error ");
      res.status(401).send({ success: false, message: "Session Expired !!!" });
    } else {
      console.log(decode);
      req.decode = decode;
      next();
    }
  });
};

// match tokens
const matchToken = async (req, res, next) => {
  if (!req.body.password) {
    res.status(400).send({ success: false, message: "Password is required" });
  }
  if (!req.body.confirmPassword) {
    res
      .status(400)
      .send({ success: false, message: "Confirm Password is required" });
  }
  if (req.body.password != req.body.confirmPassword) {
    res.status(400).send({
      success: false,
      message: "Password and Confirm Password should be same",
    });
  }
  if (!req.query._id) {
    res
      .status(400)
      .send({ success: false, message: "Query field _id is required." });
  }
  if (!req.query.token) {
    res.status(400).send({
      success: false,
      message: "Query field token is required",
    });
  }
  const user = await Users.findById(req.query._id);

  const sendFromFrontend = req.query.token;
  // console.log(req.params.id, user, sendFromFrontend);
  if (sendFromFrontend == user.jwtToken) {
    req.user = user;
    next();
  } else {
    res.status(401).send({
      success: false,
      message: "Unauthorized",
    });
  }
};

//  it check session and role both

const verifyVendorRole = async (req, res, next) => {
  console.log("verify");

  try {
    jwt.verify(SplitBearer(req), JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({
          success: false,
          message: "Unauthorized !!",
          error: err.message,
        });
      } else {
        if ("vendor" == decode.role) {
          console.log(decode, "<<<jwt");
          next();
        } else {
          res
            .status(401)
            .send({ success: false, message: "Only vendor can access it !!!" });
        }
      }
    });
  } catch (e) {
    console.log(e, "<<<error");
    res
      .status(401)
      .send({ success: false, message: "Unauthorized !!!", error: e.message });
  }
};
const verifyAdminRole = async (req, res, next) => {
  console.log("verify");
  // if (!req.body.emailId) {
  //   res.status(400).send({ success: false, message: "emailId is required" });
  // }
  if (!req.body._id) {
    return res
      .status(400)
      .send({ success: false, message: "_id (userID) is required" });
  }
  try {
    jwt.verify(SplitBearer(req), JWT_SECRET, (err, decode) => {
      if (err) {
        return res
          .status(401)
          .send({ success: false, message: "Unauthorized !!!" });
      } else {
        console.log(decode, "<<<decode");
        if ("admin" == decode.role) {
          console.log(decode, "<<<jwt");
          next();
        } else {
          return res
            .status(401)
            .send({ success: false, message: "Only Admin can access it !!!" });
        }
      }
    });
  } catch (e) {
    console.log(e, "<<<error");
    return res
      .status(401)
      .send({ success: false, message: "Unauthorized !!!" });
  }
};

//  email regex
const emailFormat = async (req, res, next) => {
  var emailRegex =
    /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  const isCorrectEmailFormat = emailRegex.test(req.body.email);

  var passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  const checkPasswordValidation = passwordRegex.test(req.body.password);
  if (!isCorrectEmailFormat) {
    res
      .status(400)
      .send({ success: false, message: "Enter correct email address." });
  } else if (!checkPasswordValidation) {
    res.status(400).send({
      success: false,
      message:
        "Password must have atlease 1 Uppercase, 1 lowercase, 1 Special Character, and length shouuld be greater than 8",
    });
  } else {
    next();
  }
};

// signup validation of all fields
const signUpValidations = async (req, res, next) => {
  if (!req.body.confirmPassword)
    res
      .status(400)
      .send({ success: false, message: "Confirm Password is required" });
  if (!req.body.password)
    res.status(400).send({ success: false, message: "Password is required" });
  if (req.body.password != req.body.confirmPassword)
    res.status(400).send({
      success: false,
      message: "Password and Confirm Password dosen't match.",
    });
  next();
};

// sign in validations
const siginInValidations = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email)
    res.status(400).send({ success: false, message: "Email is required" });
  else if (!password)
    res.status(400).send({ success: false, message: "Password is required" });
  else next();
};
module.exports = {
  SplitBearer,

  checkSessionsOrGenerateNew,
  emailFormat,
  signUpValidations,
  matchToken,
  checkSession,
  siginInValidations,
  userAuthentication,
  generateJWt,
  verifyAdminRole,
  verifyVendorRole,
};
