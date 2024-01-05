import axios from "axios";
import { useState } from "react";

export default useApi = ({ apiFunc }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    try {
      setLoading(true);

      const response = await apiFunc(...args);

      setLoading(false);
      setError(false);
      setData(response.data);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return {
    data,
    error,
    loading,
    request,
  };
};
