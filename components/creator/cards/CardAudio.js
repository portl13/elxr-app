import CategoryAndTags from '@components/shared/cards/CategoryAndTags'
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { stringToSlug } from '@lib/stringToSlug'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRef } from 'react'

function CardAudio({ audio }) {
  const [play, setPlay] = useState(false)
  const audioRef = useRef()
  useEffect(() => {
    if (play) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [play])

  return (
    <article className="card-general">
      <Link href={`/podcasts/${stringToSlug(audio.title)}/${audio.id}`}>
        <a>
          <div
            className="ratio ratio-16x9 bg-gray card-head cover-bg bg-gray"
            style={{
              backgroundImage: `url(${audio.thumbnail || audio.cover})`,
            }}
          >
            {/* <span className="duration-video">
          <div onClick={() => setPlay(!play)} className="player-circle">
            {!play && <FontAwesomeIcon className="play-icon" icon={faPlay} />}
            {play && <FontAwesomeIcon className="play-icon" icon={faStop} />}
          </div>
        </span> */}
          </div>
        </a>
      </Link>
      <div className="p-3">
        <audio
          className={`w-100 ${audio.audio && play ? 'd-block' : 'd-none'}`}
          ref={audioRef}
          controls
          src={audio.audio}
        />

        <div className="d-flex justify-content-between">
          <span className="badge badge-primary mb-1">Podcast</span>
        </div>
        <h5 className="mt-2 mb-2 font-size-12 font-weight-bold">
          <Link href={`/podcasts/${stringToSlug(audio.title)}/${audio.id}`}>
            <a className='text-white'>{audio.title}</a>
          </Link>
        </h5>
        <p className="m-0 font-size-12 line-clamp-2">{audio.description}</p>
        <CategoryAndTags category={audio.category} tags={audio.tags} />
      </div>
    </article>
  )
}

export default CardAudio