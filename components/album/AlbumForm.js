import Editor from "@components/shared/editor/Editor";
import InputDashTags from "@components/shared/form/InpushDashTags";
import InputDashForm from "@components/shared/form/InputDashForm";
import InputDashRadio from "@components/shared/form/InputDashRadio";
import InputSelectChannel from "@components/shared/form/InputSelectChannel";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import SongModal from "@components/song/SongModal";
import SongBuilder from "@components/song/SongBuilder";

function AlbumForm({
  form,
  handlerSelectChannel,
  category,
  setCategoryValue,
  categories,
  tags,
  setTags,
  handleContent,
  setSongs,
  songs,
}) {
  const [open, setOpen] = useState(false);
  const [editSong, setEditSong] = useState(null);

  return (
    <>
      <div className={"mb-4 mt-5 w-100"}>
        <InputDashForm
          required={true}
          label={"Album Name"}
          type={"text"}
          name={"title"}
          value={form.values.title}
          onChange={form.handleChange}
          error={form.errors.title}
          touched={form.touched.title}
        />
      </div>
      <div className="mb-4 w-100">
        <InputSelectChannel
          label="Channel"
          name="channel_id"
          placeholder="Select Channel..."
          required={true}
          error={form.errors.channel_id}
          touched={form.touched.channel_id}
          value={form.values.channel_id}
          onChange={handlerSelectChannel}
        />
      </div>
      <div className="mb-4 w-100">
        <InputDashForm
          required={true}
          type="select"
          name="category"
          value={category}
          onChange={setCategoryValue}
          label="Category"
          error={form.errors.category}
          touched={form.touched.category}
          options={categories}
        />
      </div>
      <div className="mb-4 w-100">
        <InputDashTags value={tags} setValue={setTags} />
      </div>
      <div className="mb-4 w-100">
        <Editor
          className="editor-styles w-100 full"
          value={form.values.content}
          onChange={handleContent}
        />
        {form.errors.content && form.touched.content && (
          <div className="invalid-feedback d-block col font-size-18 mt-2">
            {form.errors.content}
          </div>
        )}
      </div>
      <h3>Upload Songs</h3>
      {form.errors.songs && form.touched.songs && (
        <div className="alert alert-danger w-100" role="alert">
          At least select a song.
        </div>
      )}
      {songs ? (
        <SongBuilder
          setEditSong={setEditSong}
          setOpen={setOpen}
          songs={songs}
          setSongs={setSongs}
        />
      ) : null}
      <div className="w-100 mb-4 d-flex justify-content-end">
        <button
          onClick={() => setOpen(!open)}
          className="btn px-3 mr-2 text-primary font-size-18"
        >
          <i>
            <FontAwesomeIcon
              style={{
                width: 20,
                marginRight: 10,
              }}
              className={"text-icon"}
              icon={faPlus}
            />
          </i>
          Add a Song
        </button>
      </div>
      <div className="mb-4 w-100">
        <h3 className={"font-size-14"}>Visibility Settings</h3>
        <div className="d-flex mt-3">
          <InputDashRadio
            values={[
              {
                value: "open",
                label: "Open",
              },
              {
                value: "subscribers",
                label: "Subscribers Only",
              },
            ]}
            name="type"
            value={form.values.type}
            onChange={form.handleChange}
          />
        </div>
      </div>
      {open && (
        <SongModal
          prevSongs={songs}
          setSongs={setSongs}
          open={open}
          setOpen={setOpen}
          editSong={editSong}
          setEditSong={setEditSong}
        />
      )}
    </>
  );
}

export default AlbumForm;
