import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SOCIAL_SUB_NAV } from "../../../utils/constant";
import Personal from "./Personal";
import Setting from "./Setting";
function SocialWrapper(props) {
  const { innerNav, handleRedirect,getProfile } = props;
  const renderComponent = (type) => {
    switch (type) {
      case "personal":
        return <Personal {...props} />;
      case "setting":
        return <Setting {...props} />;
      default:
        return <div>Coming Soon...</div>;
    }
  };
  return (
    <>
      <div className="wcfm-collapse-content">
        <div className="wcfm-top-element-container">
          <h2 className="text-uppercase text-primary channel-title">Profile Manager </h2>
        </div>
        <hr className="line-title w-100 mt-4 mb-1" />
        <div className="wcfm-tabWrap">
          <div className="left-section">
            {SOCIAL_SUB_NAV.map((e) => (
              <div
                className={`tab-section ${innerNav === e.value && "active"}`}
                onClick={() => handleRedirect("social", e.value)}
              >
                <FontAwesomeIcon icon={e.icon} />
                {e.name}
              </div>
            ))}
          </div>
          <div className="right-container">{renderComponent(innerNav)}</div>
        </div>
      </div>
    </>
  );
}
export default SocialWrapper;
