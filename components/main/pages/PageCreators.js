import React, { useState } from "react";
import useDebounce from "@hooks/useDebounce";
import useSWR from "swr";
import { getFetchPublic } from "@request/creator";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import InputDashSearch from "@components/shared/form/InputDashSearch";
import CreatorCard from "../card/CreatorCard";

const url = `${process.env.apiV2}/creator`;

function PageCreators() {
  const [search, setSearch] = useState("");

  const debounceTerm = useDebounce(search, 500);

  const { data: creators, error } = useSWR(
    `${url}?page=1&per_page=20&search=${debounceTerm}`,
    getFetchPublic
  );

  const isLoading = !creators && !error;

  return (
    <>
      <div className="row">
        <div className="col-12">
          <h4 className="mb-4 font-weight-bold">Creators</h4>
        </div>
      </div>
      <div className="row d-flex  justify-content-md-end">
        <div className="col-12 col-md-3 mb-4 mb-md-5 ">
          
            <InputDashSearch
              value={search}
              name={"search"}
              onChange={(e) => setSearch(e.target.value)}
            />
         
        </div>
      </div>
      <div className="row">
        {isLoading && <SpinnerLoader />}
        {creators &&
          creators.users.length > 0 &&
          creators.users &&
          creators.users.map((creator) => (
            <div key={creator.id} className="col-12 col-md-6 col-lg-3 mb-4">
              <CreatorCard creator={creator} />
            </div>
          ))}
      </div>
    </>
  );
}

export default PageCreators;
