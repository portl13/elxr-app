import BlogDetail from "@components/main/details/BlogDetail";
import MainLayout from "@components/main/MainLayout";
import React from "react";
import { getDataSever } from "@request/shared";
import SeoMetaComponent from "@components/seo/SeoMetaComponent";
import { stringToSlug } from "@lib/stringToSlug";

const url = `${process.env.apiV2}/blogs`;

function PageBlogDetail({ id, blog }) {
  return (
    <>
      <SeoMetaComponent
        title={`${blog?.title}`}
        description={blog?.description}
        titleContent={blog?.title}
        image={blog?.thumbnail}
        url={
          process.env.nextSite + `/writing/${stringToSlug(blog?.title)}/${id}`
        }
      />
      <MainLayout branding={blog?.branding}>
        <BlogDetail blog={blog} id={id} />
      </MainLayout>
    </>
  );
}

export default PageBlogDetail;

export async function getServerSideProps({ query, req }) {
  const { id } = query;
  let blog;
  try {
    blog = await getDataSever(`${url}/${id}`, req);
  } catch (e) {
    console.log(e);
  }
  return {
    props: { id, blog },
  };
}
