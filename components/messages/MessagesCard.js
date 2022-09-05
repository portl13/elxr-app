import React, { useState, useEffect } from "react";
import { css } from "@emotion/core";
import Link from "next/link";
import { getProfileRoute } from "../../utils/constant";

export const MessagesCard = ({ data,getId, handleClose }) => {
  const {
    profile_name = "",
    avatar_urls = "",
    mention_name = "",
    name="",
    id = ""
  } = data;

  // const getChatUrl = () => {
  //   return `www.google.com`;
  // };

  return (
    <>
      <div
        css={css`
          .item-avatar {
            max-width: 48px;
            .avatar {
              border-radius: 3px;
              width: 40px;
              height: 40px;
            }
          }
          .item-title a {
            line-height: 1.35;
            font-size: 0.9375rem;
            font-weight: 500;
            letter-spacing: -0.24px;
            color: var(--primary-color);
          }
          .item-title a:hover {
            color: var(--primary-hover);
          }
          .item-meta {
            color: #a3a5a9;
            font-size: 12px;
            letter-spacing: -0.26px;
            line-height: 1.2;
            overflow-wrap: break-word;
            font-weight: lighter;
          }
        `}
        className="community-card d-flex mb-3"
      >

        <div className="leftMsg">
        <div className="item-avatar mr-2">
          <Link href={getProfileRoute(mention_name, id, "profile")}>
            <a>
              {avatar_urls.full && (
                <img
                  className="avatar group-303-avatar avatar-150 photo"
                  src={avatar_urls.full}
                  alt={`Community logo of ${name}`}
                  width="150"
                  height="150"
                />
              )}
            </a>
          </Link>
        </div>

        <div className="item flexItem">
          <div className="cardLeft">
            <div className="item-title">
              <Link href={getProfileRoute(mention_name, id, "profile")}>
                <a>{name}</a>
              </Link>
            </div>
            <div className="item-meta">
              <span className="activity">{mention_name}</span>
            </div>
          </div>
        </div>
        </div>
        {/* <Link href={getChatUrl()}> */}
        <div class="chatCircle" onClick = {()=>{getId(id);handleClose()}}><svg width="19" height="19" viewBox="0 0 19 19" xmlns="http://www.w3.org/2000/svg"><path d="M18.81 7.625a9.435 9.435 0 0 0-4.052-6.035A9.47 9.47 0 0 0 7.922.133L7.875.14C2.714 1.036-.755 5.964.142 11.123c.071.413.172.826.296 1.221.523 1.7.394 3.52-.362 5.13a.79.79 0 0 0 .924 1.1l3.548-.97a9.415 9.415 0 0 0 6.825 1.206 9.436 9.436 0 0 0 6.036-4.052 9.439 9.439 0 0 0 1.401-7.133z" fill="#FFF" fill-rule="nonzero"></path></svg></div>
        {/* </Link> */}
      </div>
    </>
  );
};

export default MessagesCard;
