import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from '@fortawesome/free-solid-svg-icons';
import InfinitScroll from 'react-infinite-scroll-component';
import { SpinnerBtn } from "../livefeed/livefeed.style";
import Loader from "../loader";

const Loading = ({ isLoad }) => <SpinnerBtn> Loading ... {isLoad && <Loader color="primary" />}</SpinnerBtn>

const FeedLoader = ({ cssStyle }) => <p css={cssStyle}>
    <span><FontAwesomeIcon icon={faClock} /></span>
    Loading updates. Please wait.</p>
const InfiniteList = ({
    loadMore,
    loading,
    children,
    data,
    loaderState,
    noText,
    isLiveFeed,
    cssStyle
}) => {
    const getLoader = () => {
        let load = loaderState ? <Loading /> : "";
        let loadVal = loaderState && isLiveFeed ? <FeedLoader cssStyle={cssStyle} /> : load;
        return loadVal
    }
    return (
        <InfinitScroll
            dataLength={data.length}
            next={loadMore}
            hasMore={true}
            loader={loading && !loaderState && !isLiveFeed ? <Loading isLoad={true} /> : false}>
            {children}
            {getLoader()}
            {!data.length && !loaderState ? <p style={{ textAlign: 'center' }}>
                No Results.
            </p> : ""}
        </InfinitScroll>
    );
};

export default InfiniteList;
