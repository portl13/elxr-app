import CheatorDetail from '@components/creator/CheatorDetail'
import React from 'react'

function CreatorLandingPage({ data }) {
  const { id } = data
  return <CheatorDetail creator_id={id} />
}

export default CreatorLandingPage

export async function getServerSideProps({ query }) {
  const { id } = query
  return {
    props: { data: { id } },
  }
}
