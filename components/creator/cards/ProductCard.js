import { stringToSlug } from '@lib/stringToSlug'
import Link from 'next/link'
import React from 'react'

function ProductCard({ product }) {
  return (
    <article className="card-general">
      <Link href={`/products/${stringToSlug(product.name)}/${product?.id}`}>
        <div
          style={{
            backgroundImage: `url(${product?.images_small[0]?.src})`,
          }}
          className="ratio ratio-16x9 bg-gray cover-bg border-radius-17 pointer"
        ></div>
      </Link>
      <div className="pt-3">
        <div className="d-flex justify-content-between">
          {product.categories.length > 0 &&
            product.categories.map((cat) => (
              <span key={cat.id} className="badge badge-primary mb-1 mr-1">
                {cat.name}
              </span>
            ))}
        </div>
        <div className="mt-2">
          <h5 className="m-0 font-size-12 font-weight-bold mb-2">
            {product.name}
          </h5>
          <div
            className="m-0 font-size-12 line-clamp-2 content-product-card"
            dangerouslySetInnerHTML={{
              __html:
                product.short_description !== ''
                  ? product.short_description
                  : product.description,
            }}
          />
        </div>
      </div>
    </article>
  )
}

export default ProductCard
