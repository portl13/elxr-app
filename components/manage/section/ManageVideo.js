import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@context/UserContext";
import useSWR from "swr";
import { genericFetch } from "@request/dashboard";
import InputDashSearch from "@components/shared/form/InputDashSearch";
import PlusIcon from "@icons/PlusIcon";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import Pagination from "@components/shared/pagination/Pagination";
import EventModalSelectChannel from "@components/dashboard/events/EventModalSelectChannel";
import ChannelAddVideoModal from "@components/dashboard/channels/ChannelAddVideoModal";
import CardVideo from "@components/manage/card/CardVideo";
import useDebounce from "@hooks/useDebounce";

const baseUrl = process.env.apiV2;
const urlEvents = `${baseUrl}/video/`;

function ManageVideo() {
  const { user } = useContext(UserContext);
  const token = user?.token;
  const limit = 20;
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const [openAddVideo, setOpenAddVideo] = useState(false);
  const [channelId, setChannelId] = useState(null);

  const [search, setSearch] = useState("");
  const debounceTerm = useDebounce(search, 500);

  const createVideo = (id) => {
    setChannelId(id);
    setOpenAddVideo(true);
  };

  const { data: videos, mutate: mutateVideo } = useSWR(
    token
      ? [
          `${urlEvents}?author=${user?.id}&page=${page}&per_page=${limit}&search=${debounceTerm}`,
          token,
        ]
      : null,
    genericFetch
  );

  const isLoading = !videos;

  const mutateVideos = async (id) => {
    const newVideos = {
      videos: [...videos.videos.filter((event) => event.id !== id)],
      items: Number(videos.items) - 1,
      total_items: Number(videos.total_items) - 1,
    };

    return await mutateVideo(newVideos, { revalidate: true });
  };

  const mutateVideosEdit = async (video) => {
    const newVideos = {
      videos: [
        ...videos.videos.map((event) => {
          if (event.id === video.id) {
            return;
          }
          return event;
        }),
      ],
      items: Number(videos.items) - 1,
      total_items: Number(videos.total_items) - 1,
    };

    return await mutateVideo(newVideos, { revalidate: true });
  };

  useEffect(() => {
    if (videos && videos.total_items) {
      setTotal(videos.total_items);
    }
  }, [videos]);

  return (
    <>
      <div className="container">
        <div className="row d-flex  justify-content-between mb-5">
          <div className="col-12 col-md-6">
            <h4 className="list-nav-item-title pl-0">Videos</h4>
          </div>
          <div className="col-12 col-md-3">
            <InputDashSearch
                value={search}
                name={"search"}
                onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="row mt-4 mt-md-5">
          {isLoading && <SpinnerLoader />}
          {videos &&
            videos.videos &&
            videos.videos.length > 0 &&
            videos.videos.map((video) => (
              <div key={video.id} className="col-12 col-md-6 col-lg-3 mb-4">
                <CardVideo
                  mutateVideos={mutateVideos}
                  video={video}
                  token={token}
                />
              </div>
            ))}

          {videos && videos.videos && videos.videos.length === 0 && (
            <h3 className="col display-4">
              You have not created any videos yet
            </h3>
          )}
        </div>
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <Pagination
              totalCount={total || 0}
              onPageChange={setPage}
              currentPage={page}
              pageSize={limit}
            />
          </div>
        </div>
      </div>
      {open && (
        <EventModalSelectChannel
          handleCreate={createVideo}
          open={open}
          setOpen={setOpen}
        />
      )}
      {openAddVideo && channelId && token && (
        <ChannelAddVideoModal
          token={token}
          id={channelId}
          open={openAddVideo}
          setOpen={setOpenAddVideo}
          mutateVideo={mutateVideo}
        />
      )}
    </>
  );
}

export default ManageVideo;
