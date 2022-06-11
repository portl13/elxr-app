import React, { useState, useEffect, useContext } from "react";
import UploadImage from "@components/my-portal/UploadImage";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages, faEdit } from "@fortawesome/free-solid-svg-icons";
import { createStreamProcess } from "@components/my-account/CreateStreamProcess.style";

function EditDetails({
    eventDetails,
    setEventTitle,
    title,
    setDescription,
    description,
    setUploadImage,
    setImageSpinner,
    setImage,
    thumbnail,
    user,
    image
}) {
    return (
        <section css={createStreamProcess}>
            <div className="create-stream-process">
                <ul>
                    <li className="active">
                        Details
                        <span></span>
                    </li>
                    <li>
                        Customization
                        <span></span>
                    </li>
                    <li>
                        Visibility
                        <span></span>
                    </li>
                </ul>
            </div>
            <div className="details-data-section">
                <h2>Details</h2>
                <div className="description-section">
                    <span>Title <span className="req"> *</span></span>
                    <textarea
                        value={title}
                        maxLength="150"
                        onChange={(e) => setEventTitle(e.target.value)}

                    ></textarea>
                </div>
                <div className="description-section">
                    <span>Description <span className="req"> *</span></span>
                    <textarea rows={5}
                        value={description}
                        maxLength="1000"
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className="category-section">
                    <span>Thumbnail </span>
                    <label>Select or upload a picture that represents your stream. A good thumbnail
                        stands out and draws viewers attention.<a>Learn more</a>
                    </label>

                    <div className="thumbnail-view" onClick={() => setUploadImage(true)}>
                        {image ? (
                            <img src={image.url} alt="image" />) : (<img src={eventDetails[0]?.thumbnail} alt="image" />)

                        }
                        <FontAwesomeIcon icon={faImages} />
                        <span>Upload thumbnails</span>


                    </div>
                    {image !== "https://data.portl.live/wp-content/plugins/wc-frontend-manager/includes/libs/upload/images/Placeholder.png" && (
                        <Button
                            className="cancel-btn"
                            onClick={() =>
                                setImage(
                                    "https://data.portl.live/wp-content/plugins/wc-frontend-manager/includes/libs/upload/images/Placeholder.png"
                                )
                            }
                        >
                            +
                        </Button>
                    )
                    }
                    {/* {image !== undefined && (
                        <div className="edit-thumbnail-icon"

                            onClick={() => setUploadImage(true)}>
                            <FontAwesomeIcon
                                icon={faEdit}

                            />
                            <div className="tooltip-panel">
                                Change Thumbnail <em></em>
                            </div>
                        </div>)} */}

                </div>
            </div>

            {thumbnail && (
                <UploadImage
                    show={thumbnail}
                    user={user}
                    setPicture={setImage}
                    status={true}
                    setUploadImage={setUploadImage}
                    setImageSpinner={setImageSpinner}
                    upload={true}

                />
            )}
        </section>
    )
}

export default EditDetails;