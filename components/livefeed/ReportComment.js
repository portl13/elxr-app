import React, { useState } from "react";
import { reportModal } from "./livefeed.style";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import axios from "axios";
export default function ReportComment({
  user,
  result,
  initial,
  showReport,
  setShowReport,
  id,
  reportData,
  setReportData,
  url,
}) {
  const [note, setNote] = useState("");
  const [report_Id, setReport_Id] = useState("");
  const [reportId, setReportId] = useState(null);
  function postReport() {
    axios
      .post(
        url,
        {
          item_id: id,
          item_type: "activity_comment",
          report_category:
            reportId == null ? result.map((d) => d.value)[0] : reportId,
          ...(reportId == "other" ? { note: note } : null),
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((res) => {
        setReportData(true);
      });
  }

  return (
    <>
      <Modal
        className="modal-dialog-centered"
        isOpen={showReport}
        css={reportModal}
      >
        <ModalHeader>Report Content</ModalHeader>
        <ModalBody>
          {result &&
            result.map((d, i) => {
              return (
                <div className="custom-control custom-radio mb-3">
                  <input
                    className="custom-control-input"
                    type="radio"
                    id={"report" + i}
                    name={"report" + i}
                    value={d.value}
                    checked={d.value == (report_Id == "" ? initial : report_Id)}
                    onChange={(e) => {
                      setReport_Id(d.value);
                      setReportId(d.value);
                      setNote("");
                    }}
                  />
                  <label className="custom-control-label" for={"report" + i}>
                    <span>{d.name}</span>
                  </label>
                  <span>{d.description}</span>
                </div>
              );
            })}
          {report_Id == "other" ? (
            <div className="form-item">
              <label>
                <textarea
                  id="note"
                  type="text"
                  name="note"
                  className="bp-other-report-cat"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  required
                />
                {note == "" ? <span>*Report Content is required</span> : null}
              </label>
            </div>
          ) : null}
        </ModalBody>
        <ModalFooter className="py-3">
          <Button
            color="secondary-text"
            onClick={() => {
              setShowReport(false);
              setReport_Id("");
            }}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={() => {
              reportId == "other"
                ? note == ""
                  ? null
                  : postReport()
                : postReport();
              reportId == "other"
                ? note == ""
                  ? null
                  : setShowReport(false)
                : setShowReport(false);
            }}
          >
            Report
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
