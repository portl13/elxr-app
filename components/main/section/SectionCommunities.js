import CommunityCard from "@components/creator/cards/CommunityCard";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { getFetchPublic } from "@request/creator";
import Link from "next/link";
import React from "react";
import useSWR from "swr";

const communitiesUrl = `${process.env.bossApi}/groups`;

function SectionCommunities() {
  const { data: communities, error } = useSWR(
    `${communitiesUrl}?page=1&per_page=4`,
    getFetchPublic
  );

  const isLoading = !communities && !error;

  return (
    <>
      <div className="row mt-4">
      <div className="col-12 d-flex justify-content-between mb-2">
          <h4 className="font-size-14">COMMUNITIES</h4>
          <Link href={"/communities"}>
            <a  className="font-size-14 text-white">
              See all
            </a>
          </Link>
        </div>
        {isLoading && <SpinnerLoader />}
        {communities &&
          communities.map((community) => (
            <div key={community.id} className="col-12 col-md-6 col-lg-3 mb-4">
              <CommunityCard community={community} />
            </div>
          ))}
        {communities && communities.length === 0 && (
          <h3 className="col display-4">
            You have not created any community yet
          </h3>
        )}
      </div>
    </>
  );
}

export default SectionCommunities;
