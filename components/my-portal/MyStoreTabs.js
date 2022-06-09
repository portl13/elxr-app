import React,{ useState } from 'react'
import SubSetting from '@components/my-portal/SubSetting'
import Products from '@components/my-portal/Products'
import Subscriber from '@components/my-portal/Subscriber'
import Orders from '@components/my-portal/Orders'
import Customers from '@components/my-portal/Customers'
import { STORE_SUB_NAV } from '@utils/constant'
import BottomSheet from '@components/menu/BottomSheet'
import Router from 'next/router'

const simple = {
  'edit-subscription': true,
  'customer': true,
  'courses': true
}

const store = {
  'product': true,
  'subscriber': true,
  'order': true
}

const routeWithId = {
  'product': 'any',
  'subscriber': 'all',
  'order': 'all'
}

function MyStoreTabs(props) {
  const { innerNav } = props
  const [open, setOpen] = useState(false)

  const handleRedirect = (route) => {
    if (simple[route]) {
      Router.push(`?tab=store&nav=${route}`)
      return
    }

    if(store[route]){
      Router.push(`/my-portal?tab=store&nav=${route}&id=${routeWithId[route]}`)
      return
    }
    
  }

  const storeProps = {
    ...props,
    open,
    setOpen,
    hideProduct: props.hide
  }

  return (
    <>
      {innerNav === 'edit-subscription' && <SubSetting {...storeProps} />}
      {innerNav === 'product' && <Products {...storeProps} />}
      {innerNav === 'subscriber' && <Subscriber {...storeProps} />}
      {innerNav === 'order' && <Orders {...storeProps} />}
      {innerNav === 'customer' && <Customers {...storeProps} />}
      <BottomSheet
        handleRedirect={handleRedirect}
        innerNav={innerNav}
        open={open}
        setOpen={setOpen}
        title={'Go Live Settings'}
        routers={STORE_SUB_NAV}
      />
    </>
  )
}

export default MyStoreTabs
