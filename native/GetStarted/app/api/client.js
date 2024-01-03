import { create } from "apisauce";

const apiClient = create({
  baseUrl: "https://aguramarketapi.onrender.com/AguraMarket",
});

export default apiClient;
