import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@context/UserContext";
import useSWRImmutable from "swr/immutable";
import { genericFetch } from "@request/dashboard";
import { followMember } from "@api/member.api";
import { Spinner } from "reactstrap";
import { useAlert } from "react-alert";

const bossApi = process.env.bossApi;

function FollowButton({ user_id }) {
  const alert = useAlert();
  const { user } = useContext(UserContext);
  const token = user?.token;

  const [member, setMember] = useState(null);
  const [following, setFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { data, mutate } = useSWRImmutable(
    token ? [`${bossApi}/members?include=${user_id}`, token] : null,
    genericFetch
  );

  const handleFollowMember = async (user, member) => {
    setIsLoading(true);
    const formData = {
      user_id: member.id,
      action: member.is_following ? "unfollow" : "follow",
    };
    try {
      const response = await followMember(user, formData);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFollow = async (member, user, mutate) => {
    if (!member || !user) {
      alert.success("Login to follow");
    }
    if (member && user) {
      await handleFollowMember(user, member);
      setFollowing(true);
      await mutate({ ...member, is_following: true });
    }
  };

  useEffect(() => {
    if (data && data.length > 0) {
      setMember(data[0]);
      setFollowing(data[0].is_following);
    }
  }, [data]);

  return (
    <button
      onClick={() => handleFollow(member, user, mutate)}
      className="btn btn-borde btn-border-primary text-primary"
    >
      <span className={"d-flex align-items-center"}>
        <span className={"d-inline-block mr-2"}>
          {following ? "UnFollow" : "Follow"}
        </span>
        {isLoading && <Spinner size={"sm"} color={"primary"} />}
      </span>
    </button>
  );
}

export default FollowButton;
