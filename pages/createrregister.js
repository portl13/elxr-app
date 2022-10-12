import React, { useState } from "react";
import Router from "next/router";
import LayoutAuth from "../components/layout/LayoutAuth";
import Header from "../components/layout/Header";
import { inputLabelStyle, BackLink } from "../components/ui/auth/auth.style";
import {
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import Terms from "../components/register/terms";
import Policy from "../components/register/policy";
import { modalColor } from "../components/livefeed/livefeed.style";
export default function CreaterRegister() {
  const [showTermsModal, setTermsShowModal] = useState(false);
  const handleTermsClose = () => setTermsShowModal(false);
  const handleTermsShow = () => setTermsShowModal(true);
  const [showPolicyModal, setPolicyShowModal] = useState(false);
  const handlePolicyClose = () => setPolicyShowModal(false);
  const handlePolicyShow = () => setPolicyShowModal(true);
  const [agree, setAgree] = useState(false);
  const checkboxHandler = () => setAgree(!agree);
  return (
    <>
      <LayoutAuth image={true}>
        <Header actionButton={true} />
        <div className="form-section">
          <BackLink>
            <a href="/accounttype" className="back">
              {" "}
              Back{" "}
            </a>
          </BackLink>
          <form>
            <div className="inner-form">
              <h1>
                <span>Create</span>Creator Account
              </h1>
              <FormGroup>
                <Label for="name" css={inputLabelStyle}>
                  Channel Name
                </Label>
                <Input id="name" name="name" type="name" />
                <span className="channel-tag">
                  Your channel name will be used publicly including in chat.
                </span>
              </FormGroup>
              <FormGroup>
                <Label for="email" css={inputLabelStyle}>
                  Email Address
                </Label>
                <Input id="email" name="email" type="email" />
              </FormGroup>
              <FormGroup>
                <Label for="password" css={inputLabelStyle}>
                  Password
                </Label>
                <Input id="password" name="password" type="password" />
              </FormGroup>
              <div className="App">
                <div>
                  <FormGroup className="mt-2 text-center">
                    <div className="custom-control custom-checkbox mb-3">
                      <input
                        type="checkbox"
                        id="agree"
                        onChange={checkboxHandler}
                        className="custom-control-input"
                      />
                      <label
                        htmlFor="agree"
                        className="custom-control-label text-primary bottom-text"
                      >
                        By signing up, you agree to PORTL
                        <br /> <a onClick={handleTermsShow}>
                          Terms of Service
                        </a>{" "}
                        and <a onClick={handlePolicyShow}>Privacy Policy</a>.
                      </label>
                    </div>
                  </FormGroup>
                </div>
                <input
                  className="btn btn-primary mb-4 submit-button"
                  value="Sign Up"
                  disabled={!agree}
                  //type="submit"
                  onClick={() => Router.push("/creatermsg")}
                />
              </div>
            </div>
            <Modal
              className="modal-dialog-centered"
              isOpen={showTermsModal}
              toggle={handleTermsClose}
              css={modalColor}
            >
              <ModalHeader toggle={handleTermsClose}></ModalHeader>
              <ModalBody>
                <Terms />
              </ModalBody>
            </Modal>
            <Modal
              className="modal-dialog-centered"
              isOpen={showPolicyModal}
              toggel={handlePolicyClose}
              css={modalColor}
            >
              <ModalHeader toggle={handlePolicyClose}></ModalHeader>
              <ModalBody>
                <Policy />
              </ModalBody>
            </Modal>
          </form>
        </div>
      </LayoutAuth>
    </>
  );
}
