import React from "react";

import Card from "@/elxr/components/bits/Card";
import ButtonLink from "@/elxr/components/bits/buttons/ButtonLink";
import Header from "@/elxr/components/bits/text/Header";
import PlayCircleIcon from "@/public/img/icons/play-circle.svg";

import SpinnerLoader from "@/components/shared/loader/SpinnerLoader";

import { useVideos } from "@/elxr/hooks/api/videos";
import { useBlogs } from "@/elxr/hooks/api/blogs";
import { stringToSlug } from "@lib/stringToSlug";
import { capitalize } from "@/elxr/helpers/strings";

import {
  cardCSS,
  extraUploadsCSS,
  NoResults,
  CardContents,
  FeaturedControls,
  PlayButtonFeatured,
  DurationFeatured,
  PlayButton,
  Featured,
  Upload,
  UploadImage,
  Duration,
} from "./styles";
import Link from "next/link";
import {onlyLettersAndNumbers} from "@utils/onlyLettersAndNumbers";

const RecentUploadsWidget = () => {
  // TODO: Unify the videos and blogs into a single API call
  const { data: { videos } = [], isValidating: loadingVideos } = useVideos({
    page: 1,
    per_page: 7,
    order: "desc",
    category: "",
  });
  const { data: { blogs } = [], isValidating: loadingBlogs } = useBlogs({
    page: 1,
    per_page: 7,
    order: "desc",
    category: "",
  });

  const getThumbnailVideo = (video) => {
    if (onlyLettersAndNumbers(video.video) && !video.thumbnail){
      return`https://${process.env.SubdomainCloudflare}/${video.video}/thumbnails/thumbnail.jpg?time=${video.size}s`
    }
    if (video?.thumbnail){
      return video.thumbnail
    }
  }

  const loading = loadingVideos || loadingBlogs;
  const videosArray = (videos ?? []).map((video) => ({
    ...video,
    type: "videos",
    url: `/video/${stringToSlug(video.title)}/${video.id}`,
    thumbnail: getThumbnailVideo(video)
  }));
  const blogsArray = (blogs ?? []).map((blog) => ({
    ...blog,
    type: "blogs",
    url: `/writing/${stringToSlug(blog.title)}/${blog.id}`,
  }));
  const uploads = [...videosArray, ...blogsArray]
    ?.sort((a, b) => b.id - a.id)
    .slice(0, 7);

  return (
    <Card css={cardCSS}>
      <Header sub="BY YOUR PROS">RECENT UPLOADS</Header>

      {loading && <SpinnerLoader />}

      {!loading && !uploads?.length && <NoResults>No uploads yet!</NoResults>}

      {!loading && !!uploads?.length && (
        <CardContents>
          {uploads.map((upload, index) => {
            if (index === 0) {
              return (
                <Link href={`${upload.url}`}>
                  <a style={{gridArea: 'featured'}} className={"w-100"}>
                    <Featured key={index} image={upload.thumbnail ?? ""}>
                      <FeaturedControls href={upload.url ?? "#"}>
                        <span>{upload.title}</span>
                      </FeaturedControls>
                      {upload.type === "video" && (
                        <>
                          <PlayButtonFeatured>
                            <PlayCircleIcon />
                          </PlayButtonFeatured>
                          {/* TODO: Duration is not included in the API */}
                          <DurationFeatured>{upload.duration}</DurationFeatured>
                        </>
                      )}
                    </Featured>
                  </a>
                </Link>
              );
            }

            return (
              <Upload
                key={index}
                style={{ gridArea: `upload${index}` }}
                css={index >= 4 && extraUploadsCSS}
              >
                <UploadImage
                  href={upload.url}
                  alt={upload.title}
                  image={upload.thumbnail ?? ""}
                >
                  {upload.type === "video" && (
                    <>
                      <PlayButton>
                        <PlayCircleIcon />
                      </PlayButton>
                      {/* TODO: Duration is not included in the API */}
                      <Duration>{upload.duration}</Duration>
                    </>
                  )}
                </UploadImage>
                <ButtonLink href={`/${upload.type}`} variant="tag">
                  {capitalize(upload.type) ?? ""}
                </ButtonLink>
                <a href={upload.url} alt={upload.title}>
                  <span>{upload.title}</span>
                </a>
                <p>{upload.description ?? upload.channel_name ?? ""}</p>
              </Upload>
            );
          })}
        </CardContents>
      )}
    </Card>
  );
};

export default RecentUploadsWidget;
