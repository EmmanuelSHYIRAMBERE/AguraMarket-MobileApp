const { default: apiClient } = require("./client");

const endpoint = "/products/getAllProducts";

const getListings = () => apiClient.get(endpoint);

const addListings = (listing) => {
  const data = new FormData();

  data.append("title", listing.title);
  data.append("price", listing.price);
  data.append("categoryId", listing.category.value);
  data.append("title", listing.title);
  data.append("description", listing.description);

  listing.images.forEach((image, index) =>
    data.append("images", {
      name: "image" + index,
      type: "image/jpeg",
      uri: image,
    })
  );

  if (listing.location) {
    data.append("location", JSON.stringify(listing.location));
  }

  return apiClient.post(endpoint, data);
};

export default {
  addListings,
  getListings,
};
