import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import { Button, Progress, Alert } from 'reactstrap';
import React, { useEffect, useState, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import useIcon from '../../hooks/useIcon';
import {
    CloseButton,
    DropZoneStyle,
    thumbsContainer,
    thumb,
    thumbCover,
    thumbInner,
    thumbImg,
    activeStyle,
    acceptStyle,
    rejectStyle
} from '../profile-edit/profile-edit.style';

const CommunityDropZone = ({ user, group, type, value, action }) => {

    const baseApi = process.env.bossApi;

    const styleThumb = action === 'bp_cover_image_upload' ? thumbCover : thumb;

    const { iconElement: close } = useIcon(faWindowClose, false, 'sm');

    const [files, setFiles] = useState([]);
    const [file, setFile] = useState(null)
    const [progress, setProgress] = useState(0)
    const [visible, setVisible] = useState(false)
    const onDismiss = () => setVisible(false);

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        accept: 'image/*',
        maxFiles: 1,
        onDrop: acceptedFiles => {

            setFile(acceptedFiles[0])

            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));


        }
    });

    const cleanFile = () => {
        setFiles([]);
        setFile(null);
        setProgress(0);
    }

    const sendFiles = async (file) => {

        const body = new FormData()

        body.append('file', file, file.name);
        body.append('action', action);

        const url = `${baseApi}/groups/${group}/${type}`;

        try {
            const { data } = await Axios.post(url, body,
                {
                    headers: { 'Authorization': `Bearer ${user.token}` },
                    onUploadProgress: function (progressEvent) {

                        const { loaded, total } = progressEvent;

                        const percentage = Math.floor((loaded * 100) / total);

                        setProgress(percentage);

                    }
                }
            )
            cleanFile();
        } catch (error) {
            setVisible(true);
        }
    }

    const thumbs = files.map(file => (
        <div style={styleThumb} key={file.name}>
            <Button
                onClick={() => cleanFile()}
                css={CloseButton}
                className="btn-icon btn-2"
                color="primary"
                type="button">
                <span className="btn-inner--icon">
                    <i>{close}</i>
                </span>
            </Button>
            <div style={thumbInner}>
                <div className='loading-container'>
                    {progress !== 0 && <Progress max="100" value={progress} color="danger" />}
                </div>
                <img
                    src={file.preview}
                    style={thumbImg}
                />
            </div>
        </div>
    ));

    useEffect(() => () => {
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    const style = useMemo(() => ({
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    return (
        <>
            <Alert color="warning" isOpen={visible} toggle={onDismiss}>
                Error when uploading the file try again
            </Alert>
            <section css={DropZoneStyle} className="container">
                <div {...getRootProps({ style, className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
                <aside style={thumbsContainer}>
                    {thumbs}
                </aside>
                {file && <button
                    onClick={() => sendFiles(file)}
                    className="btn btn-primary">{value}</button>}
            </section>
        </>
    );
}

export default CommunityDropZone;
