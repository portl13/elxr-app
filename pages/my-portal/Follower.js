import React from "react";
import AllFollowersList from "./FollowerList";
function Follower({ channelFollowers }) {
  return (
    <>
      <div className="item-body-content">
        <div className="card_main_tag">
         
            {channelFollowers && channelFollowers.map((followerList) => {
              return (
                <>
                  <AllFollowersList followerList={followerList}/>
                </>
              )
            })}        
        </div>
      </div>
    </>
  )
}

export default Follower;