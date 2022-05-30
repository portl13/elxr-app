import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { Progress } from 'reactstrap';

export default function ProfileDropzone({ user, setUser }) {

    const avatarDefault = '/img/avatar.jpg'
    const [file, setFile] = useState(null)
    const [files, setFiles] = useState([]);
    const [progress, setProgress] = useState(0)
    const [uploadSuccess, setUploadSuccess] = useState({preview: avatarDefault})
    const [color, setColor] = useState('danger')
    const baseApi = process.env.bossApi

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

    const style = useMemo(() => ({
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    const cleanFile = () => {
        setProgress(0);
        setFile(null)
    }

    const sendFiles = async (file) => {

        const body = new FormData()

        body.append('file', file, file.name);
        body.append('action', 'bp_avatar_upload');

        const url = `${baseApi}/members/${user.id}/avatar`;

        try {
            const { data } = await axios.post(url, body,
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
            setUploadSuccess({preview:data.full})
            setUser({
                ...user,
                avatar_urls: data
            })
        } catch (error) {
            setVisible(true);
        }
    }

    useEffect(() => {
        if(progress === 100){
            setColor('success')
        }
    }, [progress])

    useEffect(() => () => {
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    useEffect(()=>{
        if(user?.avatar_urls?.thumb){
            setUploadSuccess({ preview: user.avatar_urls.thumb })
        }
    },[user])

    return (
        <div style={{marginTop:'20px'}}>

            {!file && uploadSuccess && (
                <img
                    style={{
                        width: 80,
                        height: 80,
                        objectFit: 'cover'
                    }}
                    src={uploadSuccess.preview}
                    className="avatar"
                />
            )}

            { file && (
                    <img
                        style={{
                            width: 80,
                            height: 80,
                            objectFit: 'cover'
                        }}
                        src={file.preview}
                        className="avatar"
                    />
                )}
            <div
                style={{
                    width: '50%',
                    margin: ' 15px auto 15px'
                }}

                className='loading-container'>
                {progress !== 0 && <Progress max="100" value={progress} color={color} />}
            </div>
            <div {...getRootProps({ style, className: 'dropzone' })}>
                
                {file ? <>
                    <button
                        onClick={() => sendFiles(file)}
                        className="btn btn-sm btn-primary">Upload</button>
                    <button
                        onClick={() => cleanFile()}
                        className="btn btn-sm btn-secundary">Cancel</button>
                </> : <>
                
                <input {...getInputProps()} />
                <p style={{cursor: 'pointer', margin: 0}}>Add Profile Picture</p>
                
                </>
                }
            </div>
        </div>
    )
}
