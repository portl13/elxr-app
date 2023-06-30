import React, { useContext, useEffect, useState } from "react"
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import CloseIcon from "@icons/CloseIcon"
import { css } from "@emotion/core"
import { UserContext } from "@context/UserContext"
import useSWRInfinite from "swr/infinite"
import { genericFetch } from "@request/dashboard"
import InfiniteScroll from "react-infinite-scroll-component"
import SpinnerLoader from "@components/shared/loader/SpinnerLoader"
import SongModalItem from "@components/song/SongModalItem"
import EpisodeCreate from "@components/podcasts/EpisodeCreate"

const mediaStyle = css`
  .media-item {
    cursor: pointer;
    border-radius: 2px;
    border: 2px solid transparent;
    &.active .selected-image {
      border: 2px solid var(--primary-color);
      border-radius: 2px;
    }
  }
  .selected-image {
    border: 2px solid transparent;
  }
  .modal-title {
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-radius: 2px;
  }
  .nav-tabs .nav-link.active {
    background-color: transparent !important;
    color: var(--bg-font) !important;
  }
  .drop-zone {
    border: 2px dashed var(--bg-font);
    min-height: 200px;
  }
  .media-container {
    overflow-y: scroll;
  }
  .video-title {
    padding: 10px;
    top: unset;
    bottom: 0;
    word-break: break-all;
  }
  .modal-body {
    max-height: 600px;
    overflow-x: hidden;
  }
`
const songUrl = `${process.env.apiV2}/episodes`
const PAGE_SIZE = 12

function EpisodeModal({
  open,
  setOpen,
  setEpisodes,
  prevEpisodes = null,
  editEpisode = null,
  setEditEpisode,
}) {
  const { user } = useContext(UserContext)
  const token = user?.token
  const [selectedSongs, setSelectedSongs] = useState([])
  const [tab, setTab] = useState("select")
  const [isSaving, setIsSaving] = useState(!!editEpisode)
  const [formSong, setFormSong] = useState(null)

  const { data, mutate, setSize, size, error } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.length) return null
      if (!user) return null
      let url = `${songUrl}?page=${pageIndex + 1}&author=${
        user.id
      }&per_page=${PAGE_SIZE}&single=true&status=publish`

      return token ? [url, token] : null // SWR key
    },
    genericFetch
  )

  const songs = data ? [].concat(...data) : []
  const isEmpty = data?.length === 0
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE)

  useEffect(() => {
    if (editEpisode) {
      setTab("create")
    }
  }, [editEpisode])

  useEffect(() => {
    if (prevEpisodes && prevEpisodes.length > 0) {
      setSelectedSongs(prevEpisodes)
    }
  }, [prevEpisodes])

  const loadMore = async () => {
    await setSize(size + 1)
  }

  const selectSongs = (song) => {
    const index = selectedSongs.findIndex((e) => e?.id === song.id)

    if (index > -1) {
      const selectedSongsCopy = [...selectedSongs]
      selectedSongsCopy.splice(index, 1)
      setSelectedSongs([...selectedSongsCopy])
      return
    }

    setSelectedSongs([...selectedSongs, song])
  }

  const putSongs = () => {
    setEpisodes(selectedSongs)
    setSelectedSongs([])
    setOpen(false)
  }

  const createSong = () => {
    formSong.submitForm()
  }

  const customMutate = async () => {
    await mutate()
    if (editEpisode) {
      setEditEpisode(null)
    }
    setTab("select")
  }

  const cancelEdit = () => {
    setEditEpisode(null)
    setOpen(false)
  }

  return (
    <Modal
      css={mediaStyle}
      isOpen={open}
      toggle={() => setOpen(!open)}
      centered={true}
      size={"lg"}
    >
      <ModalHeader>
        <span>Select or Add Episode</span>
        <span onClick={() => setOpen(!open)} className="pointer">
          <CloseIcon className="icon-setting" />
        </span>
      </ModalHeader>
      <ModalBody style={{ overflowY: isSaving ? "hiden" : "scroll" }}>
        <ul className="nav nav-tabs mb-3">
          <li onClick={() => setTab("select")} className="nav-item pointer">
            <span className={`nav-link ${tab === "select" ? "active" : ""}`}>
              Select Episode
            </span>
          </li>
          <li onClick={() => setTab("create")} className="nav-item pointer">
            <span className={`nav-link ${tab === "create" ? "active" : ""}`}>
              Add a Episode
            </span>
          </li>
        </ul>

        <div className="container">
          {tab === "select" ? (
            <InfiniteScroll
              next={() => loadMore()}
              dataLength={songs?.length}
              hasMore={!isReachingEnd}
              loader={<SpinnerLoader />}
              height={400}
              endMessage={
                <p className="col-12 text-center d-flex justify-content-center align-items-center no-image">
                  <b></b>
                </p>
              }
              className="row"
            >
              {songs &&
                songs.length > 0 &&
                songs.map((song) => (
                  <SongModalItem
                    key={song.id}
                    song={song}
                    selectSongs={selectSongs}
                    selectedSongs={selectedSongs}
                  />
                ))}
            </InfiniteScroll>
          ) : null}

          {tab === "create" ? (
            <EpisodeCreate
              customSubmit={setFormSong}
              isCustom={true}
              customMutate={customMutate}
              setIsSaving={setIsSaving}
              id={editEpisode}
            />
          ) : null}
        </div>
      </ModalBody>
      <ModalFooter>
        {tab === "select" ? (
          <button
            onClick={putSongs}
            className="btn btn-primary border-radius-35"
          >
            Select Episode{" "}
            {Object.values(selectedSongs).length > 0
              ? Object.values(selectedSongs).length
              : null}
          </button>
        ) : null}
        {tab === "create" && editEpisode ? (
          <button
            onClick={cancelEdit}
            className="btn btn-primary border-radius-35"
          >
            Cancel
          </button>
        ) : null}
        {tab === "create" ? (
          <button
            onClick={createSong}
            className="btn btn-primary border-radius-35"
          >
            {!isSaving ? "Create" : "Creating..."}
          </button>
        ) : null}
      </ModalFooter>
    </Modal>
  )
}

export default EpisodeModal
