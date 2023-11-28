import useSWR from "swr";

function useData(url) {
    const { data, error } = useSWR(url, fetcher);

    return {
        data: data,
        isLoading: !error && !data,
        isError: error,
    };
}

export default useData;
