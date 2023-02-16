import React from "react";
import Link from "next/link";
import { css } from "@emotion/core";

const styles = css`
  &.menu-mobile-item {
  
    svg {
      width: 20px;
      color: rgba(0, 0, 0) !important;
    }
  }
  .creators{
    svg{
      width: 15px;
    }
  }
  .menu-mobile-item {
    &-link {
      display: grid;
      grid-template-columns: 30px 1fr;
      gap: 10px;
      color: var(--bg-font);
      padding: 0.6rem 0;
    }
    &-title {
      font-weight: 700;
      font-size: 16px;
      line-height: 18px;
      margin-top: 2px;
    }
    &-icon {
      justify-items: center;
    }
    &-icon {
      &.podcasts svg {
        height: 16px;
      }
      &.music svg {
        height: 15px;
      }      
      &.blogs svg {
        height: 15px;
      }
    }
  }
`;

function MenuMobileItem({ item, closeMenu }) {
  return (
    <li css={styles} className={"menu-mobile-item"}>
      <Link href={item.link}>
        <a className={"menu-mobile-item-link"} onClick={closeMenu}>
          <div className={`menu-mobile-item-icon center-flex ${item.id}`}>
            {item.icon}
          </div>
          <div className={"menu-mobile-item-title"}>{item.title}</div>
        </a>
      </Link>
    </li>
  );
}

export default MenuMobileItem;
