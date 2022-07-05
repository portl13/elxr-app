import React from 'react'
import DashBoard from '@components/dashboard/DashBoard'
import Inbox from '@components/dashboard/inbox/Inbox'

function InboxPage({data}) {
  const { id } = data
  return (
    <DashBoard title="Inbox">
      <Inbox id={id} />
    </DashBoard>
  )
}

export default InboxPage

export async function getServerSideProps({ query }) {
  const { id } = query
  return {
    props: { data: { id } },
  }
}
