import React from 'react';
import CreateCommunityLayout from '@components/dashboard/community/CreateCommunityLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

function Meet() {
  return (
    <CreateCommunityLayout>
      <div className="container mt-5">
        <div className="row">
            <div className="col-12 col-md-4 pl-0">
                <ul className="pl-0" >
                    <li className="list-unstyled position-relative decoration">
                        <i className="mr-2"> <FontAwesomeIcon className="icon-setting text-primary" icon={faCircle} /> </i>
                        <span className="font-weight-bold">Basic Details</span>
                    </li>
                    <li className="list-unstyled position-relative decoration mt-5">
                        <i className="mr-2"> <FontAwesomeIcon className="icon-setting text-primary" icon={faCircle} /> </i>
                        <span className="font-weight-bold">Privacy Settings</span>
                    </li>
                    <li className="list-unstyled position-relative decoration mt-5">
                        <i className="mr-2"> <FontAwesomeIcon className="icon-setting text-primary" icon={faCircle} /> </i>
                        <span  className="font-weight-bold">Invite</span>
                    </li>
                    <li className="list-unstyled  mt-5">
                        <i className="mr-2"> <FontAwesomeIcon className="icon-setting text-primary" icon={faCircle} /> </i>
                        <span className="font-weight-bold">Meet</span>
                    </li>
                </ul>
            </div>
        </div>
      </div>
    </CreateCommunityLayout>
  );
}

export default Meet;