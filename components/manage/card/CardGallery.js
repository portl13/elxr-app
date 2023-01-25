import React, { useState } from 'react'
import Link from 'next/link'
import {stringToSlug} from "@lib/stringToSlug";
import GalleryModalDelete from "@components/manage/modals/GalleryModalDelete";

function CardGallery({ gallery, mutate }) {
    const [open, setOpen] = useState(false)
    return (
        <>
            <div className="card-general-new w-100">
                {/* <Link href={`/gallery/${stringToSlug(gallery.title)}/${gallery.id}`}> */}
                <Link href=''>
                    <a>
                        <div
                            style={{
                                backgroundImage: `url(${gallery?.thumbnail})`,
                            }}
                            className="ratio ratio-1x1 bg-gray border-radius-17 card-head cover-bg"
                        ></div>
                    </a>
                </Link>
                <div className="py-3 px-0 courses">
                    <h3 className="font-size-18 m-0">
                        {/* <Link href={`/gallery/${stringToSlug(gallery.title)}/${gallery.id}`}> */}
                        <Link href=''>
                            <a className="color-font text-ellipsis">{gallery.title}</a>
                        </Link>
                    </h3>
                </div>
                <div className="card-footer-actions">
                    <Link href={`/manage/edit/gallery/${gallery.id}`}>
                        <a className="btn btn-action">Edit</a>
                    </Link>
                    <button
                        onClick={()=>setOpen(!open)}
                        className="btn btn-action"
                    >
                        Delete
                    </button>
                    {/* <Link href={`/gallery/${stringToSlug(gallery.title)}/${gallery.id}`}> */}
                    <Link href=''>
                        <a className="btn btn-action">View</a>
                    </Link>
                </div>
            </div>
            <GalleryModalDelete mutate={mutate} open={open} setOpen={setOpen} gallery={gallery} />
        </>
    )
}

export default CardGallery
