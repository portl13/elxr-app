import React from "react";
import SaveButton from "@components/shared/action/SaveButton";
import SharedButton from "@components/shared/action/SharedButton";
import CategoryAndTags from "@components/shared/cards/CategoryAndTags";
import ChannelCardMedia from "@components/video/ChannelCardMedia";
import SubscriptionBox from "@components/shared/ui/SubscriptionBox";
import { useSession } from "next-auth/react";
import AuthBox from "@components/shared/ui/AuthBox";

function BlogInfo({ blog, user }) {
  const { status } = useSession();
  return (
    <>
      <div
        className="ratio ratio-16x9 bg-gray card-head cover-bg bg-gray border-radius-17"
        style={{
          backgroundImage: `url(${blog?.thumbnail})`,
        }}
      ></div>
      <div className="d-flex flex-column flex-md-row w-100 justify-content-between">
        <h4 className="font-weight-bold mt-4 mb-2 color-font">{blog?.title}</h4>
        <div className="flex-shrink d-flex align-items-center">
          {blog && <SaveButton value={blog?.id} type="blog" />}
          <SharedButton title={blog?.title} />
        </div>
      </div>

      {blog && blog?.category && blog?.tags ? (
        <CategoryAndTags category={blog?.category} tags={blog?.tags} />
      ) : null}

        {status === 'unauthenticated' && status !== 'loading' && blog.type === 'subscribers' ?(
            <AuthBox />
        ): null}

      {!blog?.is_subscribed && user ? (
        <SubscriptionBox vendor_id={blog?.author} user={user} />
      ) : null}
      {blog?.content ? (
        <div
          className="mt-3"
          dangerouslySetInnerHTML={{
            __html: blog?.content,
          }}
        />
      ) : null}
      {blog && blog.author && <ChannelCardMedia is_subscribed={blog?.is_subscribed} author={blog.author} />}
    </>
  );
}

export default BlogInfo;
