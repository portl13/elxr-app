import React, { useContext } from 'react'
import { UserContext } from '@context/UserContext'
import useSWR from 'swr'
import { getFetchPublic } from '@request/creator'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import SubscriptionButton from '@components/shared/button/SubscriptionButton'
import FollowButton from '@components/shared/button/FollowButton'
import CategoryAndTags from '@components/shared/cards/CategoryAndTags'

const creatorData = `${process.env.baseUrl}/wp-json/portl/v1/channel?user_id=`

function ChannelCardMedia({ author, song }) {
  const { user } = useContext(UserContext)
  const { data: creator, error } = useSWR(
      author ? `${creatorData}${author}` : null,
      getFetchPublic
      )
  if (error) {
    return ''
  }

  if (!creator) {
    return <SpinnerLoader />
  }
  return (
    <div className="card-channel-media blue-drak py-2 px-3 mt-4 py-md-3 border-radius-17">
      <div className="img-channel-media">
        <div 
        style={{
          backgroundImage: `url('${creator?.vendor_shop_logo}')`
        }}
        className="avatar-detail bg-cover">
        </div>
      </div>

      <div className="d-flex flex-column flex-md-row name-channel-media ">
        <div className="mx-md-1  mt-2 mt-md-0 w-100">
          <h4 className="m-0 font-weight-bold font-size-20">{creator.vendor_shop_name}</h4>
          {song && (
          <CategoryAndTags category={song?.category} tags={song?.tags} />
        )}
        </div>
      </div>

      <div className="d-flex mt-2 buttons-channel-media">
        <div className="position-relative">
          {creator && author && <FollowButton user_id={author} />}
        </div>
        <div className="position-relative ml-1 ml-md-3">
          {author && <SubscriptionButton vendor_id={author} user={user} />}
        </div>
      </div>
    </div>
  )
}

export default ChannelCardMedia
