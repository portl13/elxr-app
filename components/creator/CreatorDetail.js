import React, { useContext } from "react";
import { UserContext } from "@context/UserContext";
import CreatorProfile from "./CreatorProfile";
import Meta from "@components/layout/Meta";
import Head from "next/head";
import CreatorUser from "./CreatorUser";
import SeoMetaComponent from "@components/seo/SeoMetaComponent";
import { stringToSlug } from "@lib/stringToSlug";
import MainLayout from "@components/main/MainLayout";
import CreatorFeaturedVideo from "@components/creator/tabs/home/CreatorFeaturedVideo";

const url = process.env.nextSite;

function CreatorDetail({ creator_id, token = null, creator }) {
  const { user } = useContext(UserContext);
  return (
      <MainLayout
          classNameContainer={"home"}
          branding={{ ...creator?.branding, logo: creator?.logo }}
      >
          <SeoMetaComponent
              url={`${url}/professionals/${stringToSlug(
                  creator?.vendor_shop_name || "user"
              )}/${creator_id}`}
              title={creator?.vendor_shop_name}
              titleContent={creator?.vendor_shop_name}
              description={creator?.vendor_description}
              image={creator?.vendor_banner}
          />
          <CreatorFeaturedVideo
              creator={creator}
              about={creator?.vendor_description}
              user={user}
          />
          <CreatorUser creator_id={creator_id} creator={creator} />
      </MainLayout>
  );
}

export default CreatorDetail;
