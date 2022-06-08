import React from "react";

function AllFollowersList({followerList}) {
  return (
    <> <div className="card_follower">
      <div className="card_follower_img">
        <img src={followerList?.avatar} alt="image" />
      </div>
      <div className="card_follower_text">{followerList?.display_name}</div>
      </div>
    </>
  )
}

export default AllFollowersList;