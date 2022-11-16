import React from 'react';
import SkeletonBase from "@components/SkeletonLoading/SkeletonBase";
import Skeleton from "react-loading-skeleton";

function SkeletonEventDetail() {
    return (
        <SkeletonBase>
            <div className="ratio ratio-16x9">
                <Skeleton containerClassName={"h-100"} height={'100%'} count={1} />
            </div>
            <Skeleton containerClassName={"my-3 d-flex justify-content-end"} width={'25%'} height={25} count={1} />
            <Skeleton width={'25%'} height={20} count={1} />
            <Skeleton containerClassName={"my-3 d-block"} width={'25%'} height={25} count={1} />
            <Skeleton containerClassName={"d-block"}  height={10} count={3} />
        </SkeletonBase>
    );
}

export default SkeletonEventDetail;