import React from 'react';
import {FeedText} from "@/elxr/components/widgets/Live/FeedItem/styles";
import Link from "next/link";
import {stringToSlug} from "@lib/stringToSlug";
import {onlyLettersAndNumbers} from "@utils/onlyLettersAndNumbers";

const typeActivity = {
    "new_blog_channel-videos": "video",
    new_blog_podcasts: "podcasts",
    new_blog_channel_events: "event",
    new_blog_blog: "blog",
    new_blog_album: "album",
};

function FeedContent({activity, defaultContent}) {
    if (
        activity.type === "new_blog_channel-videos" ||
        activity.type === "new_blog_podcasts" ||
        activity.type === "new_blog_channel_events" ||
        activity.type === "new_blog_channel" ||
        activity.type === "new_blog_blog" ||
        activity.type === "new_blog_album"
    ) {
        return (
            <>
                <FeedText>{defaultContent}</FeedText>
                {activity?.feature_media && (
                    <Link
                        href={`/${typeActivity[activity.type]}/${stringToSlug(
                            activity?.secondary_item_title || "title"
                        )}/${activity?.secondary_item_id}`}
                    >
                        <a>
                            <div
                                style={{
                                    backgroundImage: `url(${activity?.feature_media})`,
                                }}
                                className="ratio ratio-16x9 bg-cover bg-gray"
                            ></div>
                        </a>
                    </Link>
                )}

                {!activity?.feature_media && activity.type === "new_blog_channel-videos" &&
                    activity.video &&
                    onlyLettersAndNumbers(activity.video) && (
                        <Link
                            href={`/${typeActivity[activity.type]}/${stringToSlug(
                                activity?.secondary_item_title || "title"
                            )}/${activity?.secondary_item_id}`}
                        >
                            <a>
                                <div
                                    style={{
                                        backgroundImage: `url(https://${process.env.SubdomainCloudflare}/${activity.video}/thumbnails/thumbnail.jpg?time=${activity?.size || 1}s)`,
                                    }}
                                    className="ratio ratio-16x9 bg-gray bg-cover"
                                ></div>
                            </a>
                        </Link>
                    )}

            </>
        );
    }
    return <FeedText>{defaultContent}</FeedText>;
}

export default FeedContent;