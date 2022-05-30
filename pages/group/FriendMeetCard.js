import React from "react";
function FriendMeetCard({ member, name, image, removeId }) {
  return (
    <>
      <div className="data-panel">
        <div className="data-image">
          <img src={image} />
          <label>{name}</label>
        </div>
        <button onClick={() => removeId(member)} className="remove-invite">Remove invite</button>
      </div>
    </>
  );
}
export default FriendMeetCard;
