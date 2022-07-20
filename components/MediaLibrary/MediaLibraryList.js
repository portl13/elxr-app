import React from 'react'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import MediaLibraryItem from './MediaLibraryItem'

function MediaLibraryList({ media, setMediaSelected, mediaSelected }) {

  const handleClick = (media) => {
    setMediaSelected(media)
  }
  return (
    <div className="row">
      {!media && (
        <div className="col">
          <SpinnerLoader />
        </div>
      )}
      {media &&
        media.map((item) => (
          <div
            key={item.id}
            onClick={() => handleClick(item)}
            className={"col-6 col-md-3 mb-4 media-item" + (mediaSelected?.id === item.id ? ' active' : '')}
          >
            <MediaLibraryItem media={item} />
          </div>
        ))}
    </div>
  )
}

export default MediaLibraryList
