import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import { EditorState } from 'draft-js'
import { Button, Progress, Input, Alert, Modal, ModalBody } from 'reactstrap'
import { useAlert } from 'react-alert'
import { useDropzone } from 'react-dropzone'

import { TIMEOUT } from '@utils/constant'
import Loader from '../loader'
import PostLiveFeed from '../postLiveFeed'
import { updateActivity } from '@api/feeds.api'
import {
  CloseButton,
  thumb,
  thumbInner,
  thumbImg,
  activeStyle,
  acceptStyle,
  rejectStyle,
} from '@components/profile-edit/profile-edit.style'
import { SubNav } from './livefeed.style'

function EditPost({
  activityList,
  isFeedWrapper,
  showProfileGroup,
  setActivityList,
  user,
  activity,
  setShowEdit,
  uploadModal,
  showEdit,
  setMoreOption,
}) {
  const [loader, setLoader] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [file, setFile] = useState(null)
  const [files, setFiles] = useState([])
  const [progress, setProgress] = useState(0)
  const [showImage, setShowImage] = useState(false)
  const [imageData, setImageData] = useState([])
  const [contentHtml, setContentHtml] = useState()
  const [group, setGroup] = useState('public')
  const [empty, setEmpty] = useState(false)
  const [profileGroup, setProfileGroup] = useState()

  const [linkLoader, setLinkLoader] = useState(false)
  const [linkPreview, setLinkPreview] = useState(false)
  const [preview, setPreview] = useState(false)

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  )
  const alert = useAlert()
  useEffect(() => {
    if (activity) {
      const { content, privacy, bp_media_ids, component } = activity
      setContentHtml(content?.rendered)
      setGroup(privacy)
      setProfileGroup(component)
      if (bp_media_ids && bp_media_ids.length) {
        setShowImage(true)
        const imageId = []
        setFiles(
          bp_media_ids.map((e, i) => {
            imageId.push(e.attachment_id)
            return {
              name: `uploaded-image-${i}`,
              preview: e.attachment_data.activity_thumb,
              attachment_id: e.attachment_id,
            }
          })
        )
        setImageData([...imageData, ...imageId])
      }
    }
  }, [activity])
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: 'image/*',
    maxFiles: 0,
    multiple: true,
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles)
      const allFile = acceptedFiles.map((filedata) =>
        Object.assign(filedata, {
          preview: URL.createObjectURL(filedata),
        })
      )
      setFiles([...files, ...allFile])
      setProgress(0)
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
  const image = () => {
    if (showImage === true) {
      setShowImage(false)
      setShowButton(false)
    } else {
      setShowImage(true)
      setShowButton(true)
    }
  }
  const createActivity = (images) => {
    const formData = {
      privacy: group,
      component: profileGroup,
      type: 'activity_update',
      user_id: user.id,
      primary_item_id: activity.primary_item_id,
      content: contentHtml,
    }
    if (images?.length) formData['bp_media_ids'] = images
    updateActivity(user, formData, activity.id)
      .then((res) => {
        let data = [...activityList]
        let index = activityList.findIndex((item) => item.id === activity.id)
        data[index] = res.data
        setActivityList(data)
        emptyStates()
      })
      .catch(({ response }) => {
        if (response) alert.error(response.data.message, TIMEOUT)
        emptyStates()
      })
  }
  const emptyStates = () => {
    setLoader(false)
    setShowEdit(false)
    setShowImage(false)
    setFiles([])
    setFile(null)
    setImageData([])
    setProgress(0)
    setContentHtml()
    setShowButton(false)
    setProfileGroup()
    setEditorState(() => EditorState.createEmpty())
  }
  const sendFiles = () => {
    file.map((filedata, key) => {
      if (!filedata.attachment_id) {
        const body = new FormData()
        body.append('file', filedata, filedata.name)
        const baseApi = process.env.bossApi
        const url = `${baseApi}/media/upload`
        axios
          .post(url, body, {
            headers: { Authorization: `Bearer ${user.token}` },
            onUploadProgress: function (progressEvent) {
              const { loaded, total } = progressEvent
              const percentage = Math.floor((loaded * 100) / total)
              setProgress(percentage)
            },
          })
          .then((res) => {
            setImageData((data) => [...data, res.data.upload_id])
          })
      }
    })
  }

  const handlerSubmit = (e) => {
    e.preventDefault()
    setMoreOption(false)
    if (!contentHtml && !imageData.length) {
      alert.error('Please add content to update.', TIMEOUT)
      return
    }
    setLoader(true)
    if (file?.length) sendFiles()
    else createActivity(imageData)
  }

  useEffect(() => {
    if (file && imageData?.length === files?.length) {
      createActivity(imageData)
    }
  }, [imageData])

  let styleThumb = thumb

  const cleanFile = (i) => {
    const image = [...files]
    const imageid = [...imageData]
    image.splice(i, 1)
    setFiles(image)
    imageid.splice(i, 1)
    setImageData(imageid)
    setProgress(0)
  }

  function getPreviewLink(childData) {
    setLinkPreview(false)
    setLinkLoader(true)
    axios(process.env.bossApi + `/activity/link-preview?url=${childData}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    })
      .then((res) => {
        setLinkPreview(true)
        setTitle(res.data.title)
        setLinkImage(
          res.data.images[0] === undefined
            ? ''
            : res.data.images[0].replace(/^https:/, '')
        )
        setDescription(res.data.description)
        setLinkLoader(false)
      })
      .catch(() => {
        setLinkLoader(false)
        setPreview(true)
        setTimeout(() => {
          setPreview(false)
        }, 1500)
      })
  }

  const thumbs = files.map((file, i) => (
    <div style={styleThumb} key={file.name}>
      <Button
        onClick={() => cleanFile(i)}
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
        {!file.attachment_id ? (
          <div className="loading-container">
            {progress !== 0 && (
              <Progress max="100" value={progress} color="success" />
            )}
          </div>
        ) : (
          ''
        )}
        <img src={file.preview} style={thumbImg} />
      </div>
    </div>
  ))
  return (
    <>
      <Modal
        className="modal-dialog-centered"
        isOpen={showEdit}
        css={uploadModal}
      >
        <ModalBody className="text-center edit-feed-modal">
          <div className="d-flex flex-column flex-fill">
            <PostLiveFeed
              editorState={editorState}
              setContentHtml={setContentHtml}
              getRootProps={getRootProps}
              getInputProps={getInputProps}
              thumbs={thumbs}
              file={file}
              progress={progress}
              setEditorState={setEditorState}
              showImage={showImage}
              image={image}
              setEmpty={setEmpty}
              setArea={setShowButton}
              style={style}
              user={user}
              placeholderText={'Share something with this group...'}
              emptyStates={emptyStates}
              handlerSubmit={handlerSubmit}
              showButton={showButton}
              isLiveFeed={true}
              activity={activity}
              isFeedWrapper={isFeedWrapper}
              getPreviewLink={getPreviewLink}
              preview={preview}
              linkPreview={linkPreview}
              linkLoader={linkLoader}
            />
            <SubNav className="mt-2">
              <ul className="pb-2">
                {showProfileGroup && (
                  <li className="w-auto px-3">
                    <Input
                      type="select"
                      onChange={(e) => setProfileGroup(e.target.value)}
                      id="group"
                      value={profileGroup}
                    >
                      {profileGroup === 'groups' ? (
                        <option value="groups">Post in : Group</option>
                      ) : (
                        <option value="profile">Post in: Profile</option>
                      )}
                    </Input>
                  </li>
                )}
                {!isFeedWrapper && (
                  <li className="w-auto px-3">
                    <Input
                      id="privacy"
                      type="select"
                      name="privacy"
                      onChange={(e) => setGroup(e.target.value)}
                      value={group}
                    >
                      <option value="public">Public</option>
                      <option value="loggedin">All Members</option>
                      <option value="friends">My Connections</option>
                      <option value="onlyme">Only Me</option>
                    </Input>
                  </li>
                )}
              </ul>
              <Button
                className="btn btn-link ml-auto"
                onClick={() => {
                  setShowEdit(false)
                  setMoreOption(false)
                }}
              >
                {' '}
                Cancel
              </Button>

              <Button
                className="btn btn-primary"
                onClick={(e) => handlerSubmit(e)}
              >
                Update Post {loader ? <Loader /> : ''}
              </Button>
            </SubNav>
          </div>
        </ModalBody>
      </Modal>
    </>
  )
}

export default EditPost
