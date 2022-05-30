import React, { useState, useEffect } from "react";
import FollowingCard from "./FollwingCard";
import { getFollowing, deleteFollowing } from "../api/my-account/following.api";
import { Spinner } from "reactstrap";

function Following({ user }) {
  const [result, setResult] = useState();
  const [spin, setSpin] = useState(false);
  const [closeModal, setCloseModal] = useState(true);

  useEffect(() => getFollowingDetail(), []);
  function getFollowingDetail() {
    getFollowing(user)
      .then((res) => {
        setResult(res.data.data);
      })
      .catch((error) => console.log(error));
  }
  function deleteFollow(childData) {
    setCloseModal(false);
    const data = {
      store_id: childData,
    };
    deleteFollowing(user, data).then((res) => {
      setResult(result.filter((item) => item.store_id !== childData));
      setCloseModal(true);
      setSpin(false);
    });
  }

  return (
    <>
      <h3>Followings</h3>
      <div className="wcfm-datatable">

        <div className="row-head">
          <div className="following-div-1">STORE</div>
          <div className="following-div-2">EMAIL</div>
          <div className="following-div-3">ACTIONS</div>
        </div>
        {!result && (
          <Spinner
            style={{ width: "1.2rem", height: "1.2rem" }}
            color="primary"
          />
        )}
        {result && result.length === 0 && (
          <span className="no-vendor">You are not following any vendor yet!</span>
        )}
        {result &&
          result.map((follow) => (
            <FollowingCard
              following={follow}
              spin={spin}
              setSpin={setSpin}
              parentDelete={deleteFollow}
              id={follow.store_id}
              closeModal={closeModal}
            />
          ))}
      </div>
    </>
  );
}
export default Following;
