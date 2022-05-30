import React, { useState, useMemo } from "react";
import {
    uploadModal,
} from "../../components/livefeed/photo.style";
import {
    Button,
    Input,
    FormGroup,
    Modal, ModalBody, ModalHeader, Progress, ModalFooter, Label, Alert
} from 'reactstrap';
import { useDropzone } from 'react-dropzone';
import axios from "axios"
import {
    CloseButton,
    DropZoneStyle,
    thumbsContainer,
    thumb,
    thumbInner,
    thumbImg,
    activeStyle,
    acceptStyle,
    rejectStyle
} from '../../components/profile-edit/profile-edit.style';
import useIcon from '../../hooks/useIcon';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import Loader from './loader'
function CreateAlbum({ user, parentCallback, isGroup, groupId, getAlbums }) {
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const [files, setFiles] = useState([]);
    const [addAlbum, setAddAlbum] = useState(false)
    const [selectFile, setSelectFile] = useState([])
    const [file, setFile] = useState(null)
    const [progress, setProgress] = useState(0)
    const [imageData, setImageData] = useState([])
    const [privacy, setPrivacy] = useState("public")
    const [count, setCount] = useState(0)
    const [finalUrl, setFinalUrl] = useState([])
    const [content, setContent] = useState("")
    const [visible, setVisible] = useState(false)
    const onDismiss = () => setVisible(false);
    const baseApi = process.env.bossApi;
    const { iconElement: close } = useIcon(faWindowClose, false, 'sm');
    const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject
    } = useDropzone({
        accept: 'image/*',
        maxFiles: 0,
        multiple: true,
        onDrop: acceptedFiles => {
            setSelectFile([...selectFile, ...acceptedFiles])
            const totalImage = [...selectFile, ...acceptedFiles]
            setFile(totalImage)
            const imageUrl = acceptedFiles.map(fileData => Object.assign(fileData, { preview: URL.createObjectURL(fileData) }))
            setFinalUrl([...finalUrl, ...imageUrl])
            const imageUrls = [...finalUrl, ...imageUrl]
            setFiles(imageUrls)
            setProgress(0)
        }
    });
    const style = useMemo(() => ({
        ...(isDragActive ? activeStyle : {}), ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [isDragActive, isDragReject, isDragAccept]);
    const sendFiles = () => {
        const arr = [...imageData]
        var counter = count
        file.map((fileData, key) => {
            const body = new FormData()
            body.append('file', fileData, fileData.name);
            const url = `${baseApi}/media/upload`;
            axios.post(url, body,
                {
                    headers: { 'Authorization': `Bearer ${user.token}` },
                    onUploadProgress: function (progressEvent) {
                        const { loaded, total } = progressEvent;
                        const percentage = Math.floor((loaded * 100) / total);
                        setProgress(percentage);
                    }
                })
                .then(res => {
                    arr.push(res.data.upload_id)
                    setCount(counter++)
                    setImageData(arr)
                    const formData = {
                        "upload_ids": arr,
                        "privacy": privacy,
                        "title": content
                    }
                    if (isGroup)
                        formData['group_id'] = groupId
                    files.length === counter ?
                        axios.post(baseApi + "/media/albums",
                            formData,
                            {
                                headers: { 'Authorization': `Bearer ${user.token}` }
                            })
                            .then(res => {
                                isGroup && getAlbums(1, true)
                                setShowModal(false)
                                parentCallback(res.data.album)
                                setFile(null)
                                setProgress(0)
                                setFiles([])
                                setImageData([])
                                setCount(0)
                                setSelectFile([])
                                setFinalUrl([])
                                setContent("")
                                setAddAlbum(false)
                            }) : null
                })
        })
    }
    const cleanFile = (i) => {
        files.splice(i, 1)
        setFiles(files);
        setProgress(0);
        setImageData([]);
    }
    let styleThumb = thumb;
    const thumbs = files.map((fileData, i) => (
        <div style={styleThumb} key={fileData.name}>
            <Button
                onClick={() => cleanFile(i)}
                css={CloseButton}
                className="btn-icon btn-2"
                color="primary"
                type="button">
                <span className="btn-inner--icon">
                    <i>{close}</i>
                </span>
            </Button>
            <div style={thumbInner}>
                <div className='loading-container'>{progress !== 0 && <Progress max="100" value={progress} color="success" />}</div>
                <img src={fileData.preview}
                    style={thumbImg} />
            </div>
        </div>
    ));
    function createAlbum() {
        const formData = {
            privacy: privacy,
            title: content,
        };
        if (isGroup) formData["group_id"] = groupId;
        axios.post(baseApi + "/media/albums", formData,
            {
                headers: { 'Authorization': `Bearer ${user.token}` }
            })
            .then(res => {
                setShowModal(false)
                isGroup && getAlbums(1, true)
                setContent("")
                setAddAlbum(false)
            })
    }
    function uploadAlbum() {
        if (content === "") {
            setVisible(true)
        }
        else if (files.length === 0) {
            setAddAlbum(true)
            createAlbum()
        }
        else {
            setAddAlbum(true)
            sendFiles()
        }
    }
    return (
        <>
            <Button onClick={handleShow} className="btn btn-outline-primary">+ Create Album</Button>
            <Modal
                className="modal-dialog-centered"
                css={uploadModal}
                isOpen={showModal}
                onHide={handleClose}
            >
                <ModalHeader closeButton>
                    <h5 className="modal-title">Create Album</h5>
                    <button
                        aria-label="Close"
                        className="close"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => {
                            setShowModal(false)
                            setFile(null)
                            setFiles([])
                            setImageData([])
                            setSelectFile([])
                            setFinalUrl([])
                            setContent("")
                        }}
                    ><span aria-hidden={true}>×</span></button>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label>Title</Label>
                        <Input
                            className="form-control"
                            type="text"
                            name="content"
                            placeholder="Enter Album Title"
                            id="content"
                            maxLength="50"
                            onChange={(e) => {
                                setContent(e.target.value)
                                setVisible(false)
                            }}
                        />
                        <Alert color="warning" isOpen={visible} toggle={onDismiss}>Title is required.</Alert>
                    </FormGroup>
                    <div className="upload-image-conatiner">
                        <section css={DropZoneStyle} className="container">
                            <div {...getRootProps({ style, className: 'dropzone' })}>
                                <input {...getInputProps()} />
                                <input id="browse-button" type="button" value="Select or Drop images here to upload" className="btn btn-default"></input>
                            </div>
                            <aside style={thumbsContainer}>
                                {thumbs}
                            </aside>
                        </section>
                    </div>
                </ModalBody>
                <ModalFooter className="profile-footer-panel">
                    <FormGroup>
                        <Input type="select"
                            onChange={(e) => setPrivacy(e.target.value)}
                        >
                            <option value="public">Public </option>
                            <option value="loggedin">All Members </option>
                            <option value="friends">My Connections </option>
                            <option value="onlyme">Only Me </option>
                        </Input>
                        <Button
                            className="upload-button"
                            onClick={() => uploadAlbum()}
                        >{addAlbum && <Loader />}Create Album</Button>
                    </FormGroup>
                </ModalFooter>
            </Modal>
        </>
    )
}
export default CreateAlbum
