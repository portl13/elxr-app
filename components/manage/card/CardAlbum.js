import React, {useState} from 'react';
import Link from "next/link";

function CardAlbum({album}) {
    const [open, setOpen] = useState(false)
    return (
        <div className="card-general-new w-100">
            <Link href={`/`}>
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
                    <Link href={`/`}>
                        <a className="text-white text-ellipsis">{album.title}</a>
                    </Link>
                </h3>
            </div>
            <div className="card-footer-actions">
                <Link href={`/manage/edit/album/${album.id}`}>
                    <a className="btn btn-action primary">Edit</a>
                </Link>
                <button
                    onClick={()=>setOpen(!open)}
                    className="btn btn-action danger">Delete</button>
                <Link href={`/`}>
                    <a className="btn btn-action">View</a>
                </Link>
            </div>
        </div>
    );
}

export default CardAlbum;