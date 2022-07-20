import React from 'react'

function AboutTab({ vendor_description }) {
  return (
    <div className="row mt-5">
      {vendor_description && (
        <div dangerouslySetInnerHTML={{ __html: vendor_description }} />
      )}
    </div>
  )
}

export default AboutTab
