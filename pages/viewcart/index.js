import Head from 'next/head'
import Layout from '../../components/layout/Layout'
//import ShopCard from "./ShopCard";
import { ChannelContext } from '../../context/ChannelContext'
import Router, { useRouter } from 'next/router'
import { useAlert } from 'react-alert'
import { TIMEOUT } from '../../utils/constant'
import { useContext, useEffect, useRef, useState } from 'react'

import { UserContext } from '../../context/UserContext'
import { wcfmStyle } from '@components/my-account/Wcfm.style'

function CartWrapper() {
  const channel = useContext(ChannelContext)
  const [priceData, setPriceData] = useState()
  const [quantityData, setQuantityData] = useState({})
  const [updateCart, setUpdateCart] = useState(false)
  const [cartData, setCartData] = useState({})
  // console.log(channel.data)

  useEffect(() => {
    localStorage.setItem('channelPriceData', JSON.stringify(channel.data))
  }, [priceData])

  useEffect(() => {
    const price = JSON.parse(localStorage.getItem('channelPriceData'))
    setPriceData(price)
  }, [])

  // useEffect(()=>{

  //     localStorage.setItem('cartDetail',JSON.stringify(cartData))
  // },[cartData])

  const alert = useAlert()

  const increaseQuantity = (num, data) => {
    // if(!updateCart){
    //   alert.error("click on update cart.", TIMEOUT);
    // }
    const quantity = Number(quantityData[num]) || 0
    setQuantityData(
      updateCart
        ? { ...quantityData, [name]: quantity + 1 }
        : { ...quantityData }
    )

    let index = priceData.findIndex((el) => el.id === data.id)
    if (index >= 0) {
      priceData[index].quantity = num + 1
      setPriceData([...priceData])
    } else {
      priceData.splice(index, 1)
      setPriceData([...priceData, { ...data, quantity: num + 1 }])
    }
  }

  const decreaseQuantity = (num, data) => {
    // if(!updateCart){
    //   alert.error("click on update cart.", TIMEOUT);
    // }
    const quantity = Number(quantityData[name]) || 1
    setQuantityData(
      updateCart
        ? { ...quantityData, [name]: quantity - 1 }
        : { ...quantityData }
    )

    let index = priceData.findIndex((el) => el.id === data.id)
    if (index >= 0) {
      priceData[index].quantity = num === 1 ? 1 : num - 1
      setPriceData([...priceData])
    } else {
      priceData.splice(index, 1)
      setPriceData([
        ...priceData,
        { ...data, quantity: num === 1 ? 1 : num - 1 },
      ])
    }
  }

  const handleDelete = (id) => {
    console.log(id)
    let t = priceData.filter((el) => el.id !== id)
    console.log(t)
    setPriceData(t)
  }

  useEffect(() => {
    localStorage.setItem('channelPriceData', JSON.stringify(priceData))
  }, [priceData])

  let sum =
    priceData &&
    priceData.map((el) => el.quantity * el.price).reduce((a, b) => a + b, 0)
  sum = (Math.round(sum * 100) / 100).toFixed(2)
  let checkType = (curr) => typeof curr === 'number' || curr > 0
  let check = Object.values(quantityData).every(checkType)

  //   useEffect(()=>{

  //   let d=localStorage.getItem('cartDetail',JSON.stringify(cartData))
  //   setCartData(d)
  // },[cartData])

  // console.log('quantity',check,Object.values(quantityData).length,priceData?.length)

  return (
    <Layout>
      <Head>
        <title>WeShare</title>
      </Head>
      {/* <div className="item-body-content">
        <div className="products-panel">
          <ul>
            <ShopCard />
          </ul>
       </div>
      </div> */}
      <div css={wcfmStyle} className="view-cart-container">
        <div className="wcfm-datatable">
          <div className="row-head grey-color">
            <div className="view-cart-div-1"></div>
            <div className="view-cart-div-2"></div>
            <div className="view-cart-div-3">PRODUCT</div>
            <div className="view-cart-div-4">PRICE</div>
            <div className="view-cart-div-5">QUANTITY</div>
            <div className="view-cart-div-6">SUBTOTAL</div>
          </div>
          {priceData &&
            priceData.map((data, index, arr) => (
              <div className="column-head pink-color">
                <div className="view-cart-div-1">
                  <span
                    className="cross-icon"
                    onClick={() => {
                      handleDelete(data.id)
                    }}
                  >
                    +
                  </span>
                </div>
                <div className="view-cart-div-2">
                  <img src={data?.images?.[0]?.src} alt="view-cart-images" />
                </div>
                <div
                  className="view-cart-div-3"
                  onClick={() => alert.success('Coming Soon..', TIMEOUT)}
                >
                  {data?.name}
                </div>
                <div className="view-cart-div-4">${data?.price}</div>
                <div className="view-cart-div-5">
                  <div className="quantity-tag">
                    <span
                      className="left-arrow"
                      onClick={() => decreaseQuantity(data?.quantity, data)}
                    ></span>
                    <input
                      type="text"
                      defaultValue={1}
                      value={data?.quantity}
                      name={data.name}
                      onChange={(e) => {
                        const exp = /^[0-9]*$/
                        if (e.target.value === '' || exp.test(e.target.value)) {
                          setQuantityData({
                            ...quantityData,
                            [e.target.name]: Number(e.target.value),
                          })
                          setCartData({
                            ...cartData,
                            [e.target.name]: [
                              Number(e.target.value),
                              data.price,
                              data.id,
                              data?.images?.[0]?.src,
                              Number(e.target.value) * data.price,
                            ],
                          })

                          let index = priceData.findIndex(
                            (el) => el.id === data.id
                          )
                          if (index >= 0) {
                            priceData[index].quantity = Number(e.target.value)
                            setPriceData([...priceData])
                          } else {
                            priceData.splice(index, 1)

                            setPriceData([
                              ...priceData,
                              { ...data, quantity: Number(e.target.value) },
                            ])
                          }
                        } else {
                          setQuantityData({
                            ...quantityData,
                            [e.target.name]: e.target.value.replace(/\D/g, ''),
                          })
                        }
                      }}
                    />
                    <span
                      className="right-arrow"
                      onClick={() => {
                        increaseQuantity(data?.quantity, data)
                      }}
                    ></span>
                  </div>
                </div>
                <div className="view-cart-div-6">
                  ${(data?.quantity || 0) * data?.price}
                </div>
              </div>
            ))}

          <div className="apply-coupon-container">
            <div className="apply-coupon-tag">
              <input placeholder="Coupon code" type="text" />
              <button
                className="apply-button"
                onClick={() => alert.success('Coming Soon..', TIMEOUT)}
              >
                Apply button
              </button>
            </div>
            <button
              className="update-cart"
              onClick={() => setUpdateCart(!updateCart)}
            >
              Update cart
            </button>
          </div>
          <div className="subtotal-container">
            <div className="inner-panel">
              <div className="left-tag">SUBTOTAL</div>
              <div className="right-tag">${sum}</div>
            </div>
            {/* <div className="inner-panel">
              <div className="left-tag">SHIPPING</div>
              <div className="right-tag">Enter your address to view shipping options.</div>
            </div> */}
            <div className="inner-panel">
              <div className="left-tag">TOTAL</div>
              <div className="right-tag">${sum}</div>
            </div>
          </div>
          <div className="proceed-button">
            <button
              onClick={() => {
                // Object.values(quantityData).length===priceData.length && check?
                Router.push('./checkout')
                // : alert.error("Please fill all cart quantity", TIMEOUT);
              }}
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default CartWrapper
