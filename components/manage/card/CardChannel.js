import React, { useState } from "react";
import Link from "next/link";
import { stringToSlug } from "@lib/stringToSlug";
import ChannelModalDelete from "@components/dashboard/channels/ChannelModalDelete";

function CardChannel({ channel, mutateChannels }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <article className="card-general-new">
        <Link
          href={`/channel/${stringToSlug(channel.channel_name)}/${channel?.id}`}
        >
          <a>
            <div
              style={{
                backgroundImage: `url(${channel?.channel_cover?.medium})`,
              }}
              className="ratio ratio-16x9 bg-gray border-radius-17 cover-bg"
            ></div>
          </a>
        </Link>
        <div className="py-3">
          <h3 className="font-size-14 m-0">
            <Link
              href={`/channel/${stringToSlug(channel.channel_name)}/${
                channel?.id
              }`}
            >
              <a className="text-white text-ellipsis">{channel.channel_name}</a>
            </Link>
          </h3>
          <div className=" d-flex text-grey">
            <span className="font-size-13 mr-1">Category:</span>
            <span className="font-size-13">{channel.category}</span>
          </div>
        </div>
        <div className="card-footer-actions">
          <Link href={`/dashboard/channel/edit/${channel?.id}`}>
            <a className="btn btn-action ">Edit</a>
          </Link>
          <button onClick={()=>setOpen(!open)} className="btn btn-action ">Delete</button>{" "}
          <Link
            href={`/channel/${stringToSlug(channel.channel_name)}/${
              channel?.id
            }`}
          >
            <a className="btn btn-action">View</a>
          </Link>
        </div>
      </article>
      <ChannelModalDelete
        mutateChannels={mutateChannels}
        open={open}
        setOpen={setOpen}
        channel={channel}
      />
    </>
  );
}

export default CardChannel;
