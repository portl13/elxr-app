import React, {useEffect, useState} from 'react'
import useSWR from "swr";
import {getFetchPublic} from "@request/creator";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import PodcastCardNew from "@components/main/card/PodcastCardNew";
import Pagination from "@components/shared/pagination/Pagination";

const baseUrl = process.env.apiV2
const podcastsUrl = `${baseUrl}/podcasts?channel_id=`

function TabPodCasts({ channel_id }) {

  const limit = 12;
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  const { data: audios, error } = useSWR(
      `${podcastsUrl}${channel_id}&page=${page}&per_page=${limit}`,
      getFetchPublic
  );

  const isLoading = !audios && !error;

  useEffect(() => {
    if(audios && audios.total_items) {
      setTotal(audios.total_items)
    }
  }, [audios])

  if (audios){
    console.log(audios)
  }

  return (
      <>
        <div className="row mt-5">
          {isLoading && <SpinnerLoader />}
          {audios &&
              audios.audios &&
              audios.audios.length > 0 &&
              audios.audios.map((audio) => (
                  <div key={audio.id} className="col-6 col-md-6 col-lg-3 mb-4">
                    <PodcastCardNew audio={audio} />
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

export default TabPodCasts