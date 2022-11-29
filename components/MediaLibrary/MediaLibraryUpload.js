import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { Progress } from "reactstrap";
import { Spinner } from "reactstrap/lib";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const mediaUrl = `${process.env.baseUrl}/wp-json/wp/v2/media`;

const defaultUpload = async (file, token, onUploadProgress) => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    return await axios.post(mediaUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      onUploadProgress,
    });
  } catch (e) {
    console.log(e);
  }
};

function MediaLibraryUpload({
  token,
  mutate,
  setTab,
  mediaHandlerUpload = null,
}) {
  const [progressInfos, setProgressInfos] = useState([]);
  const [totalFiles, setTotalFiles] = useState([false]);
  const [errorInfo, setErrorInfo] = useState("");

  const onDrop = useCallback(async (acceptedFiles) => {
    const filterAcceptedFiles = acceptedFiles.filter((file) =>
      file.type.includes("image")
    );

    if (filterAcceptedFiles.length === 0) {
      setErrorInfoAndTimer("only video files are accepted.");
      return;
    }

    const infoProgress = filterAcceptedFiles.map((file, idx) => ({
      progress: 0,
      name: file.name,
      id: idx,
      mjs: "",
      completed: false,
      error: true,
    }));

    setProgressInfos(infoProgress);

    // const allRequest = filterAcceptedFiles.map(async (file, index) => {
    //   const cloneProgress = infoProgress.map((x) => x);
    //   try {
    //     await defaultUpload(file, token);
    //     infoProgress[index].completed = true;
    //     setProgressInfos(cloneProgress);
    //   } catch (e) {
    //     infoProgress[index].completed = false;
    //     setProgressInfos(cloneProgress);
    //   }
    // });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 20,
  });

  const setErrorInfoAndTimer = (msj) => {
    setErrorInfo(msj);
    setTimeout(() => {
      setErrorInfo("");
    }, 3000);
  };

  useEffect(() => {
    if (totalFiles.every(Boolean)) {
      setTimeout(() => {
        setTab("media_library");
        mutate();
        setProgressInfos([]);
        setTotalFiles([false]);
      }, 3000);
    }
  }, [totalFiles]);

  return (
    <>
      <div
        className="d-flex justify-content-center text-center drop-zone align-items-center"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <div>
            <p>Drag 'n' drop some files here</p>
            <p>OR</p>
            <span className="btn btn-primary">click to select files</span>
          </div>
        )}
      </div>

      <div className={`text-right ${errorInfo ? "my-3" : null}`}>
        {errorInfo && <p className={"text-danger"}>{errorInfo}</p>}
      </div>

      {progressInfos.map((file) => (
        <div className="mt-3 col-12 mb-2 media-item">
          <div className={"media-item-name"}>
            <h5 className={"m-0"}>{file && file.name}</h5>
            <p className={file.mjs ? "my-3" : ""}>{file.mjs}</p>
          </div>
          <div className={"media-item-progress"}>
            {!file.completed && !file.error ? <Spinner size={"sm"} /> : null}
            {file.completed ? (
              <div className="media-item-icon">
                <FontAwesomeIcon className={"text-success"} icon={faCheck} />
              </div>
            ) : null}
            
            {file.error && !file.completed ? (
              <div className="media-item-icon">
                <FontAwesomeIcon className={"text-success"} icon={faCheck} />
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </>
  );
}

export default MediaLibraryUpload;
