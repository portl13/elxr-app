import CreatorDetail from '@components/creator/CreatorDetail'
import React from 'react'

function CreatorLandingPage({ data }) {
  const { id } = data
  return <CreatorDetail isLading={true} creator_id={id} />
}

export default CreatorLandingPage

export async function getServerSideProps({ query }) {
  const { id } = query
  return {
    props: { data: { id } },
  }
}
