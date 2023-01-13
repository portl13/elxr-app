import React from "react";
import { css } from "@emotion/core";
import CourseIcon from "@icons/CourseIcon";
import Link from "next/link";
import { useRouter } from "next/router";
import {ROUTERS_CONTENT} from "@utils/constant";

const categoriesStyle = css`
  background-color: var(--bg-main-categories);
  .category-btn {
    font-size: 14px;
    font-weight: 700;
    color: var(--typo);
    background-color: var(--bg);
    border: 1px solid #6a6767;
    margin-right: 14px;
    padding: 5px 18px;
    border-radius: 20px;
  }

  .category-btn.active,
  .category-btn:hover {
    color: var(--color-white);
    border: 1px solid var(--color-white);
  }

  .category-btn:focus {
    outline: none;
  }
`;


function MainCategories() {
  const router = useRouter();
  return (
    <section
      css={categoriesStyle}
      className={
        "d-lg-flex w-100 align-items-center justify-content-center py-3 d-none"
      }
    >
      {ROUTERS_CONTENT.map((value) => (
        <div key={value.id} className="p-1">
          <Link href={value.link}>
            <a
              className={`text-capitalize category-btn nowrap ${
                router.asPath === value.link ? "active" : ""
              }`}
            >
              {value.title}
            </a>
          </Link>
        </div>
      ))}
    </section>
  );
}

export default MainCategories;
