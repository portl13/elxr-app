import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Progress } from "reactstrap";
import axios from "axios";
import { Upload } from "tus-js-client";

const videoLessThan200MB = async (file, user, onUploadProgress) => {
  const { data: urlUpload } = await axios.post(
    "/api/cloudflare/uploads",
    {},
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
  );

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_file", true);
  formData.append("creator", user.id);
  await axios.post(urlUpload.uploadURL, formData, { onUploadProgress });
};

const videoGreaterThan200MB = async (file, user, onProgress) => {
  let mediaId = "";

  let upload = new Upload(file, {
    endpoint: `/api/cloudflare/tus?token=${user.token}`,
    retryDelays: [0, 1000, 3000, 5000],
    chunkSize: 50 * 1024 * 1024, // Required a minimum chunk size of 5MB, here we use 50MB.
    uploadSize: file.size,
    onError: function (error) {
      throw error;
    },
    onProgress: onProgress,
    onAfterResponse: function (req, res) {
      return new Promise((resolve) => {
        let mediaIdHeader = res.getHeader("stream-media-id");
        if (mediaIdHeader) {
          mediaId = mediaIdHeader;
        }
        resolve();
      });
    },
  });

  upload.start();
};

function MediaLibraryVideoUpload({ setTab, user, mutate = () =>{} }) {
  const [progressInfos, setProgressInfos] = useState([]);
  const [errorInfo, setErrorInfo] = useState("");
  const [totalFiles, setTotalFiles] = useState([false]);

  const onDrop = useCallback(async (acceptedFiles) => {
    const filterAcceptedFiles = acceptedFiles.filter((file) =>
      file.type.includes("video")
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
      completed: false
    }));

    setTotalFiles(infoProgress.map(file => file.completed));

    setProgressInfos(infoProgress);

    const allRequest = filterAcceptedFiles.map(async (file, index) => {
      
      if (file.size < 200000000) {
        await videoLessThan200MB(file, user, (event) => {
          const cloneProgress = infoProgress.map((x) => x);
          let progress = Math.round((100 * event.loaded) / event.total);
          cloneProgress[index].progress = progress;
          setProgressInfos(cloneProgress);
          if (progress === 100) {
            let cloneFile = totalFiles.map(x=>x)
            cloneFile[index] = true;
            setTotalFiles(cloneFile)
          }
        });
      }

      if (file.size > 200000000) {
        await videoGreaterThan200MB(
          file,
          user,
          (bytesUploaded, bytesTotal) => {
            let percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
            const cloneProgress = infoProgress.map((x) => x);
            cloneProgress[index].progress = percentage;
            cloneProgress[index].mjs = "Videos over 200mb take 30 seconds to be processed. Please wait for thumbnail to appear in Media Library.";
            setProgressInfos(cloneProgress);
            if (Number(percentage) === 100){
              let cloneFile = totalFiles.map(x=>x)
              cloneFile[index] = true;
              setTotalFiles(cloneFile)
            }
          }
        );
      }
    });


  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 5,
  });

  const setErrorInfoAndTimer = (msj) => {
    setErrorInfo(msj);
    setTimeout(() => {
      setErrorInfo("");
    }, 3000);
  };

  useEffect(() => {
    if (totalFiles.every(Boolean)) {
      setTab("media_library");
      mutate();
      setProgressInfos([]);
      setTotalFiles([false])
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
          <p>Drop the videos here ...</p>
        ) : (
          <div>
            <p>Drag 'n' drop some videos here</p>
            <p>OR</p>
            <span className="btn btn-primary">click to select videos</span>
          </div>
        )}
      </div>
      <div className={"text-right my-3"}>
        {errorInfo && <p className={"text-danger"}>{errorInfo}</p>}
      </div>

      {progressInfos.map((file) => (
        <div key={file.id} className="mt-2 col-12 mb-3">
          <h5>{file && file.name}</h5>
          <Progress animated value={file.progress} />
          <p className={file.mjs ? "my-3" : ""}>{file.mjs}</p>
        </div>
      ))}
    </>
  );
}

export default MediaLibraryVideoUpload;
