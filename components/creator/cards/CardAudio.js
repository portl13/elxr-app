import React from 'react'

function CardAudio({ audio }) {
  return (
    <>
      <article className="card-general">
        <div className="p-3">
          <div className="d-flex justify-content-between">
            <span className="badge badge-primary mb-1">Podcast</span>
          </div>
          <div className="mt-3">
            <h5 className="m-0 font-size-12 font-weight-bold">{audio.title}</h5>
            <p className="m-0 font-size-12 line-clamp-2">{audio.description}</p>
          </div>
        </div>
      </article>
    </>
  )
}

export default CardAudio
