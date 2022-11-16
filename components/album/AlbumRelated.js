import SongCard from '@components/main/card/SongCard'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import { getFetchPublic } from '@request/creator'
import React from 'react'
import useSWR from 'swr'

const url = `${process.env.apiV2}/albums`

function AlbumRelated({ category }) {
  const { data: albums } = useSWR(`${url}?category=${category}&page=1&per_page=3`, getFetchPublic)
  return (
    <aside>
      {!albums && <SpinnerLoader />}
      {albums &&
        albums.albums.map((album) => (
          <div className="mb-4" key={album.id}>
            <SongCard tipo='album' item={album} />
          </div>
        ))}
    </aside>
  )
}

export default AlbumRelated
