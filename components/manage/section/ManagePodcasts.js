import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@context/UserContext";
import useSWR from "swr";
import { genericFetch } from "@request/dashboard";
import InputDashSearch from "@components/shared/form/InputDashSearch";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import Pagination from "@components/shared/pagination/Pagination";
import EventModalSelectChannel from "@components/dashboard/events/EventModalSelectChannel";
import ChannelAddAudioModal from "@components/dashboard/channels/ChannelAddAudioModal";
import useDebounce from "@hooks/useDebounce";
import CardPodcast from "@components/manage/card/CardPodcast";

const url = `${process.env.apiV2}/podcasts`;

function ManagePodcasts() {
  const { user } = useContext(UserContext);
  const token = user?.token;
  const [open, setOpen] = useState(false);
  const [channelId, setChannelId] = useState(null);
  const [addAudio, setAddAudio] = useState(false);
  const createPodcast = (id) => {
    setChannelId(id);
    setAddAudio(true);
  };
  const limit = 20;
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const debounceTerm = useDebounce(search, 500);

  const { data: audios, mutate: mutateAudio } = useSWR(
    token
      ? [
          `${url}?author=${user?.id}&page=${page}&per_page=${limit}&search=${debounceTerm}`,
          token,
        ]
      : null,
    genericFetch
  );

  const isLoading = !audios;

  const mutateAudios = async (id) => {
    const newAudio = {
      audios: [...audios.audios.filter((audio) => audio.id !== id)],
      items: Number(audios.items) - 1,
      total_items: Number(audios.total_items) - 1,
    };

    return await mutateAudio(newAudio, { revalidate: true });
  };

  const mutateAudiosEdit = async (video) => {
    const newAudio = {
      audios: [
        ...audios.audios.map((event) => {
          if (event.id === video.id) {
            return eventData;
          }
          return event;
        }),
      ],
      items: Number(audios.items) - 1,
      total_items: Number(audios.total_items) - 1,
    };

    return await mutateAudio(newAudio, { revalidate: true });
  };

  useEffect(() => {
    if (audios && audios.total_items) {
      setTotal(audios.total_items);
    }
  }, [audios]);

  return (
    <>
      <div className="container ">
        <div className="row d-flex  justify-content-between mb-5">
          <div className="col-12 col-md-6">
            <h4 className="list-nav-item-title pl-0">Podcasts</h4>
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
          {audios &&
            audios.audios &&
            audios.audios.length > 0 &&
            audios.audios.map((audio) => (
              <div className="col-12 col-md-4 col-lg-3 mb-4">
                <CardPodcast
                  channel_id={audio.channel_id}
                  token={token}
                  mutateAudiosEdit={mutateAudiosEdit}
                  mutateAudios={mutateAudios}
                  audio={audio}
                  key={audio.id}
                />
              </div>
            ))}
          {audios && audios.audios && audios.audios.length === 0 && (
            <h3 className="col display-4">
              You have not created any events yet
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
          handleCreate={createPodcast}
          open={open}
          setOpen={setOpen}
        />
      )}
      {token && addAudio && (
        <ChannelAddAudioModal
          token={token}
          id={channelId}
          open={addAudio}
          setOpen={setAddAudio}
          mutateAudio={mutateAudio}
        />
      )}
    </>
  );
}

export default ManagePodcasts;
