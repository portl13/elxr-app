import React from 'react'
import Link from 'next/link'
import { stringToSlug } from '@lib/stringToSlug'

function SongCard({song}) {
  return (
    <div className="card-general-new">
    <Link href={`/song/${stringToSlug(song.title)}/${song.id}`}>
      <a>
        <div
          className="ratio ratio-1x1 border-radius-17 bg-gray card-head cover-bg"
          style={{ backgroundImage: `url(${song.thumbnail})` }}
        ></div>
      </a>
    </Link>
    <div className="py-3">
      <h4 className="font-size-18  m-0">
        <Link href={`/song/${stringToSlug(song.title)}/${song.id}`}>
          <a className='text-white'>{song.title}</a>
        </Link>
      </h4>
      <div className="d-flex alig-items-center text-grey ">
        <span className="font-size-13 mr-1">
          Channel: {song.channel_name}
        </span>
      </div>
      <div className=" d-flex  text-grey">
      <span className="font-size-13 mr-1">Category:</span>
      <span className="font-size-13">{song.category}</span>
    </div>
    </div>
  </div>
  )
}

export default SongCard