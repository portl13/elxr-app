import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LIVE_SUB_NAV } from '@utils/constant'
import Events from '@components/my-portal/golive/events'
import AddEvent from './addEvent'
import EditEvent from './EditEvent'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import BottomSheet from '../BottomSheetChannelMannager'



function GoLive(props) {
  const { innerNav, handleRedirect } = props
  const [open, setOpen] = useState(false)

  useEffect(() => {
    return () => setOpen(false)
  }, [])
  

  const renderComponent = (type) => {
    switch (type) {
      case 'stream':
        return <AddEvent />
      case 'events':
        return <Events {...props} />
      case 'add_event':
        return <AddEvent />  
      case 'edit-event':
        return <EditEvent />
      default:
        return <div>Coming Soon...</div>
    }
  }
  return (
    <>
      <div className="wcfm-collapse-content">
        <div className="wcfm-top-element-container">
          <h2 className="text-uppercase text-primary channel-title">
            Go Live Settings
          </h2>
          <span onClick={() => setOpen(!open)} className="sub-menu-button d-block d-lg-none">
            <FontAwesomeIcon icon={faBars} />
          </span>
        </div>
        <hr className="line-title w-100 mt-4 mb-1" />

        <div className="wcfm-tabWrap">
          <div className="right-container w-100">
            {renderComponent(innerNav)}
          </div>
        </div>
      </div>
      <BottomSheet
        handleRedirect={handleRedirect}
        innerNav={innerNav}
        open={open}
        setOpen={setOpen}
        title={'Go Live Settings'}
        routers={LIVE_SUB_NAV}
      />
    </>
  )
}

export default GoLive
