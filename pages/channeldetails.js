import React from "react";
import Router from "next/router";
import Head from "next/head";
import { BackLink } from "../components/ui/auth/auth.style";
import Header from "../components/layout/Header";
import { FormGroup, Input, Label, Button } from "reactstrap";
import LayoutAuth from "../components/layout/LayoutAuth";
export default function ChannelDetails() {
  return (
    <>
      <LayoutAuth image={true}>
        <Head>
          <title>Creater Details - PORTL</title>
        </Head>
        <Header actionButton={true} />
        <div className="form-section">
          <BackLink>
            <a href="/login" className="back">
              {" "}
              Back{" "}
            </a>
          </BackLink>
          <div className="skip-button" onClick={() => Router.push("/")}>
            Skip
          </div>
          <form>
            <div className="inner-form">
              <h1>
                <span>Add</span>Channel Details
              </h1>
              <FormGroup>
                <Label for="">Channel Category</Label>
                <Input type="text" name="" id="" />
              </FormGroup>
              <FormGroup>
                <Label for="">Tags</Label>
                <Input type="text" name="" id="" />
              </FormGroup>
              <FormGroup>
                <Label for="">Where are you from?</Label>
                <Input type="text" name="" id="" />
              </FormGroup>
              <FormGroup>
                <Label for="">Timezone</Label>
                <Input type="text" name="" id="" />
              </FormGroup>
              <FormGroup>
                <Label for="">Currency</Label>
                <Input type="text" name="" id="" />
              </FormGroup>
              <input
                className="btn btn-primary mb-4 submit-button"
                value="Choose Plan"
                type="submit"
              />
            </div>
          </form>
        </div>
        <Button onClick={() => Router.push("/")}>submit</Button>
      </LayoutAuth>
    </>
  );
}
