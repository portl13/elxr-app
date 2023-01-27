import React, { useState } from "react";
import useSWR from "swr";
import { getFetchPublic } from "@request/creator";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import GalleryCard from "@components/main/card/GalleryCard";

const galleriesUrl = `${process.env.apiV2}/gallery?author=`;

function GalleriesTab({ creator_id }) {
  const [page, setPage] = useState(1);

  const { data: galleries, error } = useSWR(
    `${galleriesUrl}${creator_id}&page=${page}&per_page=12`,
    getFetchPublic
  );
  
  const isLoading = !galleries && !error;

  return (
    <div className="row mt-5">
      <div className="col-12">
        <h4 className="color-font font-size-14">GALLERIES</h4>
      </div>
      {isLoading && <SpinnerLoader />}
      {galleries &&
        galleries.galleries.length > 0 &&
        galleries.galleries.map((gallery) => (
          <div key={gallery.id} className="col-12 col-md-6 col-lg-3">
            <GalleryCard gallery={gallery} />
          </div>
        ))}
    </div>
  );
}

export default GalleriesTab;
