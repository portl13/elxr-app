import React from "react";
import SaveButton from "@components/shared/action/SaveButton";
import SharedButton from "@components/shared/action/SharedButton";
import CategoryAndTags from "@components/shared/cards/CategoryAndTags";
import ChannelCardMedia from "@components/video/ChannelCardMedia";
import { Modal, ModalBody } from "reactstrap";

function ImageModal({ image, show, onHide }) {
  return (
    <Modal size="lg" isOpen={show} toggle={onHide} centered={true}>
      <ModalBody>
        <div
          className="ratio ratio-16x9 bg-gray card-head cover-bg bg-gray border-radius-17"
          style={{
            backgroundImage: `url(${image?.image_src})`,
          }}
        ></div>
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
