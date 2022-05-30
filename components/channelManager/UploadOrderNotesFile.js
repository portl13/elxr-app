import React, { useState } from "react";
import { Button, Modal, ModalBody, Spinner, Input } from "reactstrap";
import { uploadModal } from "../../components/livefeed/photo.style";
import { addDownload } from "../../pages/api/channel.api";
import { useAlert } from "react-alert";
import { Alert } from "reactstrap";

function UploadOrderNotesFile({
  show,
  setShowDownload,
  user,
  name,
  fileUrl,
  setFileUrl,
  response,
  setResponse,
  mergeData,
  getImageUrl,
  getImageFile
}) {
  const alert = useAlert();
  const [image, setImage] = useState();
  const [spin, setSpin] = useState(false);
  const [showUpload, setShowUpload] = useState("");
  function onFormSubmit(e) {
    e.preventDefault(); //Stop form submit
    setSpin(true);
    fileUpload(image).then((res) => {
      setSpin(false);
      getImageUrl(res.data.file);
      getImageFile(res.data.file)
      setShowDownload(false);
      mergeData(res.data);
    });
  }
  function fileUpload(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    return addDownload(user, formData);
  }
  return (
    <>
      <Modal
        className="modal-dialog-centered modal-sm upload-modal-dialog"
        isOpen={show}
        css={uploadModal}
      >
        <ModalBody>
          <h4>Upload Downloadable</h4>
          <div className="upload-input-tag">
            <Input
              type="file"
              accept= "image/*, .gif, .pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, .docx, .doc"
              onChange={(e) => {
                setImage(e.target.files[0]);
                setShowUpload(e.target.files[0].type.includes("image")
                || (e.target.files[0].type.includes("pdf"))
                || (e.target.files[0].type.includes("application/msword"))
                || (e.target.files[0].type.includes("gif")) 
                || (e.target.files[0].type.includes("application/vnd.openxmlformats-officedocument.wordprocessingml.document"))
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
                setShowDownload(false);
              }}
            >
              Cancel
            </Button>
            <Button className="upload-btn" onClick={(e) => onFormSubmit(e)}>
              {spin && (
                <Spinner style={{ width: "1.2rem", height: "1.2rem" }} />
              )}
              {""}Upload
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}


export default UploadOrderNotesFile;