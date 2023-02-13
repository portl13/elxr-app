import React from "react";
import { InputBase } from "@material-ui/core";
import SpinnerLoader from "@/components/shared/loader/SpinnerLoader";

import {
  CommentContainer,
  inputStyle,
  ActionContainer,
  spinnerCss,
} from "./styles";
import Buttom from "@/elxr/components/bits/buttons/Button";
import { fetchers } from "@/elxr/network/portlApiClient";
import useEvent from "@/elxr/hooks/useEvent";

const PostComment = ({ postId, mutate, onCancel, handleIncreaseComments }) => {
  const ref = React.useRef();
  const [isSubmiting, setIsSubmiting] = React.useState(false);

  const handleCancel = useEvent(() => {
    ref.current.value = "";
    onCancel();
  });

  const handleSubmit = useEvent(async () => {
    const value = ref.current.value;

    if (value) {
      setIsSubmiting(true);

      const data = await fetchers.post(
        `https://elxrbackend.portl.live/wp-json/buddyboss/v1/activity/${postId}/comment`,
        { content: value }
      );

      handleIncreaseComments();
      mutate({ comments: data.comments });
      ref.current.value = "";
      setIsSubmiting(false);
    }
  });

  return (
    <>
      <CommentContainer>
        <InputBase
          inputRef={ref}
          css={inputStyle}
          placeholder="Post a comment"
        />
      </CommentContainer>
      {isSubmiting && <SpinnerLoader css={spinnerCss} />}

      {!isSubmiting && (
        <ActionContainer>
          <Buttom variant="rounded" onClick={handleCancel}>
            Cancel
          </Buttom>
          <Buttom variant="rounded" onClick={handleSubmit}>
            Post
          </Buttom>
        </ActionContainer>
      )}
    </>
  );
};

export default PostComment;
