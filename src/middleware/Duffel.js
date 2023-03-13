const { Duffel } = require("@duffel/api");
const duffel = new Duffel({
  // Store your access token in an environment variable, keep it secret and only readable on your server
  // token: "duffel_test_BwJrtGR8AhhQEmPHH5As4DmCl3pLtIpTD4gcqYk2uVl",
  token: "duffel_test_vn6N6mZR4Mpo9uhiLi0f1Jva6nuqdNCqSZ3EgNcgVK9",
});

module.exports = duffel;
