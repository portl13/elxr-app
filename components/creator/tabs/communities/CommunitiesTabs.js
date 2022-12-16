import React, { useState } from "react";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import useSWR from "swr";
import CommunityCard from "@components/creator/cards/CommunityCard";
import { getFetchPublic } from "@request/creator";
const communitiesUrl = `${process.env.bossApi}/groups`;

function CommunitiesTab({ creator_id }) {
  const [page, setPage] = useState(1);

  const { data: communities, error } = useSWR(
    `${communitiesUrl}?page=${page}&per_page=12&user_id=${creator_id}&scope=personal`,
    getFetchPublic
  );

  const isLoading = !communities && !error;
  return (
    <div className="row mt-5">
      <div className="col-12">
        <h4 className="color-font font-size-14">COMMUNITIES</h4>
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
  );
}

export default CommunitiesTab;
