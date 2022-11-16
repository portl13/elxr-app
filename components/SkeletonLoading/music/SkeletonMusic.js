import React from 'react';
import SkeletonBase from "@components/SkeletonLoading/SkeletonBase";
import Skeleton from "react-loading-skeleton";

function SkeletonMusic() {
    return (
        <SkeletonBase>
            <div className="row">
                <div className="col-12 col-md-5">
                    <div className="ratio ratio-1x1">
                        <Skeleton containerClassName={"h-100"} height={'100%'} count={1} />
                    </div>
                </div>
                <div className={"col-12 col-md-7"}>
                    <Skeleton containerClassName={"my-3 w-100"} width={'45%'} height={25} count={1} />
                    <Skeleton containerClassName={"my-3 w-100"} width={'18%'} height={25} count={1} />
                    <Skeleton containerClassName={"my-3 w-100"} width={'15%'} height={15} count={1} />
                    <Skeleton containerClassName={"my-3 w-100"} width={'100%'} height={8} count={7} />

                </div>
            </div>
        </SkeletonBase>
    );
}

export default SkeletonMusic;