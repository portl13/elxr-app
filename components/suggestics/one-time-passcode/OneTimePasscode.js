import React, { createRef } from "react";

import "./OneTimePasscode.scss";

import { useAppDispatch, useAppSelector } from "../../../store/store";
import { setAuthInfoOtp } from "../../../store/features/auth-info/auth-info-slice";

export const OneTimePasscode = () => {
  const otp = useAppSelector((state) => state.authInfo.otp);

  const ref0 = createRef();
  const ref1 = createRef();
  const ref2 = createRef();
  const ref3 = createRef();
  const ref4 = createRef();
  const ref5 = createRef();

  const dispatch = useAppDispatch();

  function isNumeric(n) {
    return !isNaN(parseInt(n)) && isFinite(n);
  }

  function setOtp(str) {
    dispatch(setAuthInfoOtp(str));
  }

  return (
    <div
      className="OneTimePasscode"
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "row",
          borderRadius: 5,
          justifyContent: "center",
        }}
      >
        <input
          placeholder="•"
          ref={ref0}
          maxLength={1}
          value={otp.slice(0, 1)}
          style={{
            fontSize: 24,
            width: 38,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifySelf: "center",
            textAlign: "center",
            marginRight: 5,
          }}
          onChange={(event) => {
            if (
              event.target.value !== "" &&
              event.target.value.length === 1 &&
              isNumeric(event.target.value)
            ) {
              setOtp(otp + event.target.value);
              if (ref1.current) ref1.current.focus();
            } else {
              if (event.target.value.length > 1) {
                setOtp(event.target.value.slice(1, 2) + otp.slice(1));
                if (ref1.current) ref1.current.focus();
              } else {
                setOtp(otp.slice(1));
              }
            }
          }}
        />

        <input
          placeholder="•"
          ref={ref1}
          maxLength={1}
          value={otp.slice(1, 2)}
          style={{
            fontSize: 24,
            width: 38,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifySelf: "center",
            textAlign: "center",
            marginRight: 5,
          }}
          onChange={(event) => {
            if (
              event.target.value !== "" &&
              event.target.value.length === 1 &&
              isNumeric(event.target.value)
            ) {
              setOtp(otp + event.target.value);
              if (ref2.current) ref2.current.focus();
            } else {
              if (event.target.value.length > 1) {
                setOtp(
                  otp.slice(0, 1) +
                    event.target.value.slice(1, 2) +
                    otp.slice(2)
                );
                if (ref2.current) ref2.current.focus();
              } else {
                setOtp(otp.slice(0, 1) + otp.slice(2));
                if (ref0.current) ref0.current.focus();
              }
            }
          }}
        />

        <input
          placeholder="•"
          ref={ref2}
          maxLength={1}
          value={otp.slice(2, 3)}
          style={{
            fontSize: 24,
            width: 38,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifySelf: "center",
            textAlign: "center",
            marginRight: 5,
          }}
          onChange={(event) => {
            if (
              event.target.value !== "" &&
              event.target.value.length === 1 &&
              isNumeric(event.target.value)
            ) {
              setOtp(otp + event.target.value);
              if (ref3.current) ref3.current.focus();
            } else {
              if (event.target.value.length > 1) {
                setOtp(
                  otp.slice(0, 2) +
                    event.target.value.slice(1, 2) +
                    otp.slice(3)
                );
                if (ref3.current) ref3.current.focus();
              } else {
                setOtp(otp.slice(0, 2) + otp.slice(3));
                if (ref1.current) ref1.current.focus();
              }
            }
          }}
        />

        <input
          placeholder="•"
          ref={ref3}
          maxLength={1}
          value={otp.slice(3, 4)}
          style={{
            fontSize: 24,
            width: 38,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifySelf: "center",
            textAlign: "center",
            marginRight: 5,
          }}
          onChange={(event) => {
            if (
              event.target.value !== "" &&
              event.target.value.length === 1 &&
              isNumeric(event.target.value)
            ) {
              setOtp(otp + event.target.value);
              if (ref4.current) ref4.current.focus();
            } else {
              if (event.target.value.length > 1) {
                setOtp(
                  otp.slice(0, 3) +
                    event.target.value.slice(1, 2) +
                    otp.slice(4)
                );
                if (ref4.current) ref4.current.focus();
              } else {
                setOtp(otp.slice(0, 3) + otp.slice(4));
                if (ref2.current) ref2.current.focus();
              }
            }
          }}
        />

        <input
          placeholder="•"
          ref={ref4}
          maxLength={1}
          value={otp.slice(4, 5)}
          style={{
            fontSize: 24,
            width: 38,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifySelf: "center",
            textAlign: "center",
            marginRight: 5,
          }}
          onChange={(event) => {
            if (
              event.target.value !== "" &&
              event.target.value.length === 1 &&
              isNumeric(event.target.value)
            ) {
              setOtp(otp + event.target.value);
              if (ref5.current) ref5.current.focus();
            } else {
              if (event.target.value.length > 1) {
                setOtp(
                  otp.slice(0, 4) +
                    event.target.value.slice(1, 2) +
                    otp.slice(5)
                );
                if (ref5.current) ref5.current.focus();
              } else {
                setOtp(otp.slice(0, 4) + otp.slice(5));
                if (ref3.current) ref3.current.focus();
              }
            }
          }}
        />

        <input
          placeholder="•"
          ref={ref5}
          maxLength={1}
          value={otp.slice(5)}
          style={{
            fontSize: 24,
            width: 38,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifySelf: "center",
            textAlign: "center",
          }}
          onChange={(event) => {
            if (
              event.target.value !== "" &&
              event.target.value.length === 1 &&
              isNumeric(event.target.value)
            ) {
              setOtp(otp + event.target.value);
              if (ref5.current) ref5.current.blur();
            } else {
              if (event.target.value.length > 1) {
                setOtp(otp.slice(0, 5) + event.target.value.slice(1, 2));
                if (ref5.current) ref5.current.blur();
              } else {
                setOtp(otp.slice(0, 5));
                if (ref4.current) ref4.current.focus();
              }
            }
          }}
        />
      </div>
    </div>
  );
};
