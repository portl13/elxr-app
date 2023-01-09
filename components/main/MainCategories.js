import React from "react";
import { css } from "@emotion/core"; 
// import ScrollTags from "@components/shared/slider/ScrollTags";

const categoriesStyle = css`
  background-color: var(--bg-main-categories);
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
                    className={`text-capitalize custom-pills nowrap ${
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
