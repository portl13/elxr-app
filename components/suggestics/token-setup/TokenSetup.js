import React, { useEffect } from "react";

// import {Auth} from "aws-amplify";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
  setAuthInfoElxrToken,
  setAuthInfoSuggesticToken,
} from "../../../store/features/auth-info/auth-info-slice";

export const TokenSetup = () => {
  const suggesticToken = useAppSelector(
    (state) => state.authInfo.suggesticToken
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    getTokens();
  }, []);

  function getTokens() {
    getELXRToken().then((token) => {
      dispatch(setAuthInfoElxrToken(token));
      getSuggesticToken(token);
    });
  }

  async function getELXRToken() {
    const user = await new Promise((resolve, reject) => {
      resolve("");
    });
    // await Auth.currentAuthenticatedUser();
    return "token";
    // user.getSignInUserSession().getIdToken().getJwtToken()
  }

  async function getSuggesticToken(elxrToken) {
    const hdrs = new Headers();
    hdrs.append("x-elxr-token", elxrToken);

    const message = {};

    const body = new Blob([JSON.stringify(message, null, 2)], {
      type: "application/json",
    });

    const init = {
      method: "POST",
      headers: hdrs,
      body: body,
    };
    const resp = await fetch(
      "https://xxy7wgfop2.execute-api.us-west-2.amazonaws.com/stage/authsuggestic",
      init
    );

    if (!resp.ok) throw Error("cannot log in to ELXR");

    const data = await resp.json(); // TODO: type json response with interface

    if (suggesticToken === "") dispatch(setAuthInfoSuggesticToken(data.jwt));
  }

  return <div className="TokenSetup" />;
};
