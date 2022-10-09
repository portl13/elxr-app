import React, { useCallback, useContext, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Progress } from "reactstrap";
import axios from "axios";
import { UserContext } from "@context/UserContext";

const videoLessThan200MB = async (file, user, onUploadProgress) => {
  const { data: urlUpload } = await axios.post(
    "/api/cloudflare/uploads",
    {},
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      }
    }
  );

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_file", true);
  formData.append("creator", user.id);
  await axios.post(urlUpload.uploadURL, formData,{onUploadProgress});
  // crear el archivo en wordpress
};

function MediaLibraryVideoUpload({ setTab, user, mutate }) {
  const [files, setFiles] = useState([]);
  const [progressInfos, setProgressInfos] = useState([]);
  const [errorInfo, setErrorInfo] = useState("");

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
      id: idx
    }));

    setProgressInfos(infoProgress);

    const newFile = filterAcceptedFiles.map( async (file, index) => {
      await videoLessThan200MB(file, user, (event) => {
        const cloneProgress = infoProgress.map(x=>x);
        cloneProgress[index].progress = Math.round(
          (100 * event.loaded) / event.total
        );
        setProgressInfos(cloneProgress);
      });
    });
    axios.all(newFile).then(async ()=>{
      setTab('media_library')
      await mutate()
      setProgressInfos([])
    })
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
            <Progress  animated value={file.progress} />
          </div>
        ))}
    </>
  );
}

export default MediaLibraryVideoUpload;
