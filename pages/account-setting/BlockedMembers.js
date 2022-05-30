import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import BlockUserCard from "../../components/profile/BlockUserCard";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { LoaderContainer } from "../../components/livefeed/livefeed.style";

export default function BlockPage() {
  const { user } = useContext(UserContext);
  const [result, setResult] = useState([]);
  const [loadData, setLoadData] = useState(false);
  const [status, setStatus] = useState(false);
  useEffect(() => {
    if (user?.id) {
      getBlockUser();
    }
  }, [user]);
  function getBlockUser() {
    axios
      .get(process.env.bossApi + `/moderation`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setResult(res.data);
        setLoadData(true);
      });
  }
  function unblockUser(childData) {
    setStatus(false);
    axios(process.env.bossApi + `/moderation/${childData}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }).then((res) => {
      setResult(result.filter((item) => item.id !== childData));
      setStatus(true);
    });
  }
  return (
    <>
      {!loadData && (
        <p css={LoaderContainer}>
          <span>
            <FontAwesomeIcon icon={faClock} />
          </span>
          Loading blocked members. Please wait.
        </p>
      )}
      {loadData && result.length == 0 && (
        <p css={LoaderContainer}>
          <span>
            <FontAwesomeIcon icon={faClock} />
          </span>
          No blocked members found.
        </p>
      )}
      {loadData && result.length >= 1 && (
        <div className="inner-container">
          <div className="main-text">
            <h4>Blocked Members</h4>
            {result.map((blockuser) => (
              <BlockUserCard
                id={blockuser.item_id}
                user={user}
                blockId={blockuser.id}
                handleDelete={unblockUser}
                date={blockuser.last_updated}
                status={status}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
