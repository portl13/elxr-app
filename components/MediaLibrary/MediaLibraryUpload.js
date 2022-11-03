import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { Progress } from "reactstrap";
const mediaUrl = `${process.env.baseUrl}/wp-json/wp/v2/media`;

const defaultUpload = async (file, setProgress, token) => {
  const formData = new FormData();
  formData.append("file", file);

  await axios.post(mediaUrl, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      let percentage = Math.floor((loaded * 100) / total);
      setProgress(percentage);
    },
  });
};

function MediaLibraryUpload({
  token,
  mutate,
  setTab,
  mediaHandlerUpload = null,
}) {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback(async (acceptedFiles) => {
    setFile(acceptedFiles[0]);
    if (!mediaHandlerUpload) {
      await defaultUpload(acceptedFiles[0], setProgress, token);
    }
    if (mediaHandlerUpload) {
      await mediaHandlerUpload(acceptedFiles[0], setProgress, token);
    }
    setTimeout(() => {
      setProgress(0);
      setFile(null);
      mutate();
      setTab("media_library");
    }, 2000);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

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
      {file && (
        <div className="mt-2">
          <h5 className="col-9">{file && file.name}</h5>
          <div>
            <Progress animated color="primary" striped value={progress} />
          </div>
        </div>
      )}
    </>
  );
}

export default MediaLibraryUpload;
