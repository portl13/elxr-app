import React from 'react'
import Slider from 'react-slick'
import { v4 as uuidv5 } from 'uuid'
import css from '@emotion/css'
import Link from 'next/link'

const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 6,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
}

const items = [
  {
    'image': '/img/home/channels.jpg',
    'link': '/channels'
  },
  {
    'image': '/img/home/masterclass.jpg',
    'link': '/courses'
  },
  {
    'image': '/img/home/new-online-events.jpg',
    'link': '/online-events'
  },
  {
    'image': '/img/home/communities.jpg',
    'link': '/communities-details'
  },
  {
    'image': '/img/home/live-experiences.jpg',
    'link': '/in-person-events'
  },
  {
    'image': '/img/home/weshare-values.jpg',
    'link': '/weshare-values'
  },
]

const HomeCarousel = () => {
  return (
    <div className="mb-5">
      <Slider {...settings}>
        {items.map((item) => (
          <div key={uuidv5()}>
            <Link href={item.link}>
              <a>
                <img
                  css={css`
                    padding: 0 5px;
                  `}
                  src={item.image}
                />
              </a>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default HomeCarousel
