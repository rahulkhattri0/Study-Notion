import { useEffect, useState } from 'react';

const useFetchData = (apiFunction) => {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = await apiFunction();
        setData(data);
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    }
    fetchData();
  }, [apiFunction]);
  return [data, isError, isLoading, setData];
};

export default useFetchData;
