import React from 'react'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import MediaLibraryItem from './MediaLibraryItem'
import InfiniteScroll from 'react-infinite-scroll-component'

function MediaLibraryList({
  media,
  setMediaSelected,
  mediaSelected,
  loadMore,
  hasMore,
}) {
  const handleClick = (media) => {
    setMediaSelected(media)
  }

  return (
    <div className="w-100">
      <InfiniteScroll
        next={() => loadMore()}
        dataLength={media?.length}
        hasMore={hasMore}
        loader={<SpinnerLoader />}
        height={400}
        endMessage={
          <p className="text-center d-flex justify-content-center align-items-center no-image">
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {media &&
          media.map((item) => (
            <div
              key={item.id}
              onClick={() => handleClick(item)}
              className={
                'media-item' +
                (mediaSelected?.id === item.id ? ' active' : '')
              }
            >
              <MediaLibraryItem media={item} />
            </div>
          ))}
      </InfiniteScroll>
    </div>
  )
}

export default MediaLibraryList
