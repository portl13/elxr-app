import React, { useEffect, useState } from 'react'

import { Spinner } from 'reactstrap'

import AddressCard from '@components/my-settings/AddressCard'

import { getAddress } from '@api/my-account/address.api'
import { getShippingAddress } from '@api/my-account/address.api'

function Address({ user, handleRedirect }) {
  const [result, setResult] = useState()
  const [shippingAdress, setShippingAddress] = useState()

  function getAddressDetail() {
    getAddress(user)
      .then((res) => setResult(res.data.data))
      .catch((error) => console.log(error))
  }
  function getShippingAddressData() {
    getShippingAddress(user).then((res) => {
      setShippingAddress(res.data.data)
    })
  }
  useEffect(() => getAddressDetail(), [])
  useEffect(() => getShippingAddressData() , [])
  return (
    <section className="wcfm-collapse bsdatasection w-100">
      {!result && (
        <Spinner
          style={{ width: '1.2rem', height: '1.2rem' }}
          color="primary"
        />
      )}
      {result && shippingAdress && (
        <AddressCard
          result={result}
          shippingAdress={shippingAdress}
          handleRedirect={handleRedirect}
        />
      )}
    </section>
  )
}
export default Address
