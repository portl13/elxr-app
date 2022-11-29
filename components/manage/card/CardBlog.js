import React, { useState } from "react";
import Link from "next/link";
import { stringToSlug } from "@lib/stringToSlug";
import BlogsDeleteModal from "@components/dashboard/blogs/BlogDeleteModal";

function CardBlog({ blog, mutate }) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  return (
    <div className="card-general-new">
      <Link href={`/blog/${stringToSlug(blog.title)}/${blog.id}`}>
        <a>
          <div
            className="ratio ratio-16x9 border-radius-17 bg-gray card-head cover-bg"
            style={{ backgroundImage: `url(${blog.thumbnail})` }}
          ></div>
        </a>
      </Link>
      <div className="py-3">
        <h4 className="font-size-14  m-0">
          <Link href={`/blog/${stringToSlug(blog.title)}/${blog.id}`}>
            <a className="text-white">{blog.title}</a>
          </Link>
        </h4>
      </div>
      <div className="card-footer-actions w-100">
        <Link href={`/dashboard/blog/${blog.id}/edit`}>
          <a className="btn btn-action ">Edit</a>
        </Link>
        <button
          onClick={() => setOpenDeleteModal(!openDeleteModal)}
          className="btn btn-action "
        >
          Delete
        </button>
        <Link href={`/blog/${stringToSlug(blog.title)}/${blog.id}`}>
          <a className="btn btn-action">View</a>
        </Link>
      </div>
      <BlogsDeleteModal
        mutate={mutate}
        blog={blog}
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
      />
    </div>
  );
}

export default CardBlog;
