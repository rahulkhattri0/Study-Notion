import { useEffect, useState } from 'react';
import { apiCaller } from '../services/apiConnector';

const useFetchData = (apiFunction, deps, showLoadingToast, ...args) => {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [data, setData] = useState(null);

  useEffect(
    () => {
      async function fetchData() {
        setLoading(true);
        const response = await apiCaller(apiFunction, showLoadingToast, ...args);
        setLoading(false);
        if (!response) setError(true);
        else setData(response);
      }
      fetchData()
    },
    [...deps]
  );
  return [data, isError, isLoading, setData];
};

export default useFetchData;
