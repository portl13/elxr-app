import React from "react";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { stringToSlug } from "@lib/stringToSlug";
import { onlyLettersAndNumbers } from "@utils/onlyLettersAndNumbers";

function VideoCardProfessionals({ video }) {
  return (
    <article className="row card-general-new">
      <div className="col-12">
        <div className="row">
          <div className="col-12 col-md-6 pb-3 pb-md-0 pr-3 pr-md-2">
            <Link href={`/video/${stringToSlug(video.title)}/${video.id}`}>
              <a>
                {onlyLettersAndNumbers(video?.video) && !video.thumbnail && (
                  <div
                    style={{
                      backgroundImage: `url(https://${process.env.SubdomainCloudflare}/${video.video}/thumbnails/thumbnail.jpg?time=${video.size}s)`,
                    }}
                    className="ratio ratio-16x9 pointer border-radius-17 cover-bg"
                  ></div>
                )}

                {video.thumbnail && (
                  <div
                    style={{
                      backgroundImage: `url(${video.thumbnail})`,
                    }}
                    className="ratio ratio-16x9 border-radius-17 pointer  cover-bg"
                  ></div>
                )}
              </a>
            </Link>
            <div>
              <h3 className="font-size-14 m-0">
                <Link href={`/video/${stringToSlug(video.title)}/${video.id}`}>
                  <a className="text-white font-size-12 font-weight-700">
                    {video.title}
                  </a>
                </Link>
              </h3>
            </div>
          </div>
          <div className="col-12 col-md-6 d-flex ">
            <div className="col-6 pl-0 pr-1 pr-md-3 d-flex flex-column justify-content-between">
              <Link href={`/video/${stringToSlug(video.title)}/${video.id}`}>
                <a>
                  {onlyLettersAndNumbers(video?.video) && !video.thumbnail && (
                    <div
                      style={{
                        backgroundImage: `url(https://${process.env.SubdomainCloudflare}/${video.video}/thumbnails/thumbnail.jpg?time=${video.size}s)`,
                      }}
                      className="ratio ratio-16x9 pointer border-radius-17 cover-bg"
                    ></div>
                  )}

                  {video.thumbnail && (
                    <div
                      style={{
                        backgroundImage: `url(${video.thumbnail})`,
                      }}
                      className="ratio ratio-16x9 mb-3 mb-md-0 border-radius-17 pointer  cover-bg"
                    ></div>
                  )}
                </a>
              </Link>
              <Link href={`/video/${stringToSlug(video.title)}/${video.id}`}>
                <a>
                  {onlyLettersAndNumbers(video?.video) && !video.thumbnail && (
                    <div
                      style={{
                        backgroundImage: `url(https://${process.env.SubdomainCloudflare}/${video.video}/thumbnails/thumbnail.jpg?time=${video.size}s)`,
                      }}
                      className="ratio ratio-16x9 pointer border-radius-17 cover-bg"
                    ></div>
                  )}

                  {video.thumbnail && (
                    <div
                      style={{
                        backgroundImage: `url(${video.thumbnail})`,
                      }}
                      className="ratio ratio-16x9 border-radius-17 pointer  cover-bg"
                    ></div>
                  )}
                </a>
              </Link>
            </div>
            <div className="col-6 pl-0 pr-1 pr-md-3 d-flex flex-column justify-content-between">
              <Link href={`/video/${stringToSlug(video.title)}/${video.id}`}>
                <a>
                  {onlyLettersAndNumbers(video?.video) && !video.thumbnail && (
                    <div
                      style={{
                        backgroundImage: `url(https://${process.env.SubdomainCloudflare}/${video.video}/thumbnails/thumbnail.jpg?time=${video.size}s)`,
                      }}
                      className="ratio ratio-16x9 pointer border-radius-17 cover-bg"
                    ></div>
                  )}

                  {video.thumbnail && (
                    <div
                      style={{
                        backgroundImage: `url(${video.thumbnail})`,
                      }}
                      className="ratio ratio-16x9 mb-3 mb-md-0 border-radius-17 pointer  cover-bg"
                    ></div>
                  )}
                </a>
              </Link>
              <Link href={`/video/${stringToSlug(video.title)}/${video.id}`}>
                <a>
                  {onlyLettersAndNumbers(video?.video) && !video.thumbnail && (
                    <div
                      style={{
                        backgroundImage: `url(https://${process.env.SubdomainCloudflare}/${video.video}/thumbnails/thumbnail.jpg?time=${video.size}s)`,
                      }}
                      className="ratio ratio-16x9 pointer border-radius-17 cover-bg"
                    ></div>
                  )}

                  {video.thumbnail && (
                    <div
                      style={{
                        backgroundImage: `url(${video.thumbnail})`,
                      }}
                      className="ratio ratio-16x9 border-radius-17 pointer  cover-bg"
                    ></div>
                  )}
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* 
      <Link href={`/video/${stringToSlug(video.title)}/${video.id}`}>
        <a>
          {onlyLettersAndNumbers(video?.video) && !video.thumbnail && (
            <div
              style={{
                backgroundImage: `url(https://${process.env.SubdomainCloudflare}/${video.video}/thumbnails/thumbnail.jpg?time=${video.size}s)`,
              }}
              className="ratio ratio-16x9 pointer border-radius-17 cover-bg"
            ></div>
          )}

          {video.thumbnail && (
            <div
              style={{
                backgroundImage: `url(${video.thumbnail})`,
              }}
              className="ratio ratio-16x9 border-radius-17 pointer  cover-bg"
            ></div>
          )}
        </a>
      </Link>

      <div className="py-3">
        <h3 className="font-size-14 m-0">
          <Link href={`/video/${stringToSlug(video.title)}/${video.id}`}>
            <a className="color-font font-size-12 font-weight-700">
              {video.title}
            </a>
          </Link>
        </h3>
        <div className="d-flex alig-items-center ">
          <span className="font-size-12 mr-1 color-font-grey">
            Channel: {video.channel_name}
          </span>
        </div>
        <div className=" d-flex ">
          <span className="font-size-12 color-font-grey mr-1">Category:</span>
          <span className="font-size-12 color-font-grey">{video.category}</span>
        </div>
      </div> */}
    </article>
  );
}

export default VideoCardProfessionals;
