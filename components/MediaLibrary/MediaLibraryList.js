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
  selectMediaItem,
  selectedMediaItems,
  selectToDelete
}) {
  const handleClick = (media) => {
    setMediaSelected(media)
  }

  const checkInActiveMedia = (mediaItems, mediaItem) => {
    const index = mediaItems.findIndex((e) => mediaItem.id === e.id);
    return index >= 0;
  };

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
              onClick={selectToDelete ? () => selectMediaItem(item) : () => handleClick(item)}
              className={'media-item' + (mediaSelected?.id === item.id ? ' active' : '')}
            >
              <div className={`selected-image row mx-0 
                  ${checkInActiveMedia(selectedMediaItems, item) ? ' active' : ''}`
                }
              >
                <MediaLibraryItem media={item} />
              </div>
            </div>
          ))}
      </InfiniteScroll>
    </div>
  )
}

export default MediaLibraryList
