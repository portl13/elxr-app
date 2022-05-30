import React from "react";
import { Button } from "reactstrap";
import Router from "next/router";
import Head from "next/head";
import Header from "../components/layout/Header";
import LayoutAuth from "../components/layout/LayoutAuth";
export default function AccountType() {
  return (
    <>
      <LayoutAuth image={true}>
        <Head>
          <title>Account Type - WeShare</title>
        </Head>
        <Header actionButton={true} />
        <div className="signup-process">
          <h1>
            <span>Create</span>Account Type
          </h1>
          <div className="option-panel">
            <div className="button-tag">
              <Button
                onClick={() => Router.push("/creator-details")}
                className="button-panel"
              >
                Creator
              </Button>
              <div className="text-section">
                Easily live stream, share and earn money from your content.
              </div>
            </div>
            <div className="button-tag">
              <Button
                onClick={() => Router.push("/memberdetails")}
                className="button-panel"
              >
                Member
              </Button>
              <div className="text-section">
                Discover live streams, events, communities, courses and more.
              </div>
            </div>
          </div>
        </div>
      </LayoutAuth>
    </>
  );
}
