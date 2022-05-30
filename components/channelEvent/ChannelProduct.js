import React from 'react';
import { ChannelProductStyle } from './ChannelProduct.style';
import Link from 'next/link'
import { stringToSlug } from '../../lib/stringToSlug';
import { useCartMutation } from '../../context/CartContext';

export default function ChannelProduct(props) {
  const { product } = props
  const { addProduct } = useCartMutation()


  return ( 
    <ChannelProductStyle>
      <Link href={`/channel/product/${stringToSlug(product.name)}/${product.id}`}>
        <a className="channel-product-content">
          <div className="ratio-1x1 ratio">
            {product?.images_small && <img src={product?.images_small[0]?.src} />}
          </div>
          <div className="channel-product-body">
            <h2 className="channel-product-title">
              {product.name}
            </h2>
            <span className="channel-product-price" dangerouslySetInnerHTML={{ __html: product.price_html }} />
          </div>
        </a>
      </Link>
      <span  
      onClick={()=> addProduct({
        id: product.id,
        name: product.name,
        price: Number(product.price),
        image: product?.images_small[0]?.src,
        quantity: 1,
      })}
      className="channel-product-add-to-card">
        ADD TO CART
      </span>
    </ChannelProductStyle>
  );
}
