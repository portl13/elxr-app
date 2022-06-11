import React from "react";
import { Button, Progress, Alert } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAmbulance, faChalkboard, faGlobe, faMoneyBill, faShoppingBag, faThumbsUp, faUser } from "@fortawesome/free-solid-svg-icons";

export default function Settings() {
  return (
    <>
      <div className="wcfm-collapse-content">
        <div className="wcfm-top-element-container">
        
          <h2>Store Settings</h2>
          <a><FontAwesomeIcon icon={faUser} />Social</a>
        </div>
        <div className="progress-panel">
          {/* <div className="progress-bar"></div> */}
          
        <div className="coming-soon-text">
            Coming Soon...
        </div>
          <p>
            Suggestion(s): Add Store Phone, Setup Store Policies, Setup Store
            SEO
          </p>
        </div>
        <div className="wcfm-tabWrap">
          <div className="left-section">
            <div className="tab-section">
              <FontAwesomeIcon icon={faShoppingBag} />
              Store
            </div>
            <div className="tab-section">
              <FontAwesomeIcon icon={faMoneyBill} />
              Payment
            </div>
            <div className="tab-section">
              <FontAwesomeIcon icon={faGlobe} />
              SEO
            </div>
            <div className="tab-section">
              <FontAwesomeIcon icon={faAmbulance} />
              Store Policies
            </div>
            <div className="tab-section">
              <FontAwesomeIcon icon={faThumbsUp} />
              Customer Support
            </div>
          </div>
          <div className="right-container">
            <h2>General Setting</h2>
            <div className="store-panel">
              <label>Store Email</label>
              <input type="" />
            </div>
            <div className="store-panel">
              <label>Store Phone</label>
              <input type="" />
            </div>
            <h2>Store Brand Setup</h2>
            <div className="store-panel">
              <label>
                Store Logo<span className="img_tip">i</span>
              </label>
              <div className="logo-tag">
                <img
                  src="https://data.portl.live/wp-content/uploads/2021/03/11d9f9212e06a09bd68b408338f6a0684382a86d-600x600-1.jpeg"
                  alt="image"
                />
                <span className="cross-icon">x</span>
              </div>
            </div>
            <div className="store-panel">
              <label>Store Banner Type</label>
              <input type="" />
            </div>
            <div className="store-panel">
              <label>
                Store Banner<span className="img_tip">i</span>
              </label>
              <div className="logo-tag">
                <img
                  src="https://data.portl.live/wp-content/uploads/2021/03/11d9f9212e06a09bd68b408338f6a0684382a86d-600x600-1.jpeg"
                  alt="image"
                />
                <span className="cross-icon">x</span>
              </div>
            </div>
            <div className="store-panel">
              <label>
                Mobile Banner<span className="img_tip">i</span>
              </label>
              <div className="logo-tag">
                <img
                  src="https://data.portl.live/wp-content/uploads/2021/03/11d9f9212e06a09bd68b408338f6a0684382a86d-600x600-1.jpeg"
                  alt="image"
                />
                <span className="cross-icon">x</span>
              </div>
            </div>
            <div className="store-panel">
              <label>Store List Banner Type</label>
              <input type="" />
            </div>
            <div className="store-panel">
              <label>
                Store List Banner<span className="img_tip">i</span>
              </label>
              <div className="logo-tag">
                <img
                  src="https://data.portl.live/wp-content/uploads/2021/03/11d9f9212e06a09bd68b408338f6a0684382a86d-600x600-1.jpeg"
                  alt="image"
                />
                <span className="cross-icon">x</span>
              </div>
            </div>
            <div className="store-panel">
              <label>
                Shop Description<span className="img_tip">i</span>
              </label>
              <div></div>
            </div>
            <h2>Store Visibility Setup</h2>
            <div className="store-panel">
              <label>
                Store Name Position<span className="img_tip">i</span>
              </label>
              <input type="" />
            </div>
            <div className="store-panel">
              <label>
                Products per page<span className="img_tip">i</span>
              </label>
              <input type="" />
            </div>
            <div className="store-panel">
              <label>Hide About from Store</label>
              <input type="" />
            </div>
            <div className="store-panel">
              <label>Hide Policy from Store</label>
              <input type="" />
            </div>
          </div>
        </div>
        <div className="button-tab">
          <button type="">SAVE</button>
        </div>
      </div>
    </>
  );
}
