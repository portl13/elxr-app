import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const card_options={
    iconStyle:'solid',
    style:{
        base:{
            color:'#fff',
            fontSmoothing:'antialiased',
            fontSize:'20px'
        },
        invalid:{
            iconColor:'#ffc7ee',
            color:'#ffc7ee'
        }
    }
}

const PaymentForm = () => {
    const [success,setSuccess]=useState(false)
    const stripe=useStripe()
    const elements=useElements()
    const [data,setData]=useState()

    useEffect(()=>{
        const addressLocalData=JSON.parse(localStorage.getItem('addresslocal'))
        const billingData=JSON.parse(localStorage.getItem('billingItem'))
        
        setData({
            type:'',
            address:addressLocalData,
            items:billingData
        })
        console.log(addressLocalData)

    },[])
    console.log(data)
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const {error,paymentMethod}=await stripe.createPaymentMethod({
            type:'card',
            card:elements.getElement(CardElement)
        })    
        if(!error){
            try{
                const {id}=paymentMethod
                const response=await axios.post('https://dev.local/wp-json/portl/payment/v1/payment-intent',{
                    amount:1000,
                    id
                })
            if(response.data.success){
                console.log('success')
                setSuccess(true)
            }
            }catch(error){
                    console.log('Error',error)
            }
        }else{
            console.log(error.message)
        }
    }
  return (
    <>{!success?<form onSubmit={handleSubmit}>
        <fieldset className='FormGroup'>
            <div className='FormRow'>
                <CardElement  options={card_options}  /> 
            </div>
        </fieldset>
        {/* <button>Pay</button> */}
        </form >:
        <h2>payment done</h2>
        }
</>

  )
}

export default PaymentForm