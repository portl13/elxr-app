import React from "react";
import Link from "next/link";
import { stringToSlug } from "@lib/stringToSlug";
import { writingsLink } from "@utils/links";

function BlogCardNew({ blog }) {
  return (
    <div className="card-general-new">
      <Link href={writingsLink(blog.title, blog.id)}>
        <a>
          <div
            className="ratio ratio-16x9 border-radius-17 bg-gray card-head bg-cover"
            style={{ backgroundImage: `url(${blog.thumbnail})` }}
          ></div>
        </a>
      </Link>
      <div className="py-3">
        <h4 className="font-size-14  m-0">
          <Link href={writingsLink(blog.title, blog.id)}>
            <a className="color-font">{blog.title}</a>
          </Link>
        </h4>
        <div className="d-flex alig-items-center color-font-grey ">
          <span className="font-size-13 mr-1">
            Channel: {blog.channel_name}
          </span>
        </div>
        <div className=" d-flex  color-font-grey">
          <span className="font-size-13 mr-1">Category:</span>
          <span className="font-size-13">{blog.category}</span>
        </div>
      </div>
    </div>
  );
}

export default BlogCardNew;
