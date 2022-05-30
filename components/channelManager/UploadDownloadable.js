import React, { useState } from "react";
import { Button, Modal, ModalBody, Spinner, Input } from "reactstrap";
import { uploadModal } from "../../components/livefeed/photo.style";
import { addDownload } from "../../pages/api/channel.api";
function UploadDownloadable({
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
}) {
  const [image, setImage] = useState();
  const [spin, setSpin] = useState(false);
  function onFormSubmit(e) {
    e.preventDefault(); //Stop form submit
    setSpin(true);
    fileUpload(image).then((res) => {
      setSpin(false);
      getImageUrl(res.data.file);
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
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
          </div>
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
export default UploadDownloadable;
