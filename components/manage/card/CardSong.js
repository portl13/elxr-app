import React, { useState } from 'react'
import Link from 'next/link'
import SongModalDelete from '@components/song/SongModalDelete'

function CardSong({ song, mutate }) {
    const [open, setOpen] = useState(false)
  return (
    <>
    <div className="card-general-new w-100">
      <Link href={`/`}>
        <a>
          <div
            style={{
              backgroundImage: `url(${song?.thumbnail})`,
            }}
            className="ratio ratio-1x1 bg-gray border-radius-17 card-head cover-bg"
          ></div>
        </a>
      </Link>
      <div className="py-3 px-0 courses">
        <h3 className="font-size-18 m-0">
          <Link href={`/`}>
            <a className="text-white text-ellipsis">{song.title}</a>
          </Link>
        </h3>
      </div>
      <div className="card-footer-actions">
        <Link href={`/manage/edit/song/${song.id}`}>
          <a className="btn btn-action primary">Edit</a>
        </Link>
        <button 
        onClick={()=>setOpen(!open)}
        className="btn btn-action danger">Delete</button>
        <Link href={`/`}>
          <a className="btn btn-action">View</a>
        </Link>
      </div>
    </div>
    <SongModalDelete mutate={mutate} open={open} setOpen={setOpen} song={song} />
    </>
  )
}

export default CardSong
