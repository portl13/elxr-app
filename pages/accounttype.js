import React from "react";
import { Button } from "reactstrap";
import Router from "next/router";
import Head from "next/head";
import LayoutAuth from "../components/layout/LayoutAuth";
import {LoginContainer} from "@components/ui/auth/auth.style";
export default function AccountType() {
  return (
    <>
      <LoginContainer className={"full"}>
        <LayoutAuth>
        <Head>
          <title>Account Type - elxr</title>
        </Head>
        <div className="signup-process">
          <h1 className={"mt-4"}>
            <span>Create</span>Account Type
          </h1>
          <div className="option-panel">
            <div className="button-tag">
              <Button
                onClick={() => Router.push("/member-profile")}
                className="button-panel"
              >
                Professional
              </Button>
              <div className="text-section my-4">
                Easily live stream, share and earn money from your content.
              </div>
            </div>
            <div className="button-tag">
              <Button
                onClick={() => Router.push("/member-detail")}
                className="button-panel"
              >
                Member
              </Button>
              <div className="text-section my-4">
                Discover live streams, events, communities, courses and more.
              </div>
            </div>
          </div>
        </div>
      </LayoutAuth>
      </LoginContainer>
    </>
  );
}
