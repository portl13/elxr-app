import React, { useState } from "react";
import { Button, Modal, ModalBody, Spinner, Input, Alert } from "reactstrap";
import { uploadModal } from "../../components/livefeed/photo.style";
import { addImage } from "../../pages/api/channel.api";
function UploadAllfiles({
    show,
    setUploadImage,
    user,
    setPicture,
    setImageSpinner,
    value,
    status,
    setPictureUrl,
    upload
}) {
    const [image, setImage] = useState();
    const [spin, setSpin] = useState(false);
    const [showUpload, setShowUpload] = useState("");
    function onFormSubmit(e) {
        e.preventDefault();
        setSpin(true);
        setImageSpinner(true);
        fileUpload(image).then((res) => {
            if (status) {
                setPicture(res.data)
            }
            else {
                setPictureUrl(res.data.url);
                setPicture(image.name);
            }

            setSpin(false);
            setUploadImage(false);
        });
    }
    function fileUpload(file) {
        const formData = new FormData();
        formData.append("image", file);
        return addImage(user, formData);
    }
    return (
        <>
            <Modal
                className="modal-dialog-centered modal-sm upload-modal-dialog"
                isOpen={show}
                css={uploadModal}
            >
                <ModalBody>
                    <h4>Upload {value} Image</h4>
                    <div className="upload-input-tag">
                        <Input
                            type="file"
                            onChange={(e) => {
                                setImage(e.target.files[0]);
                                setShowUpload(e.target.files[0]
                                );

                            }}
                        />

                    </div>
                    {showUpload === false && <Alert color="danger">Invalid file Format. Chosen file format is not supported.</Alert>}
                    <div className="btn-section">
                        <Button
                            color="secondary-text"
                            className="cancel-btn"
                            onClick={() => {
                                setUploadImage(false);
                                setImageSpinner(false);
                            }}
                        >
                            Cancel
                        </Button>
                        {showUpload && (
                            <Button className="upload-btn" onClick={(e) => onFormSubmit(e)}>
                                {spin && (
                                    <Spinner style={{ width: "1.2rem", height: "1.2rem" }} />
                                )}
                                {""}Upload
                            </Button>
                        )}
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
}
export default UploadAllfiles;
