import React, { useContext } from "react";
import { UserContext } from "@context/UserContext";
import CreatorProfile from "./CreatorProfile";
import Meta from "@components/layout/Meta";
import Head from "next/head";
import CreatorUser from "./CreatorUser";
import SeoMetaComponent from "@components/seo/SeoMetaComponent";
import { stringToSlug } from "@lib/stringToSlug";

const url = process.env.nextSite;

function CreatorDetail({ creator_id, token = null, creator }) {
  const { user } = useContext(UserContext);
  return (
    <>
      <Meta branding={creator?.branding} />
      <SeoMetaComponent
        url={`${url}/creator/${stringToSlug(
          creator?.vendor_shop_name
        )}/${creator_id}`}
        title={creator?.vendor_shop_name}
        titleContent={creator?.vendor_shop_name}
        description={creator?.vendor_description}
        image={creator?.vendor_banner}
      />
      <Head>
        <title>CREATOR DETAILS</title>
      </Head>
      <CreatorProfile creator={creator} />
      <CreatorUser creator_id={creator_id} user={user} creator={creator} />
    </>
  );
}

export default CreatorDetail;
