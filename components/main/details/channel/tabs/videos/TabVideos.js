import React, {useEffect, useState} from 'react'
import useDebounce from "@hooks/useDebounce";
import useSWR from "swr";
import {getFetchPublic} from "@request/creator";
import useSWRImmutable from "swr/immutable";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import VideoCardNew from "@components/main/card/VideoCardNew";
import Pagination from "@components/shared/pagination/Pagination";

const baseUrl = process.env.apiV2
const videoUrl = `${baseUrl}/video?channel_id=`

function TabVideos({ channel_id }) {

  const limit = 12;
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  const { data: videos, error } = useSWR(
      `${videoUrl}${channel_id}&page=${page}&per_page=${limit}`,
      getFetchPublic
  );

  const isLoading = !videos && !error;

  useEffect(() => {
    if(videos && videos.total_items) {
      setTotal(videos.total_items)
    }
  }, [videos])

  return (
      <>
        <div className="row mt-5">
          {isLoading && <SpinnerLoader />}
          {videos &&
              videos.videos &&
              videos.videos.length > 0 &&
              videos.videos.map((video) => (
                  <div key={video.id} className="col-6 col-md-6 col-lg-3 mb-4">
                    <VideoCardNew video={video} />
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

export default TabVideos