import React from "react";
function AboutCard({channelAbout}) {
  return (
    <>
      <div className="item-body-content">
        <div className="about-content">
          <p dangerouslySetInnerHTML={{__html:channelAbout?.vendor_description}}></p>
        </div>
      </div>
    </>
  )
}

export default AboutCard;