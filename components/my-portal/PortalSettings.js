import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CHANEL_SUB_NAV } from '@utils/constant'
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons'
import Store from '@components/my-portal/Store'
import { Button } from 'reactstrap'
import PaymentSetting from '@components/my-portal/payment'
import StorePolicies from '@components/my-portal/storePolicies'
import CustomerSupport from '@components/my-portal/customerSupport'
import BottomSheet from '@components/menu/BottomSheet'
function PortalSettings(props) {
  const { innerNav, handleRedirect } = props
  const [open, setOpen] = useState(false)
  useEffect(() => {
    return () => setOpen(false)
  }, [])
  const renderComponent = (type) => {
    switch (type) {
      case 'store':
        return <Store {...props} />
      case 'payment':
        return <PaymentSetting {...props} />
      case 'store-policies':
        return <StorePolicies {...props} />
      case 'customer-support':
        return <CustomerSupport {...props} />
      default:
        return <div>Coming Soon...</div>
    }
  }
  return (
    <>
      <div className="wcfm-collapse-content">
        <div className="wcfm-top-element-container">
          <h2 className="text-uppercase text-primary channel-title">
            Channel Settings
          </h2>
          <span onClick={() => setOpen(!open)} className="sub-menu-button d-block d-lg-none">
            <FontAwesomeIcon icon={faBars} />
          </span>
          <div className="new-tag-panel d-none d-lg-block">
            <Button
              color="light"
              outline
              type="button"
              onClick={() => handleRedirect('social', 'setting')}
            >
              <FontAwesomeIcon icon={faUser} />
              Social
            </Button>
          </div>
        </div>
        <hr className="line-title w-100 mt-4 mb-1" />
        <div className="wcfm-tabWrap">
          <div className="right-container w-100">{renderComponent(innerNav)}</div>
        </div>
        <BottomSheet
          handleRedirect={handleRedirect}
          innerNav={innerNav}
          open={open}
          setOpen={setOpen}
          title={'Channel Settings'}
          routers={CHANEL_SUB_NAV}
          type="home"
        />
      </div>
    </>
  )
}
export default PortalSettings
