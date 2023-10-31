import { useEffect, useState } from "preact/hooks";

export default function useCategorySeller(category: string) {
  //   const [data, setData] = useState<any | null>(null);
  //   const [loading, setLoading] = useState<boolean>(true);
  //   const [error, setError] = useState<Error | null>(null);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await fetch(url);
  //         if (!response.ok) {
  //           throw new Error(`Request failed with status: ${response.status}`);
  //         }
  //         const result = await response.json();
  //         setData(result);
  //         setLoading(false);
  //       } catch (err) {
  //         setError(err);
  //         setLoading(false);
  //       }
  //     };

  //     fetchData();
  //   }, [url]);

  //   return { data, loading, error };

  // TODO: validar se ha um vendedor para essa caregoria
  return { hasSeller: true };
}
