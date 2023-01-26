import React from "react";
import { css } from "@emotion/core";
import { Modal, ModalBody } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import SaveButton from "@components/shared/action/SaveButton";
import SharedButton from "@components/shared/action/SharedButton";
import CategoryAndTags from "@components/shared/cards/CategoryAndTags";
import ChannelCardMedia from "@components/video/ChannelCardMedia";

const imageModalStyle = css`
  .modal-content {
    max-height: 100%;
  }
  .modal-body{
    overflow-y: scroll;
  }
  .close-icon {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`

function ImageModal({ image, show, onHide }) {
  return (
    <Modal size="lg" isOpen={show} toggle={onHide} centered={true} css={imageModalStyle}>
      <ModalBody>
        <div className="d-flex w-100 justify-content-end align-items-center mb-3">
          <FontAwesomeIcon icon={faTimes} className='close-icon' onClick={onHide} />
        </div>
        
        <img 
          src={image?.image_src} 
          alt={image?.title} 
          className="cover-bg bg-gray border-radius-17 w-100"
        />

        <div className="d-flex flex-column flex-md-row w-100 justify-content-between">
          <h4 className="font-weight-bold mt-4 mb-2 color-font">
            {image?.title}
          </h4>
          <div className="flex-shrink d-flex align-items-center">
            {image && <SaveButton value={image?.id} type="blog" />}
            <SharedButton title={image?.title} />
          </div>
        </div>

        {image && image?.category && image?.tags ? (
          <CategoryAndTags category={image?.category} tags={image?.tags} />
        ) : null}

        <div
          className="mt-2 content-description"
          dangerouslySetInnerHTML={{
            __html: image?.content,
          }}
        />
        
        {image && image.author && (
          <ChannelCardMedia
            is_subscribed={image?.is_subscribed}
            author={image.author}
          />
        )}
      </ModalBody>
    </Modal>
  );
}

export default ImageModal;
