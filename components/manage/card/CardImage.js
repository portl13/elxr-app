import React, { useState } from 'react'
import Link from 'next/link'
import {stringToSlug} from "@lib/stringToSlug";
import ImageModalDelete from "@components/manage/modals/ImageModalDelete";

function CardImage({ image, mutate }) {
    const [open, setOpen] = useState(false)
    return (
        <>
            <div className="card-general-new w-100">
                {/* <Link href={`/image/${stringToSlug(image.title)}/${image.id}`}> */}
                <Link href=''>
                    <a>
                        <div
                            style={{
                                backgroundImage: `url(${image?.thumbnail})`,
                            }}
                            className="ratio ratio-1x1 bg-gray border-radius-17 card-head cover-bg"
                        ></div>
                    </a>
                </Link>
                <div className="py-3 px-0 courses">
                    <h3 className="font-size-18 m-0">
                        {/* <Link href={`/image/${stringToSlug(image.title)}/${image.id}`}> */}
                        <Link href=''>
                            <a className="color-font text-ellipsis">{image.title}</a>
                        </Link>
                    </h3>
                </div>
                <div className="card-footer-actions">
                    <Link href={`/manage/edit/image/${image.id}`}>
                        <a className="btn btn-action">Edit</a>
                    </Link>
                    <button
                        onClick={()=>setOpen(!open)}
                        className="btn btn-action">
                            Delete
                    </button>
                    {/* <Link href={`/image/${stringToSlug(image.title)}/${image.id}`}> */}
                    <Link href=''>
                        <a className="btn btn-action">View</a>
                    </Link>
                </div>
            </div>
            <ImageModalDelete mutate={mutate} open={open} setOpen={setOpen} image={image} />
        </>
    )
}

export default CardImage
