import React from "react";
import Head from "next/head";
import sanitizeHtml from "sanitize-html";

const clean = (dirty) => {
  return sanitizeHtml(dirty);
};

function SeoMetaComponent({
  title,
  titleContent,
  description,
  image,
  url,
  siteName = "Elxr",
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:type" content="website" />
      <meta property="og:title" content={titleContent} />
      <meta property="og:description" content={clean(description)} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="828" />
      <meta property="og:image:height" content="450" />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />
    </Head>
  );
}

export default SeoMetaComponent;
