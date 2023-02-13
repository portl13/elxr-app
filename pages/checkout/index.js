import Head from "next/head";
import Layout from "@components/layout/Layout";
import { useAlert } from "react-alert";
import { TIMEOUT } from "@utils/constant";
import { useContext, useEffect, useState } from "react";
import { Country, State } from "country-state-city";
import { ChannelContext } from "@context/ChannelContext";
import StripeContainer from "@components/checkout/StripeContainer";
//import ShopCard from "./ShopCard";
//import Router from 'next/router';

function CheckoutWrapper() {
  const alert = useAlert();
  const channel=useContext(ChannelContext)
  //  const [cartData,setCartData]=useState({quantity:'',priceData:''})
  const [addressData,setAddressData]=useState()
  const [showCard,setShowCard]=useState(false)
  const [emailValid, setEmailValid] = useState(false);
  const[items,setItems]=useState([])
  const[item,setItem]=useState([])
  const [priceData,setPriceData]=useState()

  useEffect(()=>{
    const price =JSON?.parse(localStorage.getItem('channelPriceData'))

        setPriceData(price)
  },[])


  // console.log('channel-data', priceData) 
  let sum=priceData && priceData.map(el=>el.quantity*el.price).reduce((a,b) => a + b, 0)
  sum=(Math.round(sum * 100) / 100).toFixed(2)
  useEffect(()=>{
  

  const quant=JSON.parse(localStorage.getItem('cartDetail'))
  // console.log(quantity)
  // setCartData({quantity:quant.quantityData, priceData:quant.priceData})

  // setItems([
  //     {id:quant.priceData.id,
  //       image:quant?.priceData?.images?.[0]?.src,
  //       price:parseInt(quant.priceData.price),
  //       quantity:quant.quantityData
  //     }
  // ])
  
  setItems(quant)
  },[])


  const countryList = Country.getAllCountries().map((e) => {
    return {name:e.name, code:e.isoCode};
  });

  const stateList=State.getStatesOfCountry(addressData?.country).map(e=> {
    return {name:e.name,code:e.isoCode}
  })
    const handleChange=e=>{
      setAddressData({...addressData,[e.target.name]:e.target.value})
    }

    function phoneNumber(e) {
      const exp = /^[0-9]*$/;
      if (e.target.value === "" || exp.test(e.target.value)) {
        setAddressData({...addressData,[e.target.name]:e.target.value})
      }
      else{
        setAddressData({...addressData,[e.target.name]:e.target.value.replace(/\D/g,'')})
      }
    }
    function PostalCode(e) {
      const exp = /^[0-9]*$/;
      if (e.target.value === "" || exp.test(e.target.value)) {
        setAddressData({...addressData,[e.target.name]:e.target.value})
      }
      else{
        setAddressData({...addressData,[e.target.name]:e.target.value.replace(/\D/g,'')})
      }
    }

    const checkError = () => {
      let checkValue = true;
      if (checkValue && !addressData?.first_name) {
        alert.error("Please add first name before submit.", TIMEOUT);
        checkValue = false;
      }
      if (checkValue && !addressData?.last_name) {
        alert.error("Please add last name before submit.", TIMEOUT);
        checkValue = false;
      }
      if (checkValue && !addressData?.country) {
        alert.error("Please select country before submit.", TIMEOUT);
        checkValue = false;
      }
      if (checkValue && !addressData?.address_1) {
        alert.error("Please add street address before submit.", TIMEOUT);
        checkValue = false;
      }
  
      if (checkValue && !addressData?.city) {
        alert.error("Please add city before submit.", TIMEOUT);
        checkValue = false;
      }
      if (checkValue && !addressData?.postcode) {
        alert.error("Please add postcode before submit.", TIMEOUT);
        checkValue = false;
      }
      if (checkValue  && !addressData?.state && stateList.length!==0) {
        alert.error("Please add state before submit.", TIMEOUT);
        checkValue = false;
      }
      if (checkValue && !addressData?.email && !emailValid) {
        alert.error("Please add email address before submit.", TIMEOUT);
        checkValue = false;
      }
      // if (emailValid) {
      //   alert.error("Please add correct email address before submit.", TIMEOUT);
      //   checkValue = false;
      // }

      if (checkValue && !addressData?.phone) {
        alert.error("Please add phone number before submit.", TIMEOUT);
        checkValue = false;
      }
  
      return checkValue;
    };

    function validateEmail() {
      var regex =
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (regex.test(addressData?.email)) {
        setEmailValid(true);
        // setTimeout(() => setEmailValid(false), [2000])
        return true;
      } else {
        setEmailValid(false);
        return false;
      }
    }

    const handleDelete=id=>{
      console.log(id)
      let t=priceData.filter(el=>el.id!==id)
      console.log(t)
      setPriceData(t)
    }
    
    useEffect(()=>{
      localStorage.setItem('channelPriceData',JSON.stringify(priceData))
      

    
    setItem(priceData?priceData.map(el=>{ return{
      id:el?.id,
      image:el?.images?.[0]?.src,
      price:el?.price,
      quantity:el?.quantity
    }}) :[])
  

 
    }, [priceData])
    
    useEffect(()=>{
     
   
      localStorage.setItem('addresslocal',JSON.stringify(addressData))
      localStorage.setItem('billingItem',JSON.stringify(item))
    },[addressData,item])

    console.log(item)   
       
  return (
    <Layout>
      <Head>
        <title>elxr</title>
      </Head>
      
      <div className="checkout-wrapper">
        <div className="coupon-tag">Have a coupon? <a onClick={() => alert.success("Coming Soon..", TIMEOUT)}>Click here to enter your code</a></div>
        <div className="checkout-coupon">
          <p>If you have a coupon code, please apply it below.</p>
          <div className="coupon-panel">
            <input placeholder="Coupon code" type="text" />
            <button className="apply-button" onClick={() => alert.success("Coming Soon..", TIMEOUT)}>Apply coupon</button>
          </div>
        </div>
        <div className="checkout-details-panel">
          <div className="billing-panel">
            <h3>Billing details</h3>
            <div className="col-12-panel">
              <div className="col-6-left">
                <label>First name <span>*</span></label>
                <input type="text" value={addressData?.first_name}  onChange={(e)=>handleChange(e)} name='first_name' maxLength={100} />
              </div>
              <div className="col-6-right">
                <label>Last name <span>*</span></label>
                <input type="text" value={addressData?.last_name}  onChange={(e)=>handleChange(e)} name='last_name' maxLength={100} />
              </div>
            </div>
            <div className="col-div-12">
              <label>Company name (optional)</label>
              <input type="text" value={addressData?.company} onChange={(e)=>handleChange(e)} name='company' maxLength={50} />
            </div>
            <div className="col-div-12">
              <label>Country / Region <span>*</span></label>
              <select defaultValue={''}
               value={addressData?.country}
            onChange={e=>handleChange(e)} name='country'
            >
              <option value={""} disabled="disabled">Select Country</option>
                {countryList.map((e) => (
              <option value={e.code}>{e.name}</option>
            ))}
              </select>
            </div>
            <div className="col-div-12">
              <label>Street address <span>*</span></label>
              <input type="text" value={addressData?.address_1} onChange={(e)=>handleChange(e)} name='address_1' maxLength={250}/>
              <input type="text" value={addressData?.address_2} onChange={(e)=>handleChange(e)} name='address_2' maxLength={250} />
            </div>
            <div className="col-div-12">
              <label>Town / City <span>*</span></label>
              <input type="text" value={addressData?.city} onChange={(e)=>handleChange(e)} name='city' />
            </div>
            {stateList.length===0?<div></div>: <div className="col-div-12">
              <label>State <span>*</span></label>
              <select defaultValue={''} value={addressData?.state} onChange={e=>handleChange(e)}  name='state' >
              <option value={""} disabled="disabled">Select State</option>
            {addressData?.country &&
              stateList.map((e) => (
                <option value={e.code}>{e.name}</option>
              ))}
              </select>
            </div>}
            <div className="col-div-12">
              <label>ZIP Code <span>*</span></label>
              <input type="text" value={addressData?.postcode} onChange={(e)=>PostalCode(e)} name='postcode' maxLength={7} />
            </div>
            <div className="col-div-12">
              <label>Phone <span>*</span></label>
              <input type="text" value={addressData?.phone} onChange={(e)=>phoneNumber(e)} name='phone' maxLength={12} />
            </div>
            <div className="col-div-12">
              <label>Email address <span>*</span></label>
              <input type="text" value={addressData?.email} onChange={(e)=>{handleChange(e);setEmailValid(true);}}
                onBlur={() => addressData?.email !== "" && validateEmail()}
                maxLength="50"
              name='email' />

            <div className="email-icon-tag">
            {emailValid === true && 
            <div className="tooltip-panel">Valid Email<em></em></div>}
          </div>
          <div className="email-cross-tag">
            {emailValid === false && 
            <div className="tooltip-panel">Invalid Email<em></em></div>}
          </div>
            </div>
            <div className="col-div-12">
              <label>Order notes (optional)</label>
              <textarea rows="5"  value={addressData?.orderNote} onChange={(e)=>handleChange(e)} name='orderNote'></textarea>
            </div>
          </div>
          <div className="billing-panel">
            <h3>YOUR ORDER</h3>
            <div className="datatable-ui">
              <div className="row-head">
                <div className="column-tag-1">PRODUCT</div>
                <div className="column-tag-2">TOTAL</div>
              </div>
              {priceData && priceData.map(data=>(<div className="col-head">
                <div className="column-tag-1">
                  <div className="cross-icon" onClick={() => {handleDelete(data.id)}}>+</div>
                  <img src=
                  {data?.images?.[0]?.src}
                   alt="image" />
                  <div className="check-name">
                    {data.name} 
                    <span>QTY:
                      {/* {items &&Object.keys(items).includes(data?.name)&& items[data.name]?.[0]} */}
                     <em>
                      {data?.quantity}
                      </em></span></div>
                </div>
                <div className="column-tag-2">
                  {data.price}
                {/* {items && Object.keys(items).includes(data?.name)&& items[data.name]?.[4]} */}
                  </div>
              </div>))}
            </div>
            <div className="subtotal-ui">
              <div className="main-panel">
                <div className="left-panel">SUBTOTAL</div>
                <div className="right-panel">${sum}
                {/* {cartData?.quantity* cartData?.priceData?.price} */}
                </div>
              </div>
              {/*<div className="main-panel">
                              <div className="left-panel">SHIPPING</div>
                              <div className="right-panel">There are no shipping options available. Please ensure that your address has been entered correctly, or contact us if you need any help.</div>
                            </div>*/}
              <div className="main-panel">
                <div className="left-panel pink-color">Total</div>
                <div className="right-panel pink-color">${sum}
                {/* {cartData?.quantity* cartData?.priceData.price} */}
                </div>
              </div>
            </div>
            {showCard && <StripeContainer />}
            <div className="button-tag">
              <button onClick={() =>{
                checkError() && validateEmail &&
                setShowCard(true)}}>{!showCard?'Place Order':'Pay'}</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default CheckoutWrapper;
