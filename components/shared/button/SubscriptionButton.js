import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAlert } from 'react-alert'
import { getChannelSubscription } from '@api/channel.api'
import { useCartMutation } from '@context/CartContext'
import { TIMEOUT } from '@utils/constant'
import { Modal, ModalBody, Spinner } from 'reactstrap'
import SpinnerLoader from '../loader/SpinnerLoader'
import ReactPlayer from 'react-player'
import CloseIcon from '@icons/CloseIcon'

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
  const [open, setOpen] = useState(false)
  const [subscription, setSubscription] = useState(null)

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
        setSubscription(subscription)
        //subscribe(subscription, true)
      })
      .catch((e) => {
        subscribe(null, false)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    if (open) {
      getSubscription()
    }
  }, [open])

  return (
    <>
      <button onClick={() => setOpen(!open)} className={className}>
        <span>{text}</span>
        {/* {loading && (
          <span className="d-flex ml-2">
            <Spinner size={'sm'} />
          </span>
        )} */}
      </button>
      <Modal isOpen={open} toggle={() => setOpen(!open)} centered={true}>
        <ModalBody>
          {!subscription && <SpinnerLoader />}
          {subscription && (
            <>
              <div className="d-flex justify-content-end">
                <span onClick={() => setOpen(!open)}>
                  <CloseIcon className="dashboard-icon pointer" />
                </span>
              </div>
              <div
                style={{
                  backgroundImage: `url(${
                    !subscription?.video_preview ? subscription?.image : ''
                  })`,
                }}
                className="ratio ratio-16x9 cover-bg"
              >
                {subscription?.video_preview && (
                  <ReactPlayer
                    width={'100%'}
                    height={'100%'}
                    url={subscription?.video_preview}
                    controls={true}
                  />
                )}
              </div>
              <article className="main-subscription">
                <div className="subscription-avatar">
                  {subscription && (
                    <img src={subscription.image} alt="avatar" />
                  )}
                </div>
                <div className="subscription-content">
                  <h3 className="subscription-title">{subscription.title}</h3>
                  <p>Category: Music</p>
                </div>
                <div className="subscription-description">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: subscription.description,
                    }}
                  />
                </div>
              </article>
              <button
                onClick={() => subscribe(subscription, true)}
                className="btn btn-create rounded-lg mt-3 w-100 text-center"
              >
                subscribe
              </button>
            </>
          )}
        </ModalBody>
      </Modal>
    </>
  )
}

export default SubscriptionButton
