import React from "react";
import { css } from "@emotion/core";
import Link from "next/link";
import {stringToSlug} from "@lib/stringToSlug";

const styles = css`
  min-height: 380px;
  .category {
    color: var(--typo);
    font-weight: 600;
  }
  .title {
    font-weight: 700;
  }
  &.large-main-card::before{
    content: '';
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
      <Link href={`/${type}/${stringToSlug(title)}/${item.id}`}>
          <a>
            <article
              className={"bg-cover border-radius-16 d-flex large-main-card"}
              style={{ backgroundImage: `url(${image})` }}
              css={styles}
            >
              <div className={"mt-auto px-4 pb-3 z-index-2"}>
                <span className={"font-size-12 category"}>{category}</span>
                <h3 className={"font-size-16 m-0 title"}>{title}</h3>
              </div>
            </article>
          </a>
      </Link>
  );
}

export default LargeMainCard;
