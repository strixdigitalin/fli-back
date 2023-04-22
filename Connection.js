const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://flight:flight@cluster0.ngy12rs.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then(async (db) => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });
