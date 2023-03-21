import React, { useRef } from "react";
import { css } from "@emotion/core";
import {OPTIONS_SPLIDE_GENERAL_CATEGORY} from "@utils/constant";
import { useCategories } from "@context/EventsContext";
import { chuckSize } from "@utils/chuckSize";

import cats from "../../category.json";
import {Splide, SplideSlide, SplideTrack} from "@splidejs/react-splide";

const categoriesStyle = css`
  background-color: #FFFFFF;
  padding: 15px;
  @media (min-width: 992px) {
    padding: 45px;
  }
`;

function MainCategories() {
  const refSlide = useRef();
  const { cat, setCat } = useCategories();
  const categories = chuckSize(
    [
      { slug: "", label: "All", creator: null, community: false, value: 0 },
      ...cats.data,
    ],
    2
  );

    return (
    <>
      <section css={categoriesStyle}>
        <Splide
          ref={refSlide}
          options={OPTIONS_SPLIDE_GENERAL_CATEGORY}
          hasTrack={false}
        >
          <SplideTrack>
            {categories?.map((data, index) => (
              <SplideSlide key={index}>
                {data.map((item) => (
                  <div key={item.value} className="p-1">
                    <button
                      onClick={() => setCat(item)}
                      className={`text-capitalize d-flex justify-content-center category-btn nowrap ${
                        cat.slug === item.slug ? "active" : ""
                      } pointer w-100`}
                    >
                      {item.label}
                    </button>
                  </div>
                ))}
              </SplideSlide>
            ))}
          </SplideTrack>
        </Splide>
      </section>
    </>
    // <section
    //   css={categoriesStyle}
    //   className={
    //     "d-lg-flex w-100 align-items-center justify-content-center py-3 d-none menu-categories"
    //   }
    // >
    //   {ROUTERS_CONTENT_CENTER.map((value) => (
    //     <div key={value.id} className="mr-3 p-1">
    //       <Link href={value.link}>
    //         <a
    //           className={`text-capitalize d-flex flex-column align-items-center  category-btn nowrap mr-0 ${
    //             router.asPath === value.link ? "active" : ""
    //           }`}
    //           >
    //           {value.img}
    //           {value.title}
    //         </a>
    //       </Link>
    //     </div>
    //   ))}
    // </section>
  );
}

export default MainCategories;
