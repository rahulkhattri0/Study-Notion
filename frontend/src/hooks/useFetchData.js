import { useEffect, useState } from 'react';
import { apiCaller } from '../services/apiConnector';

const useFetchData = (apiFunction, argsObj, deps, showLoadingToast = false) => {
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [data, setData] = useState(null);

  useEffect(
    () => {
      fetchData();
    },
    deps ? [deps] : []
  );

  async function fetchData() {
    console.log('called');
    const reponse = await apiCaller(argsObj, apiFunction, showLoadingToast);
    setLoading(false);
    if (!reponse) setError(true);
    else setData(reponse);
  }

  return [data, isError, isLoading];
};

export default useFetchData;
