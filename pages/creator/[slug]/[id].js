import CreatorDetail from '@components/creator/CreatorDetail'
import React from 'react'
import {getToken} from "next-auth/jwt";

function CreatorLandingPage({ data }) {
  const { id, slug, token } = data
  return <CreatorDetail token={token} isLading={slug === 'my-page'} creator_id={id} />
}

export default CreatorLandingPage

export async function getServerSideProps({req, query}) {
  const session = await getToken({ req });

  const { id, slug } = query
  return {
    props: { data: { id, slug, token: !session ? null : session?.user?.token } },
  }
}
