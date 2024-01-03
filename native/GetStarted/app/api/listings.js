const { default: apiClient } = require("./client");

const endpoint = "/products/getAllProducts";

const getListings = () => apiClient.get(endpoint);

export default {
  getListings,
};
