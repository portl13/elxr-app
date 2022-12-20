import React from 'react'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from '@fortawesome/free-solid-svg-icons'

const MediaImage = ({ media }) => {
  const imageUrl =
    media?.media_details?.sizes?.medium?.source_url || media?.source_url

  return (
    <div className="ratio ratio-16x9 bg-gray opacity-50 col-4">
      <img
        className="translate-middle start-50 top-50 h-100"
        src={imageUrl}
        alt={media.title.rendered}
      />
    </div>
  )
}

const MediaVideo = ({ media }) => {  
  return (
    <div className="ratio ratio-16x9 bg-gray opacity-50">
      <span className='video-title'>
          {media.title.rendered}
      </span>
    </div>
  )
}

const MediaAudio = () => {  
  return (
    <div className="media-audio bg-gray opacity-50 col-4">
      <FontAwesomeIcon className='media-audio-icon' icon={faMusic} />
    </div>
  )
}

const MediaText = ({ media }) => {  
  return (
    <div className="ratio ratio-16x9 bg-gray opacity-50">
      <span className='video-title'>
          {media.title.rendered}
      </span>
    </div>
  )
}

const MediaMetadata = ({ media }) => {
  return(
    <div className='media-metadata col-8'>
      <h4 className='media-metadata-title'>
        {media?.title?.rendered || ''}
      </h4>
      <div className='media-metadata-minor'>
        <span>{media?.mime_type || ''}</span> &nbsp;&nbsp;&nbsp;
        <span>{media?.date ? format(new Date(media.date), 'dd MMMM yyyy') : ''}</span>
      </div>
      <span className='media-metadata-url'>{media?.source_url || ''}</span>
    </div>
  )
}

function MediaLibraryItem({ media }) {
  const { mime_type } = media

  return (
    <div className="selected-image row mx-0">

      {mime_type.includes('image') && <MediaImage media={media} />}
      {mime_type.includes('video') && <MediaVideo media={media} />}
      {mime_type.includes('audio') && <MediaAudio media={media} />}
      {mime_type.includes('text') && <MediaText media={media} />}

      {(mime_type.includes('image') || mime_type.includes('audio')) && <MediaMetadata media={media} />}
    </div>
  )
}



export default MediaLibraryItem
