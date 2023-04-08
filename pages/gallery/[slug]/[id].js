import MainLayout from "@components/main/MainLayout";
import PageGallery from "@components/main/pages/PageGallery";
import React from "react";
import { getDataSever } from "@request/shared";
import SeoMetaComponent from "@components/seo/SeoMetaComponent";
import { stringToSlug } from "@lib/stringToSlug";
const galleryUrl = `${process.env.apiV2}/gallery`;

function Gallery({ id, gallery }) {
  return (
    <>
      <SeoMetaComponent
        title={`PORTL | ${gallery?.title}`}
        description={gallery?.description}
        titleContent={gallery?.title}
        image={gallery?.thumbnail}
        url={
          process.env.nextSite +
          `/gallery/${stringToSlug(gallery?.title)}/${id}`
        }
      />
      <MainLayout title="Gallery">
        <PageGallery gallery={gallery} id={id} />
      </MainLayout>
    </>
  );
}

export default Gallery;

export async function getServerSideProps({ query, req }) {
  const { id } = query;
  let gallery;
  try {
    gallery = await getDataSever(`${galleryUrl}/${id}`, req);
  } catch (e) {
    console.log(e);
  }
  return {
    props: { id, gallery },
  };
}
