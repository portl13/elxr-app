import React from 'react'
import Link from 'next/link'
import { stringToSlug } from '@lib/stringToSlug'
import Scrollbars from 'react-custom-scrollbars-2'
import { css } from '@emotion/core'

function SongCard({item, tipo}) {
  return (
    <div className="card-general-new">
    <Link href={`/${tipo}/${stringToSlug(item.title)}/${item.id}`}>
      <a>
        <div>
          <div
          className="ratio ratio-1x1 border-radius-17 bg-gray card-head cover-bg"
          style={{ backgroundImage: `url(${item.thumbnail})` }}
        ></div>
        </div>
        
      </a>
    </Link>
    <div className="py-3">
      <h4 className="font-size-16  m-0">
        <Link href={`/${tipo}/${stringToSlug(item.title)}/${item.id}`}>
          <a className='color-font'>{item.title}</a>
        </Link>
      </h4>
      <h5 className="text-primary font-size-16 m-0">{item?.channel_name}</h5>
      <div className=" d-flex  color-font-grey mb-2">
      <span className="font-size-13 mr-1">Category:</span>
      <span className="font-size-13">{item.category}</span>
    </div>

      <div className="d-flex alig-items-center text-grey  ">
      <div css={css`height:25px; overflow-x:auto;width:100%;`}>
        <Scrollbars universal>
          {item.tags.map((tag) => (
            <span key={tag.value} className="baged-gris mr-2 mb-1">
              {tag.label}
            </span>
          ))}
        </Scrollbars>
      </div>
      </div>
    </div>
  </div>
  )
}

export default SongCard