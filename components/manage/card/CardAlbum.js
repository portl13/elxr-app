import React, { useState } from "react";
import Link from "next/link";
import {stringToSlug} from "@lib/stringToSlug";
import AlbumModalDelete from "@components/album/AlbumModalDelete";

function CardAlbum({ album, mutate }) {
  const [open, setOpen] = useState(false);
  return (
      <>
    <div className="card-general-new w-100">
      <Link href={`/album/${stringToSlug(album?.title)}/${album?.id}`}>
        <a>
          <div
            style={{
              backgroundImage: `url(${album?.thumbnail})`,
            }}
            className="ratio ratio-1x1 bg-gray border-radius-17 card-head cover-bg"
          ></div>
        </a>
      </Link>
      <div className="py-3 px-0 courses">
        <h3 className="font-size-18 m-0">
          <Link href={`/album/${stringToSlug(album?.title)}/${album?.id}`}>
            <a className="text-white text-ellipsis">{album.title}</a>
          </Link>
        </h3>
      </div>
      <div className="card-footer-actions">
        <Link href={`/manage/edit/album/${album.id}`}>
          <a className="btn btn-action">Edit</a>
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className="btn btn-action"
        >
          Delete
        </button>
        <Link href={`/album/${stringToSlug(album?.title)}/${album?.id}`}>
          <a className="btn btn-action">View</a>
        </Link>
      </div>
    </div>
      <AlbumModalDelete
        open={open}
        setOpen={setOpen}
        album={album}
        mutate={mutate}
      />
      </>
  );
}

export default CardAlbum;
