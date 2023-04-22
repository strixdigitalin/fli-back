const { AuthHeaderDuffel, DUFFEL_BASE } = require("../../GlobalConstants");
var axios = require("axios");
const duffel = require("../middleware/Duffel");

const getOffers = async (req, res) => {
  try {
    var config = {
      method: "get",
      url: DUFFEL_BASE + "/offer_requests",
      headers: AuthHeaderDuffel,
    };

    axios(config)
      .then(function (response) {
        // console.log(response);
        const data = response;
        const status = response.status;
        const statusText = response.statusText;

        // console.log(response.data);
        res.status(status).send({ data: response.data, status, statusText });
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};
const getAirPorts = async (req, res) => {
  try {
    const data = await duffel.suggestions.list({
      query: req.query.place,
    });
    res.status(200).send({ data, success: true });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

const getOfferByDestination = (req, res) => {
  var axios = require("axios");
  if (
    !req.body.origin ||
    !req.body.destination ||
    !req.body.departure_date ||
    !req.body.cabin_class
  ) {
    return res.status(400).send({
      success: false,
      message: "origin, destination, departure_date  are required",
    });
  }
  // let formdata = new FormData();
  // formdata.append("origin", req.body.origin);
  // formdata.append("destination", req.body.destination);
  // formdata.append("departure_date", req.body.departure_date);

  var data = JSON.stringify({
    data: {
      cabin_class: req.body.cabin_class,
      slices: [
        {
          origin: req.body.origin,
          destination: req.body.destination,
          departure_time: {
            to: "23:59",
            from: "00:00",
          },
          departure_date: req.body.departure_date,
          arrival_time: {
            to: "23:59",
            from: "00:00",
          },
        },
      ],
      private_fares: {
        QF: [
          {
            corporate_code: "FLX53",
            tracking_reference: "ABN:2345678",
          },
        ],
        UA: [
          {
            corporate_code: "1234",
          },
        ],
      },
      passengers: [
        {
          family_name: "Earhart",
          given_name: "Amelia",
          loyalty_programme_accounts: [
            {
              account_number: "12901014",
              airline_iata_code: "BA",
            },
          ],
          type: "adult",
        },
      ],
      max_connections: 0,
    },
  });

  // axios(config)
  //   .then(function (response) {
  //     // console.log(JSON.stringify(response.data));
  //     res
  //       .status(response.status)
  //       .send({ success: true, data: response.data.data });
  //   })
  //   .catch(function (error) {
  //     res.send(400).send({ success: false, message: "Error" });
  //     // console.log(error);
  //   });
};

const fetchOFfers = async (req, res) => {
  const { OFFER_REQUEST_ID } = req.query;
  try {
    const data = await duffel.offers.list({
      offer_request_id: OFFER_REQUEST_ID,
      sort: "total_amount",
    });
    res.status(200).send({
      success: true,
      message: "data",
      data,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "ERRor occured",
      error,
    });
  }
};

const getOfferById = async (req, res, next) => {
  const { OFFER_ID } = req.query;
  console.log(OFFER_ID, "<<< \n\n\n");
  try {
    const data = await duffel.offers.get(OFFER_ID);
    res.status(200).send({ success: true, message: "Flight booking ", data });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error occured",
      error,
    });
  }
};

const getSeatMap = async (req, res, next) => {
  try {
    const data = await duffel.seatMaps.get({
      offer_id: req.params.id,
    });
    res.status(200).send({
      success: true,
      data,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error,
    });
  }
};
const searchFlights = async (req, res, next) => {
  const { ORIGIN, DESTINATION, DATE, CABIN, PASSENGERS } = req.body;

  // res.status(200).send(req.body);
  console.log(req.body, "<<<this is body");
  try {
    const data = await duffel.offerRequests.create({
      slices: [
        {
          origin: ORIGIN,
          destination: DESTINATION,
          departure_date: DATE,
        },
      ],
      passengers: PASSENGERS,
      // passengers: [{ type: "adult" }, { type: "adult" }, { age: 1 }],
      cabin_class: CABIN,
      return_offers: false,
    });
    res.status(200).send({
      data,
      success: true,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "ERRor occured",
      error,
    });
  }
};

module.exports = {
  getOffers,
  getOfferByDestination,
  searchFlights,
  fetchOFfers,
  getOfferById,
  getAirPorts,
  getSeatMap,
};
