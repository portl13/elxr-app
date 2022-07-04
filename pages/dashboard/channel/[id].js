import React from 'react';
import ChannelDetails from '@components/dashboard/channels/ChannelDetails';


function ChannelDetailsPage({ data }) {
  const { id } = data
  return <ChannelDetails id={id} />
}

export default ChannelDetailsPage

export async function getServerSideProps({ query }) {
  const { id } = query
  return {
    props: { data: { id } },
  }
}
