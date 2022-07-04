import React from 'react'

function ChannelTabAbout({description}) {
  return (
    <div dangerouslySetInnerHTML={{__html: description}} />
  )
}

export default ChannelTabAbout