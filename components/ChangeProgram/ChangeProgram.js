import React, { useContext } from "react";
import Head from "next/head";
import {
  Modal,
  ModalBody,
  FormGroup,
  Row,
  ModalFooter,
  Button,
  ModalHeader,
} from "reactstrap";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { useAlert } from "react-alert";
import { ChooseProgram } from "../suggestics/onboarding/slides/ChooseProgram";
import SignupProgram from "../../pages/signup-program";
import { useAppDispatch, useAppSelector } from "../../store/store";
import GradientButton from "../ui/button/GradientButton";
import { UserContext } from "../../context/UserContext";
import { UPDATE_USER_PROGRAM } from "../../graphql/suggestic-mutatons";
import {
  setAllPrograms,
  setChosenProgramId,
} from "../../store/features/onboarding-prefs/onboarding-prefs-slice";
import { TIMEOUT } from "../../utils/constant";

import useLocalStorage from "../../hooks/useLocalStorage";
import useEvent from "../../hooks/useEvent";

function ChangeProgram({ isOpen, handleClose, modalColor }) {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const alert = useAlert();
  const chosenProgramId = useAppSelector(
    (state) => state.onboardingPrefs.chosenProgramId
  );
  const [updateUserProgram] = useMutation(UPDATE_USER_PROGRAM);
  const [program, setProgram] = useLocalStorage("program", {});

  const onSumbit = useEvent(async () => {
    if (chosenProgramId != "") {
      const value = await updateUserProgram({
        variables: {
          programId: chosenProgramId,
        },
      });

      if (value.data?.updateUserProgram?.success) {
        dispatch(setChosenProgramId(chosenProgramId));
        const chosenProgram = {
          id: chosenProgramId,
        };

        setProgram(chosenProgram);
        alert.success("User's program is successfully updated", TIMEOUT);
      }

      handleClose();
    }
  });

  return (
    <>
      <Head>
        <title>Change Program</title>
      </Head>
      <Modal
        className="modal-dialog-centered full-screen-modal"
        scrollable
        isOpen={isOpen}
        toggle={handleClose}
        css={modalColor}
      >
        <div className="container">
          <ModalBody>
            <button
              onClick={handleClose}
              type="button"
              className="close modal-cancel assessment-cancel fixed-cancel"
            >
              Cancel
            </button>
            <div className="assessment-layout">
              <div className="assessment-wrap">
                <img
                  src="/img/brand/logo.png"
                  alt="ELXR Logo"
                  className="assessment-logo d-none d-md-block"
                />
                <img
                  src="/img/brand/logo-icon.png"
                  alt="ELXR Logo"
                  className="assessment-logo d-md-none"
                />

                <div className="onboarding-title">Start a new meal program</div>
                <div className="onboarding-subtitle px-4">
                  Hi {user?.name}, Do you want to add meals to your daily
                  schedule? Just select a programe and we will help you identify
                  the dishes.
                </div>
                <ChooseProgram />
              </div>
              <div className="onboarding-fixed-btn">
                <GradientButton
                  type="button"
                  disabled={chosenProgramId === ""}
                  onClick={onSumbit}
                  className="btn-block"
                >
                  Select &amp; Proceed
                </GradientButton>
                <div className="copyright-text">
                  Copyright © 2010-2023 ELXR. All rights reserved.
                </div>
              </div>
            </div>
          </ModalBody>
          <div className="copyright-text">
            Copyright © 2010-2023 ELXR. All rights reserved.
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ChangeProgram;
