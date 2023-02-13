import React from "react";
import { css } from "@emotion/core";
import Link from "next/link";
import { stringToSlug } from "@lib/stringToSlug";

const styles = css`
  .category {
    color: var(--typo);
    font-weight: 600;
  }
  .title {
    font-weight: 700;
    font-size: 14px;
  }
  .large-body{
    top: unset;
    bottom: 0;
  }
  &.large-main-card::before {
    content: "";
    background: rgb(10 12 13 / 15%);
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 0;
  }
`;

function LargeMainCard({ type, item, image, title, category }) {
  return (
    <>
      <div css={styles} className="card-general-new w-100">
        <Link href={`/${type}/${stringToSlug(title)}/${item.id}`}>
          <a>
            <div
              style={{
                backgroundImage: `url(${image})`,
              }}
              className="ratio ratio-channel-home bg-gray border-radius-17 card-head cover-bg position-relative"
            >
              <div className={"px-2 pb-3 z-index-2 large-body"}>
                <span className={"font-size-12 sub-title-event category"}>{category}</span>
                <h3 className={"m-0 text-white font-size-15 sub-title-event"}>{title}</h3>
              </div>
            </div>
          </a>
        </Link>
      </div>
    </>
  );
}

export default LargeMainCard;
