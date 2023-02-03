import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentAlt,
  faShareAlt,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Alert } from "reactstrap";
import SharePost from "../../components/livefeed/SharePost"

function PhotoAction({ activityId, parentCallback, like, setViewComment, photoDetail }) {
  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);
  const [shareShow, setShareShow] = useState(false);
  return (
    <>
      <Alert color="warning" isOpen={visible} toggle={onDismiss}>
        Coming Soon...
      </Alert>
      <Button onClick={() => parentCallback(activityId, false)}>
        <FontAwesomeIcon icon={faThumbsUp} />
        {like ? "Unlike" : "Like"}
      </Button>
      <Button onClick={() => setViewComment(true)}>
        <FontAwesomeIcon icon={faCommentAlt} />
        Comment
      </Button>
      <Button onClick={() => setShareShow(!shareShow)}
      >
        <FontAwesomeIcon icon={faShareAlt} />
        Share
      </Button>
      {shareShow && <SharePost
        cardId={photoDetail.activity_id}
        title={photoDetail.report_button_text}
        image={photoDetail.attachment_data.full}
        rendered={"rendered"} />}
    </>
  );
}
export default PhotoAction;
