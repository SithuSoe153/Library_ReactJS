import { useEffect, useState } from "react";

function useFetch(url, setData, data, method = "GET") {
    let [postData, setPostData] = useState(null);
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState(null);



    useEffect(() => {

        let abortController = new AbortController();
        let signal = abortController.signal;

        let options = { signal, method };

        setLoading(true);


        let fetchData = () => {

            fetch(url, options)

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
                })
                .catch((error) => {
                    setError(error.message);
                    console.error("Error fetching books");
                });
        }

        if (method === "POST" && postData) {
            options = {
                ...options,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            }
            fetchData();
        }


        if (method === "GET") {
            fetchData();
        }

        // cleanup function
        return () => {
            abortController.abort();
        };
    }, [url, postData]);

    return { setPostData, data, loading, error };
}
export default useFetch;