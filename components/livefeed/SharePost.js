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

const baseUrl = process.env.nextSite

const SharePost = ({ cardId, title, rendered }) => {
  const stripHtml = (html) => {
    let tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const subject = `${stripHtml(title)}${
    rendered ? `: ${stripHtml(rendered)}` : ""
  }`;
  const encodedURL = `${baseUrl}/activity/${cardId}`;
  return (
    <>
      <div className="social-panel">
        <FacebookShareButton
          url={encodedURL}
          title={subject}
          className="share-link"
        >
          <FacebookIcon size={25} round />
        </FacebookShareButton>
        <TwitterShareButton
          title={subject}
          url={encodedURL}
          className="share-link"
        >
          <TwitterIcon size={25} round />
        </TwitterShareButton>
        <LinkedinShareButton
          source={subject}
          url={encodedURL}
          title={subject}
          className="share-link"
        >
          <LinkedinIcon size={25} round />
        </LinkedinShareButton>
        <WhatsappShareButton
          title={subject}
          url={encodedURL}
          className="share-link"
        >
          <WhatsappIcon size={25} round />
        </WhatsappShareButton>
        <EmailShareButton subject={encodedURL} className="share-link">
          <EmailIcon size={25} round />
        </EmailShareButton>
        <RedditShareButton
          title={subject}
          url={encodedURL}
          className="share-link"
        >
          <RedditIcon size={25} round />
        </RedditShareButton>
      </div>
    </>
  );
};

export default SharePost;
