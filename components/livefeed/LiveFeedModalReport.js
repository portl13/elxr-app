import React from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

const result = [
  {
    id: 2397,
    type: 'option',
    name: 'Harassment',
    description: 'Harassment or bullying behavior',
    show_when: 'content',
    is_default_option: true,
    value: '2397',
  },
  {
    id: 2394,
    type: 'option',
    name: 'Inappropriate',
    description: 'Contains mature or sensitive content',
    show_when: 'content',
    is_default_option: false,
    value: '2394',
  },
  {
    id: 2395,
    type: 'option',
    name: 'Misinformation',
    description: 'Contains misleading or false information',
    show_when: 'content',
    is_default_option: false,
    value: '2395',
  },
  {
    id: 2393,
    type: 'option',
    name: 'Offensive',
    description: 'Contains abusive or derogatory content',
    show_when: 'content',
    is_default_option: false,
    value: '2393',
  },
  {
    id: 2396,
    type: 'option',
    name: 'Suspicious',
    description: 'Contains spam, fake content or potential malware',
    show_when: 'content',
    is_default_option: false,
    value: '2396',
  },
  {
    id: '',
    type: 'option',
    name: 'Other',
    description: '',
    show_when: 'content_members',
    is_default_option: false,
    value: 'other',
  },
]

function LiveFeedModalReport({
  showReport,
  reportModal,
  setReport_Id,
  setReportId,
  setNote,
  report_Id,
  initial,
  closeReport,
  reportId,
  postReport,
  setShowReport,
}) {
  return (
    <Modal
      className="modal-dialog-centered"
      isOpen={showReport}
      css={reportModal}
    >
      <ModalHeader>Report Content</ModalHeader>
      <ModalBody>
        {result.map((d, i) => {
            return (
              <div className="custom-control custom-radio mb-3">
                <input
                  className="custom-control-input"
                  type="radio"
                  id={'report' + i}
                  name={'report' + i}
                  value={d.value}
                  checked={d.value == (report_Id == '' ? initial : report_Id)}
                  onChange={(e) => {
                    setReport_Id(d.value)
                    setReportId(d.value)
                    setNote('')
                  }}
                />
                <label className="custom-control-label" for={'report' + i}>
                  <span>{d.name}</span>
                </label>
                <span>{d.description}</span>
              </div>
            )
          })}
        {report_Id == 'other' ? (
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
              {note == '' ? <span>*Report Content is required</span> : null}
            </label>
          </div>
        ) : null}
      </ModalBody>
      <ModalFooter className="py-3">
        <Button
          color="secondary-text"
          onClick={() => {
            closeReport()
            setReport_Id('')
          }}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={() => {
            reportId === 'other'
              ? note === ''
                ? null
                : postReport()
              : postReport()
            reportId === 'other'
              ? note === ''
                ? null
                : setShowReport(false)
              : setShowReport(false)
          }}
        >
          Report
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default LiveFeedModalReport
