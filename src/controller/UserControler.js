const User = require("../model/User");

const getAllUser = async (req, res, next) => {
  try {
    const data = await User.find(req.query);
    res.status(200).send({ success: true, data, message: "User Fetched" });
  } catch (error) {
    res.status(400).send({ message: error.message, success: false });
  }
};

module.exports = {
  getAllUser,
};
