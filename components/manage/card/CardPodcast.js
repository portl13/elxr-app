import React, { useState } from "react";
import Link from "next/link";
import { stringToSlug } from "@lib/stringToSlug";
import ChannelAudioModalDelete from "@components/dashboard/channels/ChannelAudioModalDelete";

function CardPodcast({ audio, mutateAudios }) {
  const [openModalDelete, setOpenModalDelete] = useState(false);
  return (
    <>
      <article className="card-general-new">
        <Link href={`/podcasts/${stringToSlug(audio.title)}/${audio.id}`}>
          <a>
            <div
              className="ratio ratio-1x1 border-radius-17 bg-gray card-head cover-bg bg-gray"
              style={{
                backgroundImage: `url(${audio?.thumbnail})`,
              }}
            ></div>
          </a>
        </Link>
        <div className="py-3">
          <h3 className="font-size-12  mt-3">
            <Link href={`/podcasts/${stringToSlug(audio.title)}/${audio.id}`}>
              <a className="color-font">{audio.title}</a>
            </Link>
          </h3>

          <div className="d-flex alig-items-center color-font-grey ">
            <span className="font-size-13">
              Channel:{" "}
              {audio && audio.channel_name && (
                  <span className="color-font-grey">{audio.channel_name}</span>
              )}
            </span>
          </div>
          <div className="card-footer-actions mt-3">
            <Link href={`/manage/edit/podcast/${audio.id}`}>
              <a className="btn btn-action">Edit</a>
            </Link>
            <button
              onClick={() => setOpenModalDelete(!openModalDelete)}
              className="btn btn-action"
            >
              Delete
            </button>
            <Link href={`/podcasts/${stringToSlug(audio.title)}/${audio.id}`}>
              <a className="btn btn-action">View</a>
            </Link>
          </div>
        </div>
      </article>
      <ChannelAudioModalDelete
        open={openModalDelete}
        setOpen={setOpenModalDelete}
        audio={audio}
        mutateAudios={mutateAudios}
      />
    </>
  );
}

export default CardPodcast;
