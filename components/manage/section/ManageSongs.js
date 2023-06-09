import { genericFetch } from '@request/dashboard'
import { UserContext } from '@context/UserContext'
import { useRouter } from 'next/router'
import CardSong from '@components/manage/card/CardSong'
import InputDashSearch from '@components/shared/form/InputDashSearch'
import Link from 'next/link'
import Pagination from '@components/shared/pagination/Pagination'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import React, { useState, useContext, useEffect } from 'react'
import useDebounce from '@hooks/useDebounce'
import useSWR from 'swr'

const url = `${process.env.apiV2}/songs`

function ManageSongs() {
  const { user } = useContext(UserContext)
  const token = user?.token
  const router = useRouter()
  const limit = 20
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const debounceTerm = useDebounce(search, 500)
  const [total, setTotal] = useState(0)
  const [status, setStatus] = useState('publish')

  const { data: songs, mutate: mutateSongs } = useSWR(
    token
      ? [
          `${url}?author=${user?.id}&page=${page}&per_page=${limit}&status=${status}&search=${debounceTerm}`,
          token,
        ]
      : null,
    genericFetch
  )

  const mutate = async (id) => {
    const newSongs = {
      songs: [...songs.songs.filter((event) => event.id !== id)],
      items: Number(songs.items) - 1,
      total_items: Number(songs.total_items) - 1,
    };

    return await mutateSongs(newSongs, { revalidate: true });
  };

  useEffect(() => {
    if (songs && songs.total_items) {
      setTotal(songs.total_items)
    }
  }, [songs])

  return (
    <div className="container">
      <div className="row d-flex  justify-content-between mb-5">
        <div className="col-12 col-md-6">
          <h4 className="list-nav-item-title pl-0">Songs</h4>
        </div>
        <div className="col-12 col-md-3">
          <InputDashSearch
            value={search}
            name={'search'}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-auto mt-4 mt-md-0">
          <Link href={'/create/song'}>
            <a className={'btn btn-primary btn-create w-100'}>Create a Song</a>
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col-12 d-flex">
          <div className="p-1">
            <button
              onClick={() => setStatus('publish')}
              className={`custom-pills nowrap ${
                status === 'publish' ? 'active' : ''
              }`}
            >
              Published
            </button>
          </div>
          <div className="p-1">
            <button
              onClick={() => setStatus('draft')}
              className={`custom-pills nowrap ${
                status === 'draft' ? 'active' : ''
              }`}
            >
              Drafts
            </button>
          </div>
        </div>
      </div>
      <div className="row mt-4 mt-md-5">
        {!songs && <SpinnerLoader />}
        {songs &&
          songs.songs &&
          songs.songs?.map((song) => (
            <div className={'col-12 col-md-6 col-lg-4 mb-4'} key={song.id}>
              <CardSong mutate={mutate} song={song} />
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
    </div>
  )
}

export default ManageSongs
