import { useState } from "react";
import { HttpMethod } from "../../helper/constants";

const useApiRequest = () => {
  const [response, setResponse] = useState<object>({});
  const [loading, setLoading] = useState(false);

  const fetchData = async (url: string, method: HttpMethod, body?: object) => {
    setLoading(true);

    try {
      const options = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : null,
      };

      const response = await fetch(
        "https://theraponto.dev.thera.com.br:4433/" + url,
        options
      );
      const data = await response.json();

      setResponse(data);
    } finally {
      setLoading(false);
    }
  };

  const get = (url: string) => {
    fetchData(url, "GET");
  };

  const post = (url: string, body: object) => {
    fetchData(url, "POST", body);
  };

  const put = (url: string, body: object) => {
    fetchData(url, "PUT", body);
  };

  const remove = (url: string) => {
    fetchData(url, "DELETE");
  };

  return { response, loading, get, post, put, remove };
};

export default useApiRequest;
