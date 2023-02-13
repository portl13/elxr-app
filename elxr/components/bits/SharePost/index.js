import React from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  EmailIcon,
  LinkedinIcon,
  WhatsappIcon,
  RedditIcon,
} from "react-share";
import { stripHtmlTags } from "@/elxr/lib/html-sanitizer";

import { ShareActions } from "./styles";

const baseUrl = process.env.nextSite;

const SharePost = ({ cardId, title, rendered, css }) => {
  const subject = React.useMemo(() => {
    return `${stripHtmlTags(title)}${
      rendered ? `: ${stripHtmlTags(rendered)}` : ""
    }`;
  }, [title, rendered]);

  const encodedURL = `${baseUrl}/activity/${cardId}`;
  return (
    <>
      <ShareActions css={css}>
        <FacebookShareButton url={encodedURL} title={subject}>
          <FacebookIcon size={25} round />
        </FacebookShareButton>
        <TwitterShareButton title={subject} url={encodedURL}>
          <TwitterIcon size={25} round />
        </TwitterShareButton>
        <LinkedinShareButton source={subject} url={encodedURL} title={subject}>
          <LinkedinIcon size={25} round />
        </LinkedinShareButton>
        <WhatsappShareButton title={subject} url={encodedURL}>
          <WhatsappIcon size={25} round />
        </WhatsappShareButton>
        <EmailShareButton subject={encodedURL}>
          <EmailIcon size={25} round />
        </EmailShareButton>
        <RedditShareButton title={subject} url={encodedURL}>
          <RedditIcon size={25} round />
        </RedditShareButton>
      </ShareActions>
    </>
  );
};

export default SharePost;
