import React from "react";
import VideoDetail from "@components/video/VideoDetail";
import { getDataSever } from "@request/shared";
const videourl = `${process.env.apiV2}/video`;

function VideoDetailPage({ id, video }) {
    return <VideoDetail video={video} id={id} />;
}

export default VideoDetailPage;

export async function getServerSideProps({ query, req }) {
    const { id } = query;
    let video;
    try {
        video = await getDataSever(`${videourl}/${id}`, req);
    } catch (e) {
        console.log(e);
    }
    return {
        props: { id, video },
    };
}
