import MainLayout from "@components/main/MainLayout";
import React, { useContext, useEffect } from "react";
import VideoRelated from "./VideoRelated";
import SkeletonEventDetail from "@components/SkeletonLoading/events/SkeletonEventDetail";
import VideoInfo from "@components/video/VideoInfo";
import { UserContext } from "@context/UserContext";
import { countView } from "@request/shared";
import SeoMetaComponent from "@components/seo/SeoMetaComponent";
import { stringToSlug } from "@lib/stringToSlug";
import { onlyLettersAndNumbers } from "@utils/onlyLettersAndNumbers";
const urlImage = process.env.SubdomainCloudflare;

function VideoDetail({ id, video }) {
  const { user } = useContext(UserContext);
  const isLoading = !video;

  useEffect(() => {
    if (id) {
      countView(id).then();
    }
  }, [id]);

  return (
    <>
      <SeoMetaComponent
        title={`ELXR | ${video?.title}`}
        description={video?.description}
        titleContent={video?.title}
        image={
          video &&
          onlyLettersAndNumbers(video?.video) &&
          !Boolean(video?.thumbnail)
            ? `https://${urlImage}/${video?.video}/thumbnails/thumbnail.jpg?time=${video?.size}s`
            : video?.thumbnail
        }
        url={
          process.env.nextSite + `/video/${stringToSlug(video?.title)}/${id}`
        }
      />
      <MainLayout title={`Elxr | ${video?.title}`} branding={video?.branding}>
        <article className="container-media">
          <div className="main-item">
            {isLoading ? <SkeletonEventDetail /> : null}
            {!isLoading ? (
              <VideoInfo id={id} user={user} videoData={video} />
            ) : null}
          </div>
          <div className="relative-items mt-4 mt-md-0">
            <h4 className="text-center text-uppercase font-size-18">
              More videos like this
            </h4>
            {video && <VideoRelated category={video?.category_id} />}
          </div>
        </article>
      </MainLayout>
    </>
  );
}

export default VideoDetail;
