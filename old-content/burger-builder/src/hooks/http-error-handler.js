import { useState, useEffect } from 'react';

export default (httpClient) => {
  const [error, setError] = useState(null);

  const reqIntercepter = httpClient.interceptors.request.use((req) => {
    setError(null);
    return req;
  });

  const resInterceptor = httpClient.interceptors.response.use(
    (res) => res,
    (error) => {
      setError(error);
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    return () => {
      httpClient.interceptors.request.eject(reqIntercepter);
      httpClient.interceptors.response.eject(resInterceptor);
    };
  }, [reqIntercepter, resInterceptor, httpClient]);

  const errorConfirmedHandler = () => {
    setError(null);
  };

  return [error, errorConfirmedHandler];
};
