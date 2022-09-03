import CreatorDetail from '@components/creator/CreatorDetail'
import React from 'react'

function CreatorLandingPage({ data }) {
  const { id, slug } = data
  return <CreatorDetail isLading={slug === 'my-page'} creator_id={id} />
}

export default CreatorLandingPage

export async function getServerSideProps({ query }) {
  const { id, slug } = query
  return {
    props: { data: { id, slug } },
  }
}
