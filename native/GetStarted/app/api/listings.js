const { default: apiClient } = require("./client");

const endpoint = "/AguraMarket/products/getAllProducts";

const getListings = () => apiClient.get(endpoint);

export default {
  getListings,
};
