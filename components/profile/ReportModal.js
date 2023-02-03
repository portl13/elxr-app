import React, { useState, useEffect } from "react";
import { Button, ModalHeader, Modal, ModalBody, FormGroup, Label, Input, ModalFooter } from "reactstrap";
import { getReportForm, reportData } from "../api/report.api";
import { uploadModal, ErrroMsg } from "../../components/livefeed/photo.style";
import { useAlert } from 'react-alert'
import { TIMEOUT } from '../../utils/constant';
import Loader from '../../components/loader';

const InfiniteList = ({
    show,
    selPhoto,
    setReportModalOpen,
    user,
    title,
    result,
    setResult,
    selPhotoIndex,
    setSelPhoto,
}) => {
    const alert = useAlert()
    const [reportForm, setForum] = useState([]);
    const [loader, setLoader] = useState(false);
    const [reportCategory, setReportCategory] = useState(null);
    const [reportCategoryName, setReportCategoryName] = useState(null);
    const [error, showError] = useState(false);
    const [reportNote, setReportNote] = useState("");
    useEffect(() => {
        getReportForm(user).then((res) => {
            setForum(res.data[0].options)
        })
    }, [])

    const emptyModal = () => {
        setReportNote("")
        showError("")
        setReportCategory(null)
        setReportCategoryName(null)
    }
    const handleReportData = () => {
        if (reportCategoryName === "Other" && !reportNote) {
            showError(true)
            return
        }
        setLoader(true)
        const formData = {
            item_type: "media",
            item_id: selPhoto.id,
            report_category: reportCategory,
            note: reportNote
        }
        reportData(user, formData).then(() => {
            alert.success(`${title} reported successfully`, TIMEOUT);
            let data = [...result]
            data[selPhotoIndex].reported = true
            setResult(data)
            setReportModalOpen(false)
            setLoader(false)
            setSelPhoto(null)
            emptyModal()
        }).catch(() => {
            setLoader(false);
            setSelPhoto(null)
            emptyModal()
        })

    }

    const closeModal = () => {
        setReportModalOpen(false);
        emptyModal()
    }
    return (
        <Modal
            className="modal-dialog-centered"
            isOpen={show}
            css={uploadModal}>
            <ModalHeader toggle={closeModal}>Report {title}</ModalHeader>
            <ModalBody>
                {!selPhoto?.reported ? <> {reportForm.map((ele) =>
                    <FormGroup check>
                        <Label check>
                            <Input
                                type="radio"
                                name="radio2"
                                onChange={() => {
                                    setReportCategory(ele.value);
                                    setReportCategoryName(ele.name)
                                }} />{' '}
                            {ele.name}
                            <div>{ele.description}</div>
                        </Label>
                    </FormGroup>)}
                    {reportCategoryName === "Other" && <FormGroup>
                        <Input type="textarea" name="note"
                            onChange={(e) => { setReportNote(e.target.value); showError(false) }}
                        />
                        {error ? <ErrroMsg>Please enter note to report this {title.toLowerCase()}</ErrroMsg> : ""}
                    </FormGroup>}
                </> : <div>You have already reported this {title.toLowerCase()}.</div>}
            </ModalBody>
            {!selPhoto?.reported && <ModalFooter>
                <Button
                    color="secondary-text"
                    onClick={closeModal} >
                    Cancel
                </Button>
                <Button
                    color="primary"
                    disabled={!reportCategory}
                    onClick={() => handleReportData()}>
                    Report{" "}{loader ? <Loader /> : ""}
                </Button>
            </ModalFooter>}
        </Modal >
    );
};

export default InfiniteList;
