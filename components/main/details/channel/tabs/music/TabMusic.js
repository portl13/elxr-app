import React, {useEffect, useState} from 'react'
import useSWR from "swr";
import {getFetchPublic} from "@request/creator";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import Pagination from "@components/shared/pagination/Pagination";
import SongCard from '@components/main/card/SongCard';

const baseUrl = process.env.apiV2
const musicUrl = `${baseUrl}/albums?channel_id=`

function TabMusic({ channel_id }) {
  const limit = 12;
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)


  const { data: music, error } = useSWR(
      `${musicUrl}${channel_id}&page=${page}&per_page=${limit}`,
      getFetchPublic
  );

  const isLoading = !music && !error;

  useEffect(() => {
    if(music && music.total_items) {
      setTotal(music.total_items)
    }
  }, [music])

  return (
      <>
        <div className="row mt-5">
          {isLoading && <SpinnerLoader />}
          {music &&
              music.albums.length > 0 &&
              music.albums.map((album) => (
                  <div key={album.id} className="col-6 col-md-6 col-lg-3 mb-4">
                    <SongCard tipo="album" item={album} />
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

export default TabMusic