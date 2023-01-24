import React from 'react'
import { getFormat } from "@utils/dateFromat";
import SentInviteModalDelete from "./SentInviteModalDelete";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';




const EmailItem = ({email, mutate}) => {
    const [open, setOpen] = useState(false);



  return (
    <>
    <div
            
            className="table-responsive-row px-3 d-flex flex-column flex-md-row justify-content-md-between align-items-md-center py-4 border-bottom"
          >
            <div className="client_name d-flex justify-content-between align-items-center">
              <div>
                <p className="m-0">{email.name}</p>
              </div>
            </div>
            <div className="d-flex justify-content-between justify-content-md-center items">
              <span className="d-md-none">Email</span>
              <p className="text-success m-0">{email.email}</p>
            </div>
            <div className="d-flex justify-content-between billing_address">
              <span className="d-md-none">Invited</span>
              <p className="text-right text-md-center max-width-140 m-0">
                {getFormat(email.date, "MM-dd-yyyy")}
              </p>
            </div>
            <div className="d-flex justify-content-between pr-md-3 justify-content-md-center revoke_invite">
              <span className="d-md-none">Status</span>
              <div className="d-flex justify-content-between">
                <span
                  className="pointer mr-2 color-font p-0 ml-2"
                    onClick={() => setOpen(!open)
                  }
                >
                  <FontAwesomeIcon
                    className="icon-setting"
                    icon={faTimesCircle}
                  />
                </span>
                <p className="m-0">{email.status}</p>
              </div>
            </div>
          </div>
    
          <SentInviteModalDelete
          open={open}
          setOpen={setOpen}
          email={email}
          mutate={mutate}
        />
    </>
          
  )
}

export default EmailItem