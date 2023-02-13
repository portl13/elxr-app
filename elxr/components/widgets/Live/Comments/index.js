import React from "react";
import SpinnerLoader from "@/components/shared/loader/SpinnerLoader";
import PostComment from "../PostComment";

import CommentItem from "./CommentItem";

import { spinnerCss } from "./styles";

const Comments = (props) => {
  const { comments = [], mutate, loading, handleIncreaseComments } = props;

  return (
    <div>
      {loading && <SpinnerLoader css={spinnerCss} />}
      {!loading && comments.map((c) => <CommentItem key={c.id} comment={c} />)}
      <PostComment
        postId={props.postId}
        mutate={mutate}
        onCancel={props.onCloseComments}
        handleIncreaseComments={handleIncreaseComments}
      />
    </div>
  );
};

export default Comments;
