import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'
const mediaUrl = `${process.env.baseUrl}/wp-json/wp/v2/media`

function MediaLibraryUpload({ token }) {
  const onDrop = useCallback(async (acceptedFiles) => {

  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

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
      <div></div>
    </>
  )
}

export default MediaLibraryUpload
