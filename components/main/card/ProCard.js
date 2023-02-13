import React from 'react'
import { css } from '@emotion/core'
import Link from 'next/link'
import { stringToSlug } from '@lib/stringToSlug'
import { preload } from 'swr'
import { genericFetch } from '@request/creator'

const ProChunkCard = ({ creator }) => {
  return (
    <Link
      href={`/creator/${stringToSlug(creator?.display_name)}/${creator?.id}`}
    >
      <a>
        <div
          style={{
            backgroundImage: `url(${creator?.vendor_shop_logo})`,
          }}
          className="ratio avatar-pro bg-gray card-head cover-bg"
        ></div>
      </a>
    </Link>
  )
}

// const styles = css`
//   .category {
//     color: var(--typo);
//     font-weight: 600;
//   }
//   .title {
//     font-weight: 700;
//     font-size: 14px;
//   }
//   .large-body{
//     top: unset;
//     bottom: 0;
//   }
//   &.large-main-card::before {
//     content: "";
//     background: rgb(10 12 13 / 15%);
//     position: absolute;
//     top: 0;
//     bottom: 0;
//     width: 100%;
//     z-index: 0;
//   }
// `;

function ProCard({ creators }) {
  const [
    creator1 = null,
    creator2 = null,
    creator3 = null,
    creator4 = null,
    creator5 = null,
  ] = creators

  return (
    <div className="d-flex justify-content-center card-pro position-relative">
      <div className="position-absolute avatar-pro-border pro-1">
        {creator1 ? <ProChunkCard creator={creator1} /> : null}
      </div>
      <div className="position-absolute avatar-pro-border pro-2">
        {creator2 ? <ProChunkCard creator={creator2} /> : null}
      </div>
      <div className="pro-3 avatar-pro-big-border">
        {creator3 ? <Link
          href={`/creator/${stringToSlug(creator3?.display_name)}/${
            creator3?.id
          }`}
        >
          <a>
            <div
              style={{
                backgroundImage: `url(${creator3?.vendor_shop_logo})`,
              }}
              className="ratio avatar-pro-big bg-gray card-head cover-bg"
            ></div>
          </a>
        </Link> : null}
      </div>
      <div className="position-absolute avatar-pro-border pro-4">
        {creator4 ? <ProChunkCard creator={creator4} /> : null}
      </div>
      <div className="position-absolute avatar-pro-border pro-5">
        {creator5 ? <ProChunkCard creator={creator5} /> : null}
      </div>
    </div>
  )
}

export default ProCard
