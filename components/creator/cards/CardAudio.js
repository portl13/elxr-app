import React from 'react'

function CardAudio({ audio }) {
  return (
    <>
      <article className="card-general">
        <div
          className="ratio ratio-16x9 bg-gray card-head cover-bg"
          style={{ backgroundImage: `url(${audio.thumbnail || audio.cover})` }}
        ></div>
        <div className="p-3">
          <div className="d-flex justify-content-between">
            <span className="badge badge-primary mb-1">Podcast</span>
          </div>
          <h5 className="mt-2 mb-2 font-size-12 font-weight-bold">
            {audio.title}
          </h5>
          <p className="m-0 font-size-12 line-clamp-2">{audio.description}</p>
        </div>
      </article>
    </>
  )
}

export default CardAudio
