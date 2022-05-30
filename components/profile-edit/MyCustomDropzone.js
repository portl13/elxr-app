import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import Axios from 'axios'
import { UserContext } from '../../context/UserContext'
import { Button, Progress, Alert } from 'reactstrap'
import React, {
  useEffect,
  useState,
  useMemo,
  useContext,
  useCallback,
} from 'react'
import Webcam from 'react-webcam'
import { useDropzone } from 'react-dropzone'
import { setResolution, dataURLtoFile } from '../../utils/setResolution'
import {
  DropZoneStyle,
  thumbsContainer,
  thumb,
  activeStyle,
  acceptStyle,
  rejectStyle,
} from './profile-edit.style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SubNav } from '../../components/livefeed/livefeed.style'
import Loader from '../../components/loader'
const MyCustomDropzone = ({
  userDetail,
  type,
  value,
  action,
  delAction,
  parentCallback,
}) => {
  const { user, setUser } = useContext(UserContext)
  const [userData, setUserData] = useState()
  const [files, setFiles] = useState([])
  const [file, setFile] = useState(null)
  const [cropper, setCropper] = useState()
  const [visible, setVisible] = useState(false)
  const onDismiss = () => setVisible(false)
  const [status, setStatus] = useState('upload')
  const [result, setResult] = useState(false)
  const [delMsg, setDelMsg] = useState(false)
  const [data, setData] = useState()
  const [upload, setUpload] = useState(false)
  const [showUpload, setShowUpload] = useState(false)
  const webcamRef = React.useRef(null)
  const [imgSrc, setImgSrc] = useState(null)
  const [captureImage, setCaptureImage] = useState(false)
  const [cropLoad, setCropLoad] = useState(false)
  const baseApi = process.env.bossApi
  const profile = process.env.bossApi + '/members/'
  function getUser(state) {
    Axios.get(profile + user.id, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }).then((res) => {
      setUserData(res.data)
      if (state) {
        let memberData = { ...user }
        memberData.avatar_urls = res.data.avatar_urls
        setUser(memberData)
      }
    })
  }
  useEffect(() => getUser(), [])
  function showProgress() {
    setUpload(true)
  }
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

  const cropAndUpload = async (blob) => {
    const newFile = dataURLtoFile(blob.url, 'capture.jpeg')
    const image = await setResolution(newFile)
    const body = new FormData()
    body.append('file', image)
    body.append('action', action)
    const url = `${baseApi}/members/${userDetail.id}/${type}`
    const { data } = Axios.post(url, body, {
      headers: { Authorization: `Bearer ${user.token}` },
    })
      .then((res) => {
        setResult(true)
        getUser(true)
        setCropLoad(false)
        setStatus('')
        delAction && parentCallback(res.data)
      })
      .catch((err) => {
        setCropLoad(false)
        setVisible(true)
      })
  }

  const sendFiles = () => {
    setCropLoad(true)
    const cropUrl =
      status === 'upload'
        ? `${cropper.getCroppedCanvas().toDataURL()}`
        : `${imgSrc}`
    fetch(cropUrl)
      .then((res) => res)
      .then(cropAndUpload)
  }
  const thumbs = (
    <div className="progress-bar-div">
      {file?.name}
      <Progress value="100" color="success" />
    </div>
  )
  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview))
    },
    [files]
  )
  const style = useMemo(
    () => ({
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  )
  function deleteAvatar() {
    Axios.delete(`${baseApi}/members/${userDetail.id}/${type}`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }).then((res) => {
      setData(res.data)
      getUser()
      setStatus('')
      setDelMsg(true)
    })
  }
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot()
    setImgSrc(imageSrc)
  }, [webcamRef, setImgSrc])

  return (
    <>
      <Alert color="warning" isOpen={visible} toggle={onDismiss}>
        An error occured while uploading the image.
      </Alert>
      <section css={DropZoneStyle} className="container">
        {delAction !== true && type === 'avatar' && (
          <div className="file-info">
            <FontAwesomeIcon icon={faInfoCircle} />
            Your profile photo will be used on your profile and throughout the
            site.
          </div>
        )}
        {type === 'cover' && (
          <div className="file-info">
            <FontAwesomeIcon icon={faInfoCircle} />
            Your Cover Photo will be used to customize the header of your
            profile.
          </div>
        )}
        {type === 'avatar' ? (
          <SubNav>
            <ul>
              <li className={status === 'upload' ? 'active' : ' '}>
                <Button
                  type="button"
                  onClick={() => {
                    setStatus('upload')
                    setResult(false)
                    setDelMsg(false)
                    setUpload(false)
                    setShowUpload(false)
                    setImgSrc(null)
                    setCaptureImage(false)
                    setVisible(false)
                  }}
                >
                  Upload
                </Button>
              </li>
              <li className={status === 'takephoto' ? 'active' : ' '}>
                <Button
                  type="button"
                  onClick={() => {
                    setStatus('takephoto')
                    setResult(false)
                    setDelMsg(false)
                    setImgSrc(null)
                    setCaptureImage(false)
                    setVisible(false)
                  }}
                >
                  Take Photo
                </Button>
              </li>
              {delAction === true ? null : userData?.avatar_urls?.thumb ===
                'https://data.portl.live/wp-content/plugins/buddyboss-platform/bp-core/images/mystery-man.jpg' ? null : (
                <li className={status === 'delete' ? 'active' : ' '}>
                  <Button
                    type="button"
                    onClick={() => {
                      setStatus('delete')
                      setResult(false)
                      setImgSrc(null)
                      setCaptureImage(false)
                      setVisible(false)
                    }}
                  >
                    Delete
                  </Button>
                </li>
              )}
            </ul>
          </SubNav>
        ) : null}
        {type === 'cover' ? (
          <SubNav>
            <ul>
              <li className={status === 'upload' ? 'active' : ' '}>
                <Button
                  type="button"
                  onClick={() => {
                    setStatus('upload')
                    setResult(false)
                    setDelMsg(false)
                    setUpload(false)
                    setShowUpload(false)
                    setVisible(false)
                  }}
                >
                  Upload
                </Button>
              </li>
              {userData?.cover_url === false ? null : (
                <li className={status === 'delete' ? 'active' : ' '}>
                  <Button
                    type="button"
                    onClick={() => {
                      setStatus('delete')
                      setResult(false)
                      setVisible(false)
                    }}
                  >
                    Delete
                  </Button>
                </li>
              )}
            </ul>
          </SubNav>
        ) : null}
        {status === 'takephoto' ? (
          <div className="take-photo-panel">
            <div className="upper-section">
              <div className="photo-panel">
                <Webcam
                  audio={false}
                  height={300}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width={400}
                />
              </div>
              <div className="capture-panel">
                <div className="capture-section">
                  {imgSrc && <img src={imgSrc} />}
                </div>
                <div className="button-section">
                  <button
                    onClick={() => {
                      capture()
                      setCaptureImage(true)
                    }}
                  >
                    Capture
                  </button>
                  <button onClick={() => sendFiles()}>Save</button>
                </div>
              </div>
            </div>
            <div className="alert alert-warning">
              {captureImage === false
                ? 'Camera loaded. Click Capture to take a photo.'
                : 'Your profile photo is ready. Click Save to use this photo.'}{' '}
            </div>
          </div>
        ) : null}
        {status === 'upload' && upload === false ? (
          <>
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
            {delAction === true ? null : (
              <div className="alert alert-warning">
                {type === 'avatar'
                  ? "If you'd like to delete the existing profile photo but not upload a new one, please use the delete tab."
                  : 'For best results, upload an image that is 1950px by 450px or larger.'}
              </div>
            )}
            {showUpload && <aside style={thumbsContainer}>{thumbs}</aside>}
          </>
        ) : null}
        {upload && file && status === 'upload' && (
          <div className="profile-image-cropper">
            <Cropper
              className="cropper-panel"
              zoomTo={0.5}
              initialAspectRatio={1}
              preview=".img-preview"
              src={file.preview}
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
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
                <button onClick={() => sendFiles()} className="btn btn-primary">
                  Crop Photo {cropLoad ? <Loader /> : ''}
                </button>
                <button
                  className="cancel-button"
                  onClick={() => {
                    setUpload(false)
                    setShowUpload(false)
                    setVisible(false)
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {result === true ? (
          <div className="cover-image-status">
            <div className="uploader-progress mb-4">
              <p id="cover-image-feedback" className="alert alert-success">
                Your new {type === 'avatar' ? 'profile' : 'cover'} photo was
                uploaded successfully.
              </p>
            </div>
          </div>
        ) : null}
        {delMsg === true ? (
          <div className="cover-image-status">
            <div className="uploader-progress mb-4">
              <p id="cover-image-feedback" className="alert alert-success">
                Your {type === 'avatar' ? 'profile' : 'cover'} photo was deleted
                successfully!
              </p>
            </div>
          </div>
        ) : null}
        {status === 'delete' ? (
          <div id="delete-image-container">
            <p>
              If you'd like to delete your current{' '}
              {type === 'avatar' ? 'profile' : 'cover'} photo, use the delete{' '}
              {type === 'avatar' ? 'profile' : 'cover'} Photo button.
            </p>
            <button
              type="button"
              className="btn btn-primary"
              id="delete-cover-image"
              onClick={() => deleteAvatar()}
            >
              Delete My {type === 'avatar' ? 'profile' : 'cover'} Photo
            </button>
          </div>
        ) : null}
      </section>
    </>
  )
}
export default MyCustomDropzone
