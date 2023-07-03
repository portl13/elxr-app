import React from 'react'
import { useRouter } from 'next/router'
import MainLayout from '@components/main/MainLayout'
import useSWR from 'swr'
import { getFetchPublic } from '@request/creator'
import { useCartMutation } from '@context/CartContext'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'

const url = process.env.baseUrl + '/wp-json/wcfmmp/v1/products'

export default function ProductChannelPage() {
  const router = useRouter()
  const { addProduct } = useCartMutation()
  const { query } = router
  const prodID = query?.id

  const { data: product, isLoading } = useSWR(
    prodID ? `${url}/${prodID}` : null,
    getFetchPublic
  )

  const bookNow = (product) => {
    addProduct({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      quantity: 1,
    })

    router.push('/page-checkout')
  }

  return (
    <MainLayout title={'Product'}>
      {isLoading ? <SpinnerLoader /> : null}
      {product ? (
        <section className={'product-detail container'}>
          <article>
            <img
              src={
                product?.images.map((d) => d.src)[0] === undefined
                  ? `${process.env.baseUrl}/wp-content/uploads/woocommerce-placeholder-150x150.png`
                  : product.images.map((d) => d.src)[0]
              }
              alt={product?.name}
            />
          </article>
          <article className={'product-detail-body'}>
            <h1 className={'product-detail-title'}>{product?.name}</h1>
            <h2
              className="my-5"
              dangerouslySetInnerHTML={{ __html: product?.price_html }}
            />
            <div
              className={'product-detail-desc'}
              dangerouslySetInnerHTML={{ __html: product?.description }}
            />
            <button
              onClick={() => bookNow(product)}
              className="btn btn-primary w-100 mt-3 border-radius-35"
            >
              Buy
            </button>
          </article>
        </section>
      ) : null}
    </MainLayout>
  )
}
