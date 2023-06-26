import React, { useRef } from 'react'
import { css } from '@emotion/core'
import { OPTIONS_SPLIDE_HOME_CATEGORY } from '@utils/constant'
import { chuckSize } from '@utils/chuckSize'
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide'
import { useCategories } from '@context/EventsContext'
import cats from '../../category.json'

const categoriesStyle = css`
  padding: 15px 15px 0;
  @media (min-width: 992px) {
    padding: 45px 45px 0;
  }
  & .splide__arrow:disabled {
    opacity: 0;
    display: none;
  }
`

function MainCategories() {
  const refSlide = useRef()
  const { cat, setCat } = useCategories()
  const categories = [
    { slug: '', label: 'All', creator: null, community: false, value: 0 },
    ...cats.data,
  ]

  return (
    <section css={categoriesStyle}>
      <Splide
        ref={refSlide}
        options={OPTIONS_SPLIDE_HOME_CATEGORY}
        hasTrack={false}
      >
        <SplideTrack>
          {categories?.map((item, index) => (
            <SplideSlide key={index}>
              {/* {data.map((item) => ( */}
              <div key={item.value} className="p-1">
                <button
                  onClick={() => setCat(item)}
                  className={`text-capitalize d-flex justify-content-center category-btn nowrap ${
                    cat.slug === item.slug ? 'active' : ''
                  } pointer w-100`}
                >
                  {item.label}
                </button>
              </div>
              {/*  ))} */}
            </SplideSlide>
          ))}
        </SplideTrack>
      </Splide>
    </section>
  )
}

export default MainCategories
