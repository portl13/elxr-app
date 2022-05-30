import React from 'react';
import { CommunityCardLivefeedStyle } from '../livefeed/livefeed.style';

const CommunityCardLivefeed = ({ activity, avatarComunity, nameComunity }) => {


  const {
    user_avatar: { thumb = '/img/user.png' },
    content: {
      rendered = null
    },
    name = '',
    type = 'activity_update',
    bp_media_ids
  } = activity;

  return (

    <div css={CommunityCardLivefeedStyle} >

      <div className="activity-header d-flex mb-2">

        <div className="item-avatar">

          <img className="avatar" src='{thumb}' />

        </div>

        <p className="activity-header-text">

          <a href="/" className="mr-1">{name}</a>

          {type === "activity_update" && "posted in the community"}
          {type === "joined_group" && "joined the community"}

          <img className="avatar activity-avatar" src={avatarComunity} />

          <span >{nameComunity}</span >

        </p>
      </div>

      <div className="activity-content">

        <div className="activity-inner">
          <div dangerouslySetInnerHTML={{ __html: rendered }} />
        </div>

        {bp_media_ids && (
          <div><img src={bp_media_ids[0].full ? bp_media_ids[0].full : bp_media_ids[0].thumb} alt="" /></div>
        )}

      </div>
    </div>
  )
}

export default CommunityCardLivefeed;
