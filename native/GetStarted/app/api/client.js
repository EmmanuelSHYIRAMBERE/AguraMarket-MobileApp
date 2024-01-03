import { create } from "apisauce";

const apiClient = create({
  baseUrl: "http://localhost:5000/api-docs",
});

export default apiClient;
