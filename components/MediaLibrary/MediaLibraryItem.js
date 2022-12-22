import React from 'react'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from '@fortawesome/free-solid-svg-icons'
import { faVideo } from '@fortawesome/free-solid-svg-icons'

const MediaImage = ({ media }) => {
  const imageUrl =
    media?.media_details?.sizes?.medium?.source_url || media?.source_url

  return (
    <div className='col-3'>
      <div 
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
        className="ratio ratio-16x9 bg-gray opacity-50 bg-cover"
      >
      </div>
    </div>
  )
}

const MediaVideo = () => {  
  return (
    <div className="media-video bg-gray opacity-50 col-3">
      <FontAwesomeIcon className='media-icon' icon={faVideo} />
    </div>
  )
}

const MediaAudio = () => {  
  return (
    <div className="media-audio bg-gray opacity-50 col-3">
      <FontAwesomeIcon className='media-icon' icon={faMusic} />
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
    </div>
  )
}

function MediaLibraryItem({ media }) {
  const { mime_type } = media

  return (
    <>
      {mime_type.includes('image') && <MediaImage media={media} />}
      {mime_type.includes('video') && <MediaVideo media={media} />}
      {mime_type.includes('audio') && <MediaAudio media={media} />}
      {mime_type.includes('text') && <MediaText media={media} />}

      {(mime_type.includes('image') || mime_type.includes('audio') || mime_type.includes('video')) && 
        <MediaMetadata media={media} />
      }
    </>
  )
}

export default MediaLibraryItem
