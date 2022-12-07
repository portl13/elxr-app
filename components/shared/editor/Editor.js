import React, { useContext, useEffect, useState, useRef, useId } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuid } from "uuid";

import { useQuill } from "react-quilljs";
import MediaLibraryVideo from "@components/MediaLibraryVideo/MediaLibraryVideo";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import MediaLibrary from "@components/MediaLibrary/MediaLibrary";
import { UserContext } from "@context/UserContext";

const domain = process.env.SubdomainCloudflare;

const CustomToolBar = ({ children, id }) => (
  <div className="quill editor-styles mb-2">
    <div className="ql-toolbar ql-snow" id={`toolbar-${id}`}>
      <div className="ql-formats">
        <button className="ql-bold"></button>
        <button className="ql-italic"></button>
        <button className="ql-underline"></button>
        <button className="ql-strike"></button>
        <button className="ql-blockquote"></button>
      </div>
      <div className="ql-formats">
        <button className="ql-list" value="ordered"></button>
        <button className="ql-list" value="bullet"></button>
        <button className="ql-align"></button>
        <button className="ql-align" value="center"></button>
        <button className="ql-align" value="right"></button>
      </div>
      <div className="ql-formats">
        <button className="ql-link"></button>
        <button className="ql-video"></button>
        {children}
      </div>
    </div>
  </div>
);

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "align",
];

function Editor({
  value = null,
  onChange,
  className = "editor-styles w-100",
  edit = false,
}) {
  const { user } = useContext(UserContext);
  const id = uuid();
  const options = {
    modules: {
      toolbar: {
        container: `#toolbar-${id}`,
      },
      clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
      },
    },
    theme: "snow",
    formats,
    debug: "false",
  };

  const { quill, quillRef } = useQuill(options);

  const load = useRef(true);

  const token = user?.token;
  const [openMedia, setOpenMedia] = useState(false);
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState({
    index: 0,
  });

  useEffect(() => {
    if (quill && value.length === 8 && load.current) {
      load.current = false;
    }
    if (quill && value && load.current) {
      quill.clipboard.dangerouslyPasteHTML(value);
      load.current = false;
    }
  }, [quill, value]);

  useEffect(() => {
    if (quill) {
      quill.on("text-change", (delta, oldDelta, source) => {
        setCursor(quill.getSelection());
        onChange(quill.root.innerHTML);
      });
    }
  }, [quill]);

  const selectMedia = (media) => {
    quill.insertEmbed(
      cursor.index,
      "video",
      `https://${domain}/${media.uid}/iframe?poster=${media.thumbnail}`
    );
  };

  const selectMediaImage = (media) => {
    const url = media.source_url;
    quill.insertEmbed(cursor.index, "image", url);
  };

  return (
    <>
      <CustomToolBar id={id}>
        <button onClick={() => setOpenMedia(!openMedia)}>
          <FontAwesomeIcon icon={faVideo} />
        </button>
        <button onClick={() => setOpen(!open)}>
          <FontAwesomeIcon icon={faImage} />
        </button>
      </CustomToolBar>
      <div className={className}>
        <div ref={quillRef}></div>
      </div>
      {openMedia ? (
        <MediaLibraryVideo
          show={openMedia}
          setShow={setOpenMedia}
          selectMedia={selectMedia}
        />
      ) : null}
      {open ? (
        <MediaLibrary
          token={token}
          show={open}
          onHide={() => setOpen(!open)}
          selectMedia={selectMediaImage}
          media_type={"image"}
        />
      ) : null}
    </>
  );
}

export default Editor;
