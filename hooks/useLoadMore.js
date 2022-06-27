import useSWRInfinite from 'swr/infinite'


const useLoadMore = ({
    url,
    page_limit,
    fectcher,
    wait = false
}) => {

    const {
        data,
        error,
        size,
        setSize
    } = useSWRInfinite((index) => {
        // add the cursor to the API endpoint
        if (wait) {
            return wait ? [`${url}?per_page=${page_limit}&page=${index + 1}`, wait] : null;
        } else {
            return [`${url}?per_page=${page_limit}&page=${index + 1}`, wait];
        }
    }, fectcher, {
        revalidateOnFocus: false,
    });


    const result = data ? [].concat(...data) : []

    const isLoadingInitialData = !data && !error

    const isLoadingMore =
        isLoadingInitialData ||
        (size > 0 && data && typeof data[size - 1] === "undefined")

    const isReachingEnd = data && data[data.length - 1]?.length < page_limit;

    return {
        result,
        setSize,
        isLoadingInitialData,
        isLoadingMore,
        isReachingEnd,
        size,
        error
    };
}

export default useLoadMore;
