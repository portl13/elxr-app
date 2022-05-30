import React from "react";
import useMember from "../../hooks/useMember";
import { SkeletoConnect } from "../profile/profile-skeleton";
import CardMember from "./CardMember";
import { ConnectLoadMoreButton } from "./connect.style";

const ConnectAllList = () => {

    const loadingCard = [...Array(10).keys()]

    const {
        members,
        setSize,
        size,
        isLoadingInitialData,
        isReachingEnd,
        isLoadingMore} = useMember('all');

    return (
        <>
            {isLoadingInitialData && loadingCard.map(loading => (
                <div
                    key={loading}
                    className="col-12">
                    <SkeletoConnect />
                </div>
            ))}

            {members.map(member => (
                <div
                    className="col-12"
                    key={member.id}>
                    <CardMember user={member} />
                </div>
            ))}

            {(!isLoadingInitialData && !isReachingEnd) && (
                <div className="col-12">
                    <ConnectLoadMoreButton
                        onClick={() => setSize(size + 1)}
                        className="btn btn-block">
                        {isReachingEnd && 'No More Data...'}
                        {isLoadingMore ? 'Loading...' : 'Load More...'}
                    </ConnectLoadMoreButton>
                </div>
            )}

        </>);
}

export default ConnectAllList;
