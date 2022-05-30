import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

function CardSkeleton() {
    return (
        <>
            <SkeletonTheme color="#1e2331" highlightColor="#444">
                <p>
                    <Skeleton height={200} />
                </p>
            </SkeletonTheme>

        </>
    );
}

export default CardSkeleton;
