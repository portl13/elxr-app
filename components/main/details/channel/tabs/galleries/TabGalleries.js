import React, { useEffect, useState } from 'react'
import useSWR from "swr";
import { getFetchPublic } from "@request/creator";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import Pagination from "@components/shared/pagination/Pagination";
import GalleryCard from "@components/main/card/GalleryCard";

const baseUrl = process.env.apiV2
const galleriesUrl = `${baseUrl}/gallery?channel_id=`

function TabGalleries({ channel_id }) {
  const limit = 12;
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  const { data: galleries, error } = useSWR(
      `${galleriesUrl}${channel_id}&page=${page}&per_page=${limit}`,
      getFetchPublic
  );

  const isLoading = !galleries && !error;

  useEffect(() => {
    if(galleries && galleries.total_items) {
      setTotal(galleries.total_items)
    }
  }, [galleries])

  return (
      <>
        <div className="row mt-5">
          {isLoading && <SpinnerLoader />}
          {galleries &&
              galleries.galleries.length > 0 &&
              galleries.galleries.map((gallery) => (
                  <div key={gallery.id} className="col-6 col-md-6 col-lg-3 mb-4">
                    <GalleryCard gallery={gallery} />
                  </div>
              ))}
        </div>
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <Pagination
                totalCount={total || 0}
                onPageChange={setPage}
                currentPage={page}
                pageSize={limit}
            />
          </div>
        </div>
      </>
  )
}

export default TabGalleries