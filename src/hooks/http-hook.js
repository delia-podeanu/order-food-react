import { useState } from "react";

const useHttp = (options, dataTransform) => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = async () => {
    try {
      let optionsReq = {
        method: options.method ? options.method : "GET",
      };
      if (options.method === "POST") {
        optionsReq = options;
      }
      const response = await fetch(options.url, options);
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const data = response.json();
      data.then((res) => dataTransform(res));

      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setError(err.message || "Something went wrong");
    }
  };
  return {
    isLoading: isLoading,
    error: error,
    sendRequest: sendRequest,
  };
};

export default useHttp;
