import React from "react";
import { css } from "@emotion/core"; 
// import ScrollTags from "@components/shared/slider/ScrollTags";

const categoriesStyle = css`
  background-color: var(--bg-main-categories);

  .category-btn {
    font-size: 14px;
    font-weight: 700;
    color: var(--typo);
    background-color: var(--bg);
    border: 1px solid #6A6767;
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

function MainCategories({ categories, category, setCategory }) {

    const initialCategories = [
        { label: 'Creators' },
        { label: 'Channels' },
        { label: 'Events' },
        { label: 'Videos' },
        { label: 'Podcasts' },
        { label: 'Music' },
        { label: 'Writings' },
        { label: 'Courses' },
        { label: 'Communities' },
    ]

  return (
    <section css={categoriesStyle} className={"row w-100 mx-0 align-items-center justify-content-center py-3"}>
        {initialCategories?.map((value) => (
            <div key={value.label} className="p-1">
                <button
                    onClick={() => setCategory(value.label)}
                    className={`text-capitalize category-btn nowrap ${
                        category === value.label ? "active" : ""
                    }`}
                >
                    {value.label}
                </button>
            </div>
        ))}

        {/* <ScrollTags>
        <div className="p-1">
            <button
            onClick={all}
            className={`custom-pills nowrap ${
                category === "" ? "active" : ""
            }`}
            >
            All
            </button>
        </div>
        {categories?.map((value) => (
            <div key={value.slug} className="p-1">
            <button
                onClick={() => setCategory(value.slug)}
                className={`text-capitalize custom-pills nowrap ${
                category === value.slug ? "active" : ""
                }`}
            >
                {value.label}
            </button>
            </div>
        ))}
        </ScrollTags> */}
    </section>
  );
}

export default MainCategories;
