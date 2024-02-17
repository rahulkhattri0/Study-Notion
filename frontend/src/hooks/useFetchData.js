import { useEffect, useState } from 'react';
import { apiCaller } from '../services/apiConnector';

const useFetchData = (apiFunction, argsObj, deps, showLoadingToast = false) => {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [data, setData] = useState(null);

  useEffect(
    () => {
      console.log('first');
      fetchData();
    },
    deps ? [deps] : []
  );

  async function fetchData() {
    setLoading(true);
    const response = await apiCaller(argsObj, apiFunction, showLoadingToast);
    setLoading(false);
    if (!response) setError(true);
    else setData(response);
  }

  return [data, isError, isLoading];
};

export default useFetchData;
