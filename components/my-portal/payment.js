import React, { useState, useEffect } from 'react'
import { PAY_METHOD } from '@utils/constant'
import { getPayment } from '@api/channel-store.api'

function PaymentSetting({ innerNav, user }) {
  const [payType, setPayType] = useState(null)
  useEffect(() => {
    if (user.id) {
      getPayment(user).then((res) => {
        console.log('====', res)
      })
    }
  }, [user])
  return (
    <>
      <div className="store-panel">
        <label>Preferred Payment Method</label>
        <select
          defaultValue={payType}
          onChange={(e) => setPayType(e.target.value)}
        >
          {PAY_METHOD.map((e) => (
            <option key={e.value} value={e.value}>
              {e.name}
            </option>
          ))}
        </select>
      </div>
      {payType === 'paypal' && (
        <div className="store-panel">
          <label>PayPal Email</label>
          <input type="email" />
        </div>
      )}
      {payType === 'bank_transfer' && (
        <>
          <h2>Bank Details</h2>
          <div className="store-panel">
            <label>Account Name</label>
            <input type="email" placeholder="Your bank account name" />
          </div>
          <div className="store-panel">
            <label>Account Number</label>
            <input type="email" placeholder="Your bank account number" />
          </div>
          <div className="store-panel">
            <label>Bank Name</label>
            <input type="email" placeholder="Name of bank" />
          </div>
          <div className="store-panel">
            <label>Bank Address</label>
            <input type="email" placeholder="Address of your bank" />
          </div>
          <div className="store-panel">
            <label>Routing Number</label>
            <input type="email" placeholder="Routing Number" />
          </div>
          <div className="store-panel">
            <label>IBAN</label>
            <input type="email" placeholder="IBAN" />
          </div>
          <div className="store-panel">
            <label>Swift Code</label>
            <input type="email" placeholder="Swift Code" />
          </div>
          <div className="store-panel">
            <label>IFSC Code</label>
            <input type="email" placeholder="IFSC Code" />
          </div>
        </>
      )}
      {payType === 'stripe' && (
        <>
          <div className="coming-soon-text">Coming Soon...</div>
        </>
      )}
    </>
  )
}

export default PaymentSetting
