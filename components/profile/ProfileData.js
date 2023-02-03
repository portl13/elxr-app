import React, { useState, useEffect } from "react";
import Router from "next/router";
import Biography from "@components/profile/biography";
import Axios from "axios";
import Loader from "../../components/loader";

function ProfileData({
  user,
  tab,
  curntUserId,
  isCurntUser,
  functionRedirect,
}) {
  const [data, setData] = useState();
  const [spinnerLoad, setSpinnerLoad] = useState(true);

  const profile = process.env.bossApi + "/members/";
  useEffect(() => {
    if (curntUserId.id !== data?.id) {
      setSpinnerLoad(true);
    }
  }, [curntUserId]);
  function getUser() {
    {
      user &&
        Axios.get(profile + curntUserId.id, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        })
          .then((res) => {
            setData(res.data);
            setSpinnerLoad(false);
          })
          .catch(() => setSpinnerLoad(false));
    }
  }
  useEffect(() => {
    if (tab === "profile") {
      Router.push(
        functionRedirect(curntUserId.name, curntUserId.id, "profile")
      );
      getUser();
    }
  }, [tab, curntUserId]);

  if (spinnerLoad)
    return (
      <div style={{ textAlign: "center" }}>
        <Loader />
      </div>
    );


  return (
    <>
      <div className="itemBody">
        <div className="item-body-inner">
          <div className="button-right-container">
            {isCurntUser && (
              <button
                type="button"
                onClick={(e) => Router.push("/profile-edit?tab=profile-update")}
                className="btn btn-outline-primary"
              >
                Edit Profile
              </button>
            )}
          </div>
          {data && <Biography user={data} />}
        </div>
      </div>
    </>
  );
}

export default ProfileData;
