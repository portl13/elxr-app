import React from "react";
import { css } from "@emotion/core";
import Link from "next/link";
import { useRouter } from "next/router";
import {ROUTERS_CONTENT, ROUTERS_CONTENT_CENTER} from "@utils/constant";

const categoriesStyle = css`
  .category-btn {
    font-family: var(--font-oswald);
    font-size: 16px;
    font-weight: normal;
    color: var(--bg);
    margin-right: 14px;
    /* padding: 5px 18px; */
   
  }

  .category-btn.active,
  .category-btn:hover {
    color: var(--bg-font-grey);
    /* border: 1px solid var(--color-white); */
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
        "d-lg-flex w-100 align-items-center justify-content-center py-3 d-none menu-categories"
      }
    >
      {ROUTERS_CONTENT_CENTER.map((value) => (
        <div key={value.id} className="mr-3 p-1">
          <Link href={value.link}>
            <a
              className={`text-capitalize d-flex flex-column align-items-center  category-btn nowrap mr-0 ${
                router.asPath === value.link ? "active" : ""
              }`}
              >             
              {value.img}
              {value.title}
            </a>
          </Link>
        </div>
      ))}
    </section>
  );
}

export default MainCategories;
