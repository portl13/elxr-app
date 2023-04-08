import CreatorDetail from "@components/creator/CreatorDetail";
import React from "react";
import { getToken } from "next-auth/jwt";
import { genericFetch } from "@request/dashboard";
import { getCreator } from "@request/creator";
const url = `${process.env.baseUrl}/wp-json/portl/v1/channel?user_id=`;

function CreatorLandingPage({ data }) {
  const { id, slug, token, creator } = data;
  return (
    <CreatorDetail
      token={token}
      isLading={slug === "my-page"}
      creator_id={id}
      creator={creator}
    />
  );
}

export default CreatorLandingPage;

export async function getServerSideProps({ req, query }) {
  const session = await getToken({ req });

  const { id, slug } = query;

  const token = !session ? null : session?.user?.token;
  let creator = "";
  try {
    creator = token
      ? await genericFetch(url + id, token)
      : await getCreator(url + id);
  } catch (e) {
    console.log(e);
  }

  return {
    props: { data: { id, slug, token, creator } },
  };
}
