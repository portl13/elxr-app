import React, { useState, useEffect } from "react";
import { Spinner, Button, Modal, ModalBody } from "reactstrap";
import { uploadModal } from "../../components/livefeed/photo.style";
import axios from "axios";
import moment from "moment";
export default function BlockUserCard({
  id,
  user,
  blockId,
  handleDelete,
  date,
  status,
}) {
  const [userName, setUserName] = useState();
  const [loadData, setLoadData] = useState(false);
  const [load, setLoad] = useState(false);
  const [show, setShow] = useState(false);
  useEffect(() => {
    getMember();
  }, [id]);
  useEffect(() => {
    if (status) {
      setLoad(false);
    }
  }, [status]);
  function getMember() {
    axios
      .get(process.env.bossApi + `/members/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
        params: {
          username_visible: 1,
        },
      })
      .then((res) => {
        setUserName(res.data.profile_name);
        setLoadData(true);
      });
  }
  function unblockUser() {
    handleDelete(blockId);
    setLoad(true);
  }
  return (
    <>
      {loadData && (
        <div className="main-panel">
          <span className="user-name">{userName}</span>
          <span className="time-tag">
            {moment(date).format("MMMM DD, YYYY  h:mm a")}
          </span>
          <span className="unblock-tag" onClick={() => setShow(true)}>
            {load && (
              <Spinner
                style={{ width: "1.2rem", height: "1.2rem" }}
                color="primary"
              />
            )}
            Unblock
          </span>
        </div>
      )}
      <Modal
        className="modal-dialog-centered modal-sm"
        isOpen={show}
        css={uploadModal}
      >
        <ModalBody className="text-center">
          <p className="mb-4">Are you sure you want to Unblock this User?</p>
          <Button color="secondary-text" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={() => {
              unblockUser();
              setShow(false);
            }}
          >
            Confirm
          </Button>
        </ModalBody>
      </Modal>
    </>
  );
}
