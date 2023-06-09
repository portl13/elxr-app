import React, { useContext, useEffect, useState, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMusic, faVideo} from "@fortawesome/free-solid-svg-icons";
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
        <button className="ql-bold width-editor-mobile"></button>
        <button className="ql-italic width-editor-mobile"></button>
        <button className="ql-underline width-editor-mobile"></button>
        <button className="ql-strike width-editor-mobile"></button>
        <button className="ql-blockquote width-editor-mobile"></button>
      </div>
      <div className="ql-formats">
        <button className="ql-list width-editor-mobile" value="ordered"></button>
        <button className="ql-list width-editor-mobile" value="bullet"></button>
        <button className="ql-align width-editor-mobile"></button>
        <button className="ql-align width-editor-mobile" value="center"></button>
        <button className="ql-align width-editor-mobile" value="right"></button>
      </div>
      <div className="ql-formats">
        <button className="ql-link width-editor-mobile"></button>
        <button className="ql-video width-editor-mobile"></button>
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
  "audio"
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
        matchVisual: false,
      },
    },
    theme: "snow",
    formats,
    debug: "false",
  };

  const { quill, quillRef, Quill } = useQuill(options);


  if (Quill && !quill){
    const BlockEmbed = Quill.import('blots/block/embed');
    class AudioBlot extends BlockEmbed {
      static create(url) {
        let node = super.create();
        node.setAttribute('src', url);
        node.setAttribute('controls', '');
        return node;
      }

      static value(node) {
        return node.getAttribute('src');
      }
    }
    AudioBlot.blotName = 'audio';
    AudioBlot.tagName = 'audio';
    Quill.register(AudioBlot);
  }

  const load = useRef(true);
  const [type, setType] = useState("image");

  const token = user?.token;
  const [openMedia, setOpenMedia] = useState(false);
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState({
    index: 0,
  });

  useEffect(() => {
    if (quill && value?.length === 8 && load.current) {
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
    console.log(url, type)
    quill.insertEmbed(cursor.index, type, url);
  };

  const setTypeMedia = (type) => {
    setType(type)
    setOpen(!open)
  }

  return (
    <>
      <CustomToolBar id={id}>
        <button className=" width-editor-mobile" onClick={() => setTypeMedia("audio")}>
          <FontAwesomeIcon icon={faMusic} />
        </button>
        <button className=" width-editor-mobile"  onClick={() => setOpenMedia(!openMedia)}>
          <FontAwesomeIcon icon={faVideo} />
        </button>
        <button className=" width-editor-mobile"  onClick={() => setTypeMedia("image")}>
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
          media_type={type}
        />
      ) : null}
    </>
  );
}

export default Editor;
