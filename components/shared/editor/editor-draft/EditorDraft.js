import React, { useContext, useEffect, useState } from 'react'
import {
  EditorState,
  ContentState,
  convertToRaw,
  AtomicBlockUtils,
  convertFromHTML,
} from 'draft-js'
import dynamic from 'next/dynamic'
import draftToHtml from 'draftjs-to-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import { mediaBlockRenderer } from './MediaBlockRenderer'
import { convertToPlain, ToolbarStyle } from './utils-editor'
import { UserContext } from '@context/UserContext'
import MediaLibrary from '@components/MediaLibrary/MediaLibrary'
import { saveAs } from 'file-saver'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import CloseIcon from '@icons/CloseIcon'
import ReactPlayer from 'react-player'
//import Editor from 'react-draft-wysiwyg'
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
)

const AddMediaObject = ({ setOpen, setMediaType, mediaType, text }) => {
  const addMedia = () => {
    setMediaType(mediaType)
    setOpen(true)
  }

  return (
    <div className="rdw-option-wrapper" aria-selected="false" title={text}>
      <span onClick={addMedia}>{text}</span>
    </div>
  )
}

const AddEmbedVideo = ({ addMediaEditor }) => {
  const [url, setUrl] = useState('')
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setUrl('')
    setOpen(false)
  }

  const addMedia = () => {
    addMediaEditor('video', url)
    setOpen(false)
    setUrl('')
  }

  return (
    <>
      <div
        className="rdw-option-wrapper"
        aria-selected="false"
        title={'Embed Video'}
      >
        <span onClick={() => setOpen(true)}>{'Embed Video'}</span>
      </div>
      <Modal isOpen={open} toggle={() => handleClose()} centered={true}>
        <ModalHeader>
          <span>Add Video Url</span>
        </ModalHeader>
        <ModalBody>
          <div className="input-search mr-0 border-radius-35">
            <label className="w-100 upload-info mb-0">
              <div className="d-flex justify-content-between">
                <input
                  className="bg-transparent border-0 text-white w-100 mr-0"
                  type="text"
                  placeholder="Enter Video Url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
            </label>
          </div>
        </ModalBody>
        <ModalFooter>
          <button onClick={() => handleClose()} className="btn btn-primary">
            Cancel
          </button>
          <button onClick={addMedia} className="btn btn-primary">
            Save Video
          </button>
        </ModalFooter>
      </Modal>
    </>
  )
}

const EditorDraft = ({
  editorState,
  setEditorState,
  setContentHtml,
  editorVal,
}) => {
  const { user } = useContext(UserContext)
  const token = user?.token

  const [open, setOpen] = useState(false)
  const [mediaType, setMediaType] = useState('image')

  const htmlToDraft =
    typeof window === 'object' && require('html-to-draftjs').default
  const updateHtmlContent = () => {
    //let str = convertToPlain(editorVal).trim()

    if (editorVal) {
      const { contentBlocks, entityMap } = htmlToDraft(
        editorVal,
        (nodeName, node) => {
          if (nodeName === 'audio') {
            return {
              type: 'audio',
              mutability: 'MUTABLE',
              data: {
                src: node.src,
              },
            }
          }
          if (nodeName === 'img') {
            return {
              type: 'image',
              mutability: 'MUTABLE',
              data: {
                src: node.src,
              },
            }
          }
          if (nodeName === 'video') {
            return {
              type: 'video',
              mutability: 'MUTABLE',
              data: {
                src: node.src,
              },
            }
          }
        }
      )

      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      )

      setContentHtml(editorVal)
      const editorStateVal = EditorState.createWithContent(contentState)

      setEditorState(editorStateVal)
    }
  }
  useEffect(() => {
    editorVal && updateHtmlContent()
  }, [editorVal])

  const addMediaEditor = (mediaType, url) => {
    const entityKey = editorState
      .getCurrentContent()
      .createEntity(mediaType, 'MUTABLE', {
        src: url,
      })
      .getLastCreatedEntityKey()

    // NEW EDITOR STATE
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(
      editorState,
      entityKey,
      ' '
    )

    // SETSTATE
    setEditorState(newEditorState)
  }

  const selectMedia = (media) => {
    addMediaEditor(mediaType, media.source_url)
    setOpen(false)
  }

  const saveFile = () => {
    saveAs(
      'https://data.portl.live/wp-content/uploads/2022/07/kelly-1-4-2-1-1-1-1-3-2-1-1.jpg',
      'example.pdf'
    )
  }

  // add function download file by url
  const downloadFile = (url) => {
    const link = document.createElement('a')
    link.href = url
    link.download = 'file.pdf'
    link.click()
  }

  return (
    <>
      <Editor
        wrapperClassName="lesson-editor"
        customBlockRenderFunc={mediaBlockRenderer}
        customStyleMap={{
          audio: {
            backgroundColor: '#f0f0f0',
            padding: '10px',
            borderRadius: '5px',
            margin: '10px',
          },
        }}
        editorState={editorState}
        onEditorStateChange={setEditorState}
        onChange={() => {
          let data = convertToRaw(editorState.getCurrentContent())
          let draft = draftToHtml(data, null, null, (entity, text) => {
            if (entity.type === 'image') {
              return `<img class="w-100 d-block" src="${entity.data.src}" />`
            }
            if (entity.type === 'audio') {
              return `<audio controls src="${entity.data.src}"></audio>`
            }
            if (entity.type === 'video') {
              return `<div class="ratio ratio-16x9 pointer"><div style="width: 100%; height: 100%;"><video src="${entity.data.src}" preload="auto" controls="" style="width: 100%; height: 100%;"></video></div></div>`
            }
          })
          setContentHtml(draft + '<p></p>')
        }}
        editorStyle={{
          color: '#000',
          border: 'none',
          marginTop: '-10px',
          backgroundColor: '#f0f0f0',
          padding: '15px',
        }}
        toolbar={{
          ...ToolbarStyle,
        }}
        toolbarCustomButtons={[
          <AddMediaObject
            text="Add Image"
            mediaType={'image'}
            setOpen={setOpen}
            setMediaType={setMediaType}
          />,
          <AddMediaObject
            text="Add Video"
            mediaType={'video'}
            setOpen={setOpen}
            setMediaType={setMediaType}
          />,
          <AddMediaObject
            text="Add Audio"
            mediaType={'audio'}
            setOpen={setOpen}
            setMediaType={setMediaType}
          />,
        ]}
        toolbarStyle={{
          color: '#000',
          border: 'none',
          backgroundColor: '#fff',
          height: '40px',
        }}
      />
      {token && open && (
        <MediaLibrary
          token={token}
          show={open}
          onHide={() => setOpen(!open)}
          selectMedia={selectMedia}
          media_type={mediaType === 'doc' ? null : mediaType}
        />
      )}
    </>
  )
}
export default EditorDraft
