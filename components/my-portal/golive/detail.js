import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";
import UploadImage from "../UploadImage";

import { Input } from "reactstrap";
import { Button } from "reactstrap";
import { createStreamProcess } from "@components/my-account/CreateStreamProcess.style";
const customStyles = {
    control: (base, state) => ({
        ...base,
        background: "#1b1b1b !important",
        color: "white !important",
        border: "1px solid white",
        fontColor: "white !important",
        boxShadow: "none",
        borderColor: state.isFocused ? "white" : "",
        "&:hover": {
            // Overwrittes the different states of border
            borderColor: state.isFocused ? "white" : "",
        },
    }),
    valueContainer: (provided, state) => ({
        ...provided,
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    }),
    input: (base) => ({
        ...base,
        color: "white !important",
    }),
    menu: (base) => ({
        ...base,
        background: "black !important",
        border: "none",
        color: "white !important",
        // override border radius to match the box
        borderRadius: 0,
        // kill the gap
        marginTop: 0,
    }),
    menuList: (base) => ({
        ...base,
        background: "black !important",
        border: "none",
        color: "white !important",
        // kill the white space on first and last option
        padding: 0,
    }),
    option: (base) => ({
        ...base,
        background: "black !important",
        color: "white !important",
        "&:hover": {
            // Overwrittes the different states of border
            background: "grey !important",
        },
    }),
    singleValue: (styles) => ({
        ...styles,
        color: "white !important",
    }),
};

function Detail({ setEventTitle,
    title,
    description,
    category,
    setDescription,
    setSelCategory,
    categoryList,
    thumbnail,
    setImageSpinner,
    setUploadImage,
    image,
    setImage,
    user }) {

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
                        maxLength="150"
                        value={title}
                        onChange={(e) => setEventTitle(e.target.value)}
                        placeholder="Add a title that describes your stream (type @ to mention a channel)"
                    ></textarea>
                </div>
                <div className="description-section">
                    <span>Description <span className="req"> *</span></span>
                    <textarea rows={5}
                        maxLength="1000"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Tell viewers more about your stream (type @ to mention a channel)"
                    ></textarea>
                </div>
                <div className="category-section">
                    <span>Category <span className="req"> *</span></span>
                    <label>
                        Add your stream to a category so viewers can find it more easily
                    </label>

                    <Input
                        type="select"
                        value={category}
                        onChange={(e) => {
                            setSelCategory(e.target.value);
                        }}>
                        <option key='00' value={""}>Select Category</option>
                        {categoryList.map((e) => (
                            <option key={e.id} value={e.id}>{e.name}</option>
                        ))}
                    </Input>

                </div>
                <div className="category-section">
                    <span>Thumbnail </span>
                    <label>Select or upload a picture that represents your stream. A good thumbnail stands
                        out and draws viewers attention.<a>Learn more</a>

                    </label>

                    <div className="thumbnail-view" onClick={() => setUploadImage(true)}>
                        {image && (
                            <img src={image.url} alt="image" />
                        )

                        }

                        <FontAwesomeIcon icon={faImages} />
                        <span>Upload thumbnails</span>

                    </div>
                    {image !== undefined && (
                        <Button
                            className="cancel-btn"
                            onClick={() =>
                                setImage()

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
export default Detail

