import { css } from "@emotion/core";
import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import CarMemberStyle from "../ui/card/CarMemberStyle";

const TitleSkeleton = ({ height, width }) => {
  return (
    <>
      <SkeletonTheme color="#555" highlightColor="#5b5b5d">
        <p className="text-center text-lg-left">
          <Skeleton height={height} width={width} />
        </p>
      </SkeletonTheme>
    </>
  );
};

const AvatarSkeleton = (height = 80, width = 80) => {
  return (
    <SkeletonTheme color="#555" highlightColor="#5b5b5d">
      <p
        css={css`
          span {
            border-radius: 50%;
          }
        `}
      >
        <Skeleton height={80} width={80} />
      </p>
    </SkeletonTheme>
  );
};

const SkeletonProfile = () => {
  return (
    <>
      <TitleSkeleton height={25} width={200} />
      <TitleSkeleton height={15} width={280} />
      <TitleSkeleton height={15} width={240} />
      <div className="justify-content-center d-flex justify-content-lg-start">
        <span className="ml-2">
          <TitleSkeleton height={45} width={45} />
        </span>
        <span className="ml-2">
          <TitleSkeleton height={45} width={45} />
        </span>
        <span className="ml-2">
          <TitleSkeleton height={45} width={45} />
        </span>
        <span className="ml-2">
          <TitleSkeleton height={45} width={45} />
        </span>
      </div>
    </>
  );
};

const SkeletoConnect = () => {
  return (
    <CarMemberStyle>
      <div className="list-wrap">
        <div className="list-wrap-inner">
          <figure className="member-avatar-container">
            <AvatarSkeleton />
          </figure>
          <div className="item">
            <div className="member-card-body">
              <TitleSkeleton width={80} height={25} />
            </div>
            <div className="member-card-action">
              <TitleSkeleton width={80} height={37} />
            </div>
          </div>
        </div>
      </div>
    </CarMemberStyle>
  );
};

export { TitleSkeleton, SkeletonProfile, AvatarSkeleton, SkeletoConnect };
