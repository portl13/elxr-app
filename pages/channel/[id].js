import React from 'react'
import ChannelDetail from '@components/main/details/channel/ChannelDetail'


function PageChannelDetail({ id }) {
  return <ChannelDetail id={id} />
}

export default PageChannelDetail

export async function getServerSideProps({ query }) {
  const { id } = query
  return {
    props: { id },
  }
}
