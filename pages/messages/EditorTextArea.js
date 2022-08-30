import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { convertToRaw } from "draft-js";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { Button, Progress } from "reactstrap";
import draftToHtml from "draftjs-to-html";

import {
  CloseButton,
  thumb,
  thumbInner,
  thumbImg,
  activeStyle,
  acceptStyle,
  rejectStyle,
  DropZoneStyle,
  thumbsContainer,
} from "../../components/profile-edit/profile-edit.style";
import { CreateFeedTextarea } from "../../components/livefeed/livefeed.style";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { TextField } from "material-ui-core";
import { imageUrl } from "../../utils/constant";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const EditorTextArea = ({
  editorState,
  setMsgtext,
  images,
  progress,
  setEditorState,
  setImages,
  uploadView,
  setUploadView,
  setProgress,
  msgText,
}) => {
  const [selectedFile, setSelectedFile] = useState([]);

  const onSelectFile = (e) => {
    // if (!e.target.files || e.target.files.length === 0) {
    //   setSelectedFile(undefined);
    //   return;
    // }
    if(e.target.files.length > 0){
    const file = e.target.files;
    const imgFile = file[0];
    const blobUrl = URL.createObjectURL(imgFile);
    const data = {
      file: imgFile,
      blobUrl,
      type: imgFile.type,
    };
    setSelectedFile([...selectedFile, data]);
  }
  };
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    maxFiles: 0,
    multiple: true,
    onDrop: (acceptedFiles) => {
      setImages(
        acceptedFiles?.map((filedata) =>
          Object.assign(filedata, {
            preview: URL.createObjectURL(filedata),
          })
        )
      );
      setProgress(0);
    },
  });

  // const style = useMemo(() => ({
  //     ...(isDragActive ? activeStyle : {}),
  //     ...(isDragAccept ? acceptStyle : {}),
  //     ...(isDragReject ? rejectStyle : {})
  // }), [
  //     isDragActive,
  //     isDragReject,
  //     isDragAccept
  // ]);

  let styleThumb = thumb;
  const removeImage = (i) => {};
  const thumbs = images?.map((e, i) => (
    <div style={styleThumb} key={e.name}>
      <Button
        onClick={() => removeImage(i)}
        css={CloseButton}
        className="btn-icon btn-2"
        color="primary"
        type="button"
      >
        <span className="btn-inner--icon">
          <i>{close}</i>
        </span>
      </Button>
      <div style={thumbInner}>
        <div className="loading-container">
          {progress !== 0 && (
            <Progress max="100" value={progress} color="success" />
          )}
        </div>
        <img src={e.preview} style={thumbImg} />
      </div>
    </div>
  ));

  const handleDelete = (key) => {
   const imgData=[...selectedFile];
   imgData.splice(key,1)
   setSelectedFile(imgData)
  }
  return (
    <CreateFeedTextarea className="create-feed-panel remove-border">
      <div className={`form-input-wrap ${selectedFile?.length > 0 && "newFiles"} `}>
        <div className={selectedFile?.length > 0 && "newinput"}>
          {selectedFile?.length > 0 &&
            selectedFile.map((image,index) => {
              return (
                <figure>
                  {" "}
                  <img className="media"
                    src={
                      image.type.includes("pdf")
                        ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHnRPQGyCaNFkvDAnSGJZM0eWfmQZkqRayXg&usqp=CAU"
                        : image.type.includes("video")
                        ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMvOCSdKCCkEOdE7LSl7GKIMjjDXTWVwx18w&usqp=CAU"
                        : image.blobUrl
                    }
                    style={{ height: "50px", padding: "7px" }}
                  />
                  <figcaption onClick={()=>handleDelete(index)} ><img src="/img/msg-close.png" alt="close" className="close"/></figcaption>
                </figure>
              );
            })}
          {selectedFile?.length > 0 && (
            <>
              <label htmlFor="additionalFile" className="additional">
                <img
                  src="/img/add-attch.png"
               />
              </label>
            </>
          )}
        </div>
        <div className="flexAttech">
          <TextField
            type="text"
            placeholder="Type Message Aqui"
            value={msgText}
            className="w-100"
            onChange={(e) => setMsgtext(e.target.value)}
          />
          {/* <label htmlFor="attachFile" className="attach">
            <img src="/img/attach.svg" />
          </label> */}
        </div>
      </div>

      <input
        type="file"
        id="additionalFile"
        style={{ display: "none" }}
        placeholder="Type Message Hola"
        // value={msgText}
        // onChange={(e)=>setMsgtext(e.target.value)}
        onChange={onSelectFile}
      />
        <input
        type="file"
        id="attachFile"
        style={{ display: "none" }}
        placeholder="Type Message Aqui"
        // value={msgText}
        // onChange={(e)=>setMsgtext(e.target.value)}
        onChange={onSelectFile}
      />
      {/* <Editor
                editorState={editorState}
                toolbarClassName="toolbar-wrapper"
                wrapperClassName="wrapper-editor"
                editorClassName="editorClassName"
                // onFocus={() => }
                onChange={() => setMsgtext(draftToHtml(convertToRaw(editorState.getCurrentContent())))}
                placeholder="Type Message"
                toolbarCustomButtons={[
                    <div className="post-update-toolbar">
                        <div className="post-element-panel">
                            <FontAwesomeIcon icon={faCamera} onClick={() => setUploadView(true)} />
                            <div className="tooltip-panel">Attach a photo <em></em></div>
                        </div>
                    </div>
                ]}
                toolbar={{
                    options: ['inline', 'list', 'blockType', 'emoji'],
                    inline: {
                        inDropdown: false,
                        className: undefined,
                        component: undefined,
                        dropdownClassName: undefined,
                        options: ['bold', 'italic'],
                        bold: { icon: '/img/editor/bold.png', className: "demo-option-custom" },
                        italic: { icon: '/img/editor/italic.png', className: "demo-option-custom" },
                        color: 'white'
                    },
                    blockType: {
                        inDropdown: false,
                        options: ['Blockquote'],
                        blockquote: { icon: '/img/editor/quotes.png', className: "demo-option-custom" },
                        className: undefined,
                        component: undefined,
                        dropdownClassName: undefined,
                    },
                    list: {
                        inDropdown: false,
                        className: undefined,
                        component: undefined,
                        dropdownClassName: undefined,
                        options: ['unordered', 'ordered'],
                        unordered: { icon: '/img/editor/bullets.png', className: "demo-option-custom" },
                        ordered: { icon: '/img/editor/numbered.png', className: "demo-option-custom" },
                        color: 'white'
                    },
                    emoji: {
                        icon: '/img/editor/emoji.png',
                        className: 'demo-option-custom',
                    }
                }}
                toolbarStyle={{
                    color: 'white',
                    border: "none"
                }}
                onEditorStateChange={setEditorState}
            /> */}

      {uploadView ? (
        <div className="upload-image-conatiner profile-upload-container">
          <section css={DropZoneStyle} className="container">
            {/* <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <input id="browse-button" type="button" value="Select or Drop images here to upload" className="btn btn-default"></input>
                        </div> */}
            <aside style={thumbsContainer}>{thumbs}</aside>
          </section>
        </div>
      ) : null}
    </CreateFeedTextarea>
  );
};

export default EditorTextArea;
