import { useEffect, useState } from "react";

function useFetch(url, setData, data) {
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState(null);


    useEffect(() => {
        let abortController = new AbortController();
        let signal = abortController.signal;

        setLoading(true);
        fetch(url, { signal })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json(); // Extract JSON data from response
            })
            .then((data) => {
                setData(data); // Update state with fetched data
                setError(null); // Clear any errors we had
                setLoading(false);
                // console.log(data); // Log the fetched data
            })
            .catch((error) => {
                setError(error.message);
                console.error("Error fetching books");
            });

        // cleanup function
        return () => {
            abortController.abort();
        };
    }, [url]);

    return { data, loading, error };
}
export default useFetch;