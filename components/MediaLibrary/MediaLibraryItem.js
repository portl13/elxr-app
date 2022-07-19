import React from 'react'

const MediaImage = ({ media }) => {
  const imageUrl =
    media?.media_details?.sizes?.medium?.source_url || media?.source_url

  return (
    <div className="ratio ratio-16x9 bg-gray opacity-50">
      <img className='translate-middle start-50 top-50' src={imageUrl} alt={media.title.rendered} />
    </div>
  )
}

function MediaLibraryItem({ media }) {
  const { media_type } = media
  return <div className='selected-image'>{media_type === 'image' && <MediaImage media={media} />}</div>
}

export default MediaLibraryItem
