import React, { useContext, useState, useEffect } from 'react'
import { ChannelHeaderStyle } from './ChannelHeader.style'
import ChannelSharedButton from './ChannelSharedButton'
import ChannelFollowerButton from './ChannelFollowerButton'
import Link from 'next/link'
import ChannelSocialLink from './ChannelSocialLink'
import { css } from '@emotion/core'
import { UserContext } from '../../context/UserContext'
import { getChannelSubscription } from '../../pages/api/channel.api'
import { useAlert } from 'react-alert'
import { TIMEOUT } from '../../utils/constant'
import { useCartMutation } from '../../context/CartContext'
import { useRouter } from 'next/router'

export default function ChannelHeader(props) {
  const {user} = useContext(UserContext)

  const { addProduct } = useCartMutation()
  const alert = useAlert()
  const router = useRouter()
  const { channel, followers } = props
  
  const [subscription, setSubscription] = useState(false)
  const [isSubscription, setIsSubscription] = useState(false)

  useEffect(() => {
    if(!user) return;

    getChannelSubscription(channel.vendor_id, user)
      .then(({data}) => {
        let subscription = data.data
        setIsSubscription(true)
        setSubscription(subscription)
      })
      .catch(e => {
        setIsSubscription(false)
      })

  }, [user])
  
  const subscribe = () => {
    if(!user) {
      alert.show("You must be logged in to join this channel", TIMEOUT);
      return;
    }

    if (!isSubscription) {
      alert.show("This channel does not have a subscription", TIMEOUT);
      return;
    }

    addProduct({
      id: subscription.id,
      name: subscription.title,
      price: Number(subscription.price),
      quantity: 1,
    })

    router.push('/page-checkout')

  }


  return (
    <ChannelHeaderStyle
      style={{
        backgroundImage: `url('${channel.vendor_banner}')`,
        position: 'relative'
      }}
    >
        <div css={css`
          display: none;
          @media (min-width: 992px) {
            display: block;
            position: absolute;
            right: -20px;
            bottom: 60px;
          }
        `}>
          <ChannelSocialLink channel={channel} />
        </div>
      <div className="channel-header">
        <div className="channel-header-title-avatar">
          <div className="channel-header-avatar-container">
            <div className="channel-header-avatar">
              <img src={channel?.vendor_shop_logo} />
            </div>
          </div>
          <h1 className="channel-header-title">{channel?.vendor_shop_name}</h1>
        </div>
        <div className="channel-header-actions d-flex justify-content-center align-items-center">
          <button 
          onClick={()=> subscribe()}
          className="btn btn-primary btn-sm mx-2 my-0 text-white">
              Subscribe
          </button>   
          {user && <ChannelFollowerButton followers={followers} />}
          <ChannelSharedButton />
        </div>
        <div className="d-md-none">
          <ChannelSocialLink channel={channel} />
        </div>
      </div>
    </ChannelHeaderStyle>
  )
}
