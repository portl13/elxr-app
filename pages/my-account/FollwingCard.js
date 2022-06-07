import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import FollowingDelete from "@pages/my-account/FollowingDelete";
function FollowingCard({
  following,
  spin,
  setSpin,
  parentDelete,
  id,
  closeModal,
}) {
  const [deleteModal, setDeleteModal] = useState(false);
  useEffect(() => {
    if (closeModal) {
      setDeleteModal(false);
    }
  }, [closeModal]);
  return (
    <>
      <div className="column-head justify-content-between">
        <div className="following-div-1">{following?.store_name}</div>
        <div className="following-div-2 d-none d-lg-block">–</div>
        <div className="following-div-3" onClick={() => setDeleteModal(true)}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </div>
      </div>
      {deleteModal && (
        <FollowingDelete
          show={deleteModal}
          parentDelete={parentDelete}
          setDeleteModal={setDeleteModal}
          spin={spin}
          setSpin={setSpin}
          id={id}
        />
      )}
    </>
  );
}
export default FollowingCard;
