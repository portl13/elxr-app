import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { reportModal } from "@components/livefeed/livefeed.style";
import Link from "next/link";
import { genericFetchPost } from "@request/dashboard";

const url = process.env.bossApi + "/moderation";

function ProfileBlockMember({
  token,
  blockUserId,
  close,
  show,
  setShow,
  setShowOption,
}) {
  const blockUser = async () => {
    try {
      await genericFetchPost(url, token, {
        item_id: blockUserId,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const confirm = async () => {
    setShow(false);
    setShowOption(false);
    await blockUser();
  };

  return (
    <Modal
      className="modal-dialog-centered"
      isOpen={show}
      css={reportModal}
      toggle={close}
    >
      <ModalHeader toggle={close} className="block-panel">
        Block Member?
      </ModalHeader>
      <ModalBody>
        <p>Please confirm you want to block this member.</p>
        <p>You will no longer be able to:</p>
        <ul>
          <li>See blocked member's posts</li>
          <li>Mention this member in posts</li>
          <li>Invite this member to groups</li>
          <li>Message this member</li>
          <li>Add this member as a connection</li>
        </ul>

        <p>
          <span className="bold-tag">Please note:</span> This action will also
          remove this member from your connections and send a report to the site
          admin. Please allow a few minutes for this process to complete.
        </p>
      </ModalBody>
      <ModalFooter className="py-3">
        <Button
          color="secondary-text"
          onClick={() => {
            setShow(false);
            setShowOption(false);
          }}
        >
          Cancel
        </Button>
        <Link href={"/account-setting?tab=blocked-members.js"}>
          <Button color="primary" onClick={confirm}>
            Confirm
          </Button>
        </Link>
      </ModalFooter>
    </Modal>
  );
}

export default ProfileBlockMember;
