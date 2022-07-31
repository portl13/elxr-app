import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useAlert } from 'react-alert'
import { getChannelSubscription } from '@api/channel.api'
import { useCartMutation } from '@context/CartContext'
import { TIMEOUT } from '@utils/constant'
import { Spinner } from 'reactstrap'

function SubscriptionButton({
  user,
  text = 'Subscribe',
  vendor_id,
  className = 'btn btn-create rounded-lg d-flex',
}) {
  const router = useRouter()
  const alert = useAlert()
  const { addProduct } = useCartMutation()
  const [loading, setLoading] = useState(false)

  const subscribe = (subscription, isSubscription) => {
    if (!user) {
      alert.show('You must be logged in to join this channel', TIMEOUT)
      return
    }

    if (!isSubscription) {
      alert.show('This channel does not have a subscription', TIMEOUT)
      return
    }

    addProduct({
      id: subscription.id,
      name: subscription.title,
      price: Number(subscription.price),
      quantity: 1,
    })

    router.push('/page-checkout')
  }

  const getSubscription = () => {
    if (!user) return
    setLoading(true)
    getChannelSubscription(vendor_id, user)
      .then(({ data }) => {
        let subscription = data.data
        subscribe(subscription, true)
      })
      .catch((e) => {
        subscribe(null, false)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <button onClick={getSubscription} className={className}>
        <span>{text}</span>
        {loading && (
          <span className="d-flex ml-2">
            <Spinner size={'sm'} />
          </span>
        )}
      </button>
    </>
  )
}

export default SubscriptionButton
