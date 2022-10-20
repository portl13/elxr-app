import React, {useContext, useEffect, useRef, useState} from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
import { useQuill } from "react-quilljs";
import MediaLibraryVideo from "@components/MediaLibraryVideo/MediaLibraryVideo";
import {faImage} from "@fortawesome/free-regular-svg-icons";
import MediaLibrary from "@components/MediaLibrary/MediaLibrary";
import {UserContext} from "@context/UserContext";

//import QuillNoSSRWrapper from 'react-quill'

const CustomToolBar = ({ children }) => (
  <div className="quill editor-styles mb-2">
    <div className="ql-toolbar ql-snow" id="toolbar">
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
      </div>
      <div className="ql-formats">
        <button className="ql-link"></button>
        <button className="ql-video"></button>
        {children}
      </div>
    </div>
  </div>
);

const modules = {
  // toolbar: [
  //   ['bold', 'italic', 'underline', 'strike', 'blockquote'],
  //   [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
  //   ['link', 'image', 'video'],
  // ],
  toolbar: {
    container: "#toolbar",
  },
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
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
];

function Editor({ value, onChange, className = "editor-styles w-100" }) {
  const { user } = useContext(UserContext)
  const token = user?.token
  const [openMedia, setOpenMedia] = useState(false);
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState({
    index:0
  });

  const { quill, quillRef } = useQuill({
    modules,
    theme: "snow",
    formats,
  });

  useEffect(() => {
    if (quill && value) {
      quill.clipboard.dangerouslyPasteHTML(value);
    }
  }, [quill]);

  useEffect(() => {
    if (quill) {
      quill.on("text-change", (delta, oldDelta, source) => {
        setCursor(quill.getSelection())
        onChange(quill.root.innerHTML);
      });
    }
  }, [quill]);

  const selectMedia = (media) => {
    quill.insertEmbed(cursor.index, 'video', `https://customer-85isopi7l4huoj8o.cloudflarestream.com/${media.uid}/iframe?poster=${media.thumbnail}`)
  };

  const selectMediaImage = (media)=>{
    const url = media.source_url
    quill.insertEmbed(cursor.index, 'image', url)
  }

  return (
    <>
      <CustomToolBar>
        <button
            onClick={()=>setOpenMedia(!openMedia)}
            >
          <FontAwesomeIcon icon={faVideo} />
        </button>
        <button
            onClick={()=>setOpen(!open)}
            >
          <FontAwesomeIcon icon={faImage} />
        </button>
      </CustomToolBar>
      <div className={className}>
        <div ref={quillRef}></div>
      </div>
      {/*<QuillNoSSRWrapper*/}
      {/*  className={className}*/}
      {/*  value={value}*/}
      {/*  onChange={onChange}*/}
      {/*  modules={modules}*/}
      {/*  formats={formats}*/}
      {/*  theme="snow"*/}
      {/*/>*/}
      <MediaLibraryVideo
        show={openMedia}
        setShow={setOpenMedia}
        selectMedia={selectMedia}
      />
      <MediaLibrary
          token={token}
          show={open}
          onHide={() => setOpen(!open)}
          selectMedia={selectMediaImage}
          media_type={"image"}
      />
    </>
  );
}

export default Editor;
