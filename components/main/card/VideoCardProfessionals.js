import React from "react";
import Link from "next/link";
import { stringToSlug } from "@lib/stringToSlug";
import { onlyLettersAndNumbers } from "@utils/onlyLettersAndNumbers";

const VideoChunkCard = ({ video }) => {
  return (
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

        {!video.thumbnail && !onlyLettersAndNumbers(video?.video) && (
          <div className="ratio ratio-16x9 mb-3 mb-md-0 border-radius-17 pointer  cover-bg bg-gray"></div>
        )}
      </a>
    </Link>
  );
};

function VideoCardProfessionals({ videos }) {
  const [
    video1 = null,
    video2 = null,
    video3 = null,
    video4 = null,
    video5 = null,
  ] = videos;
  return (
    <article className="row card-general-new">
      <div className="col-12">
        <div className="row">
          <div className="col-12 col-md-6 pb-3 pb-md-0 pr-3 pr-md-2">
            {video1 ? (
              <>
                <Link
                  href={`/video/${stringToSlug(video1.title)}/${video1.id}`}
                >
                  <a>
                    {onlyLettersAndNumbers(video1?.video) && !video1.thumbnail && (
                      <div
                        style={{
                          backgroundImage: `url(https://${process.env.SubdomainCloudflare}/${video1.video}/thumbnails/thumbnail.jpg?time=${video1.size}s)`,
                        }}
                        className="ratio ratio-16x9 pointer border-radius-17 cover-bg"
                      ></div>
                    )}

                    {video1.thumbnail && (
                      <div
                        style={{
                          backgroundImage: `url(${video1.thumbnail})`,
                        }}
                        className="ratio ratio-16x9 border-radius-17 pointer  cover-bg"
                      ></div>
                    )}
                  </a>
                </Link>
                <div>
                  <h3 className="font-size-14 m-0">
                    <Link
                      href={`/video/${stringToSlug(video1.title)}/${video1.id}`}
                    >
                      <a className="text-white font-size-12 font-weight-700">
                        {video1.title}
                      </a>
                    </Link>
                  </h3>
                </div>
              </>
            ) : null}
          </div>
          <div className="col-12 col-md-6 d-flex ">
            <div className="col-6 pl-0 pr-1 pr-md-3 d-flex flex-column justify-content-between">
              {video2 ? <VideoChunkCard video={video2} /> : null}
              {video3 ? <VideoChunkCard video={video3} /> : null}
            </div>
            <div className="col-6 pl-0 pr-1 pr-md-3 d-flex flex-column justify-content-between">
              {video4 ? <VideoChunkCard video={video4} /> : null}
              {video5 ? <VideoChunkCard video={video5} /> : null}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default VideoCardProfessionals;
