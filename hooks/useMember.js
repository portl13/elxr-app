import { useSWRInfinite } from "swr";

const getUsers = (url, scope, member_type = false) => {

    const newUrl = new URL(url)

    const params = {
        scope: scope,
        type: 'active'
    }

    if (member_type) {
        params.member_type = member_type
    }

    Object.keys(params).forEach(key => newUrl.searchParams.append(key, params[key]))

    return fetch(newUrl, {
        method: 'GET'
    }).then(res => res.json())

}

const useMember = (scope, member_type = false) => {

    const url = process.env.portlApi + '/members';

    const PAGE_LIMIT = 20

    const {
        data,
        error,
        size,
        setSize
    } = useSWRInfinite((index) => {
        // add the cursor to the API endpoint
        return [`${url}?per_page=${PAGE_LIMIT}&page=${index + 1}`, scope, member_type];
    }, getUsers, {
        revalidateOnFocus: false,
    });

    const members = data ? [].concat(...data) : []

    const isLoadingInitialData = !data && !error


    const isLoadingMore =
        isLoadingInitialData ||
        (size > 0 && data && typeof data[size - 1] === "undefined")

    const isReachingEnd = data && data[data.length - 1]?.length < PAGE_LIMIT;


    return {
        members,
        setSize,
        isLoadingInitialData,
        isLoadingMore,
        isReachingEnd,
        size,
        error
    };
}

export default useMember;
