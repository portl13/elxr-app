import React from 'react'
import { WrapperProdutcDetail } from './ChannelProdutcDetail.style'
import ChannelProductsLoop from './ChannelProductsLoop'

export default function ChannelProdutcDetail(props) {
  const { product } = props

  return (
    <>
      <WrapperProdutcDetail>
        <div className="product-gallery">
          {product?.images.length > 0 && <img src={product?.images[0]?.src} />}
        </div>
        <div className="product-detail">
          <h1 className="product-detail-title">{product.name}</h1>
          <span
            className="product-detail-price"
            dangerouslySetInnerHTML={{ __html: product.price_html }}
          />
          <span dangerouslySetInnerHTML={{ __html: product.description }} />
          <div className="product_meta">
            <h4 className="pr-sub-heading">Specs</h4>
            <span className="posted_in pr-atts-row">
              <span className="pr-atts-title">Category:</span>
              <span>Music</span>
            </span>
          </div>
        </div>
      </WrapperProdutcDetail>
    </>
  )
}
