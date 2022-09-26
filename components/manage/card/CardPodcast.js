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
                backgroundImage: `url(${audio.thumbnail || audio.cover})`,
              }}
            ></div>
          </a>
        </Link>
        <div className="py-3">
          <audio className={`w-100 d-block`} controls src={audio.audio} />

          <h3 className="font-size-12  mt-3">
            <Link href={`/podcasts/${stringToSlug(audio.title)}/${audio.id}`}>
              <a className="text-white">{audio.title}</a>
            </Link>
          </h3>

          <div className="d-flex alig-items-center text-grey ">
            <span className="font-size-13">
              Channel:{" "}
              {audio && audio.channel_name && (
                <Link href={`/channel/${audio.channel_id}`}>
                  <a className="text-grey">{audio.channel_name}</a>
                </Link>
              )}
            </span>
          </div>
          <div className="card-footer-actions mt-3">
            <Link href={`/dashboard/podcasts/edit-podcasts/${audio.id}`}>
              <a className="btn btn-action primary">Edit</a>
            </Link>
            <button
              onClick={() => setOpenModalDelete(!openModalDelete)}
              className="btn btn-action danger"
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
