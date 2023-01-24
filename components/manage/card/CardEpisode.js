import React, { useState } from 'react'
import Link from 'next/link'
import {stringToSlug} from "@lib/stringToSlug";
import EpisodeModalDelete from "@components/podcasts/EpisodeModalDelete";

function CardEpisode({ episode, mutate }) {
    const [open, setOpen] = useState(false)
    return (
      <>
        <div className="card-general-new w-100">
          <Link href={`/episode/${stringToSlug(episode.title)}/${episode.id}`}>
            <a>
              <div
                style={{
                  backgroundImage: `url(${episode?.thumbnail})`,
                }}
                className="ratio ratio-1x1 bg-gray border-radius-17 card-head cover-bg"
              ></div>
            </a>
          </Link>
          <div className="py-3 px-0 courses">
            <h3 className="font-size-18 m-0">
              <Link
                href={`/episode/${stringToSlug(episode.title)}/${episode.id}`}
              >
                <a className="color-font text-ellipsis">{episode.title}</a>
              </Link>
            </h3>
          </div>
          <div className="card-footer-actions">
            <Link href={`/manage/edit/episode/${episode.id}`}>
              <a className="btn btn-action">Edit</a>
            </Link>
            <button onClick={() => setOpen(!open)} className="btn btn-action">
              Delete
            </button>
            <Link
              href={`/episode/${stringToSlug(episode.title)}/${episode.id}`}
            >
              <a className="btn btn-action">View</a>
            </Link>
          </div>
        </div>
        <EpisodeModalDelete
          mutate={mutate}
          open={open}
          setOpen={setOpen}
          episode={episode}
        />
      </>
    );
}

export default CardEpisode
