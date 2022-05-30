import React from "react";
function Policies({ channelPolicy }) {
  return (
    <>
      <div className="item-body-content">
        <div className="about-content">
          <div className="wcfm_policies_heading">SHIPPING POLICY</div>
          <p
            dangerouslySetInnerHTML={{ __html: channelPolicy?.shipping_policy }}
          ></p>
        </div>
        <div className="about-content">
          <div className="wcfm_policies_heading">REFUND POLICY</div>
          <p
            dangerouslySetInnerHTML={{ __html: channelPolicy?.refund_policy }}
          ></p>
        </div>
        <div className="about-content">
          <div className="wcfm_policies_heading">
            CANCELLATION / RETURN / EXCHANGE POLICY
          </div>
          <p
            dangerouslySetInnerHTML={{
              __html: channelPolicy?.cancellation_policy,
            }}
          ></p>
        </div>
      </div>
    </>
  );
}
export default Policies;
