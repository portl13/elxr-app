import React, { useState, useMemo } from 'react'
import { Button, Progress } from 'reactstrap'
import Cropper from 'react-cropper'
import { useAlert } from 'react-alert'

import { TIMEOUT, imageUrl } from '../../../utils/constant'
import { useDropzone } from 'react-dropzone'
import {
  DropZoneStyle,
  thumbsContainer,
  activeStyle,
  acceptStyle,
  rejectStyle,
} from '../../../components/profile-edit/profile-edit.style'
import { SubNav } from '../../../components/livefeed/livefeed.style'
import { setResolution, dataURLtoFile } from '../../../utils/setResolution'
import { updatePhotos, deleteGroupAvatar } from '../../api/group.api'
import Loader from '../../../components/loader'
import 'cropperjs/dist/cropper.css'

const Photos = ({ groupDetails, status, fetchGroupDetals, id, user }) => {
  const alert = useAlert()
  const [result, setResult] = useState(false)
  const [delMsg, setDelMsg] = useState(false)
  const [imageStatus, setImageStatus] = useState('upload')
  const [upload, setUpload] = useState(false)
  const [files, setFiles] = useState([])
  const [file, setFile] = useState(null)
  const [spiner, setSpiner] = useState(false)
  const [showUpload, setShowUpload] = useState(false)
  const [cropper, setCropper] = useState()
  const [imgSrc, setImgSrc] = useState(null)
  const [showDelUpload, setDelShowUpload] = useState(false)
  const TYPE = status === 'photo' ? 'avatar' : 'cover'

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: 'image/*',
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const image = await setResolution(acceptedFiles[0])
      let dataUrl = [...files]
      for (let i = 0; i < acceptedFiles.length; i++) {
        let val = await setResolution(acceptedFiles[i])
        dataUrl = [
          ...dataUrl,
          {
            preview: URL.createObjectURL(val),
          },
        ]
      }
      image['path'] = image.name
      image['preview'] = URL.createObjectURL(image)
      setFile(image)
      setFiles(dataUrl)
      setShowUpload(true)
      setTimeout(() => showProgress(), 1000)
    },
  })
  const style = useMemo(
    () => ({
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  )
  const thumbs = (
    <div className="progress-bar-div">
      {file?.name}
      <Progress value="100" color="success" />
    </div>
  )

  const deleteButton = () => {
    setImageStatus('delete')
    setResult(false)
    setImgSrc(null)
  }

  const uploadImageTab = () => {
    setImageStatus('upload')
    setResult(false)
    setDelMsg(false)
    setUpload(false)
    setShowUpload(false)
    setImgSrc(null)
  }
  const showProgress = () => {
    setUpload(true)
    setShowUpload(false)
  }

  const cropAndUpdate = async (blob) => {
    const newFile = dataURLtoFile(blob.url, 'capture.jpeg')
    const image = await setResolution(newFile)
    const body = new FormData()
    body.append('file', image)
    body.append(
      'action',
      status === 'photo' ? 'bp_avatar_upload' : 'bp_cover_image_upload'
    )
    updatePhotos(user, body, id, TYPE)
      .then(() => {
        fetchGroupDetals(id)
        setResult(true)
        setImageStatus('')
        setSpiner(false)
      })
      .catch(() => {
        alert.error(`Error occured while updating group ${status}`, TIMEOUT)
      })
  }

  const sendFiles = () => {
    const cropUrl =
      imageStatus === 'upload'
        ? `${cropper.getCroppedCanvas().toDataURL()}`
        : `${imgSrc}`

    fetch(cropUrl)
      .then((res) => res)
      .then(cropAndUpdate)
  }
  function deleteAvatar() {
    setDelShowUpload(true)
    deleteGroupAvatar(user, id, TYPE)
      .then(() => {
        setDelShowUpload(false)
        fetchGroupDetals(id)
        setImageStatus('')
        setDelMsg(true)
      })
      .catch(() => {
        setDelShowUpload(false)
        alert.error(`Error occured while deleting group ${status}`, TIMEOUT)
      })
  }
  const GROUP_NAME = status === 'photo' ? 'profile' : 'cover'
  return (
    <div className="main-wrapper border-0 manage-photos-panel">
      <>
        <div className="item-upload-section px-0">
          {status === 'cover' ? (
            <p className="group-heading-text mt-4">
              The Cover Photo will be used to customize the header of your
              group.
            </p>
          ) : null}
          <section css={DropZoneStyle} className="container">
            <SubNav>
              <ul>
                <li className={imageStatus === 'upload' ? 'active' : ' '}>
                  <Button type="button" onClick={() => uploadImageTab()}>
                    Upload
                  </Button>
                </li>
                {status === 'photo' ? (
                  groupDetails?.avatar_urls?.full === imageUrl ? null : (
                    <li className={imageStatus === 'delete' ? 'active' : ' '}>
                      <Button type="button" onClick={() => deleteButton()}>
                        Delete
                      </Button>
                    </li>
                  )
                ) : null}

                {status === 'cover' ? (
                  groupDetails?.cover_url === '' ? null : (
                    <li className={imageStatus === 'delete' ? 'active' : ' '}>
                      <Button type="button" onClick={() => deleteButton()}>
                        Delete
                      </Button>
                    </li>
                  )
                ) : null}
              </ul>
            </SubNav>

            {imageStatus === 'upload' && !upload && (
              <div {...getRootProps({ style, className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>Drop your image here</p>
                <input
                  id="browse-button"
                  type="button"
                  value="Select your file"
                  className="btn btn-default"
                ></input>
              </div>
            )}
            {showUpload && <aside style={thumbsContainer}>{thumbs}</aside>}

            {upload && file && imageStatus === 'upload' && (
              <div className="profile-image-cropper">
                <Cropper
                  className="cropper-panel"
                  zoomTo={0.5}
                  initialAspectRatio={1}
                  preview=".img-preview"
                  src={file.preview}
                  viewMode={1}
                  minCropBoxHeight={200}
                  minCropBoxWidth={200}
                  background={false}
                  responsive={true}
                  autoCropArea={1}
                  checkOrientation={false}
                  onInitialized={(instance) => {
                    setCropper(instance)
                  }}
                  guides={true}
                />
                <div className="box" style={{ width: '50%', float: 'right' }}>
                  <div
                    className="img-preview"
                    style={{ width: '100%', float: 'left', height: '200px' }}
                  />
                  <div className="button-section">
                    <Button
                      onClick={() => {
                        sendFiles()
                        setSpiner(true)
                      }}
                      className="btn btn-primary"
                    >
                      Crop Photo
                      {spiner ? <Loader /> : ''}
                    </Button>
                    <Button
                      className="cancel-button"
                      onClick={() => {
                        setUpload(false)
                        setShowUpload(false)
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            )}
            {imageStatus === 'upload' && (
              <p className="message-text">
                {status === 'photo'
                  ? "If you'd like to delete the existing profile photo but not upload a new one, please use the delete tab."
                  : 'For best results, upload an image that is 1950px by 450px or larger.'}
              </p>
            )}
            {result ? (
              <div className="cover-image-status">
                <div className="uploader-progress mb-4">
                  <p id="cover-image-feedback" className="alert alert-success">
                    Your new group {GROUP_NAME} photo was uploaded successfully.
                  </p>
                </div>
              </div>
            ) : null}

            {delMsg ? (
              <div className="cover-image-status">
                <div className="uploader-progress mb-4">
                  <p id="cover-image-feedback" className="alert alert-success">
                    Your group {GROUP_NAME} photo was deleted successfully!
                  </p>
                </div>
              </div>
            ) : null}

            {imageStatus === 'delete' ? (
              <div id="delete-image-container">
                <p>
                  If you'd like to delete your current {GROUP_NAME} photo, use
                  the delete {GROUP_NAME} Photo button.
                </p>
                <button
                  type="button"
                  className="btn btn-primary"
                  id="delete-cover-image"
                  onClick={() => deleteAvatar()}
                >
                  Delete My Group {GROUP_NAME} Photo
                  {showDelUpload ? <Loader /> : ''}
                </button>
              </div>
            ) : null}
          </section>
        </div>
      </>
    </div>
  )
}

export default Photos
