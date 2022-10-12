import React from "react";
import Router from "next/router";
import Head from "next/head";
import { inputLabelStyle, BackLink } from "../components/ui/auth/auth.style";
import Header from "../components/layout/Header";
import { FormGroup, Input, Label } from "reactstrap";
import LayoutAuth from "../components/layout/LayoutAuth";
export default function CreaterDetails() {
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
                <span>Add</span>Creater Details
              </h1>
              <div className="member-image-panel">
                <div className="image-tag">
                  <img
                    className="avatar"
                    src="https://data.portl.live/wp-content/uploads/avatars/70963/6178df5b7d180-bpthumb.png"
                  />
                </div>
                <div className="text-panel">Add Channel Image</div>
              </div>
              <FormGroup>
                <Label for="name" css={inputLabelStyle}>
                  First Name
                </Label>
                <Input type="text" name="name" id="name" />
              </FormGroup>
              <FormGroup>
                <Label for="last_name" css={inputLabelStyle}>
                  Last Name
                </Label>
                <Input type="text" name="last_name" id="last_name" />
              </FormGroup>
              <FormGroup>
                <Label for="birth_date" css={inputLabelStyle}>
                  Date of Birth (Optional)
                </Label>
                <Input id="birth_date" name="birth_date" type="date" />
              </FormGroup>
              <FormGroup>
                <Label for="gender" css={inputLabelStyle}>
                  Gender (Optional)
                </Label>
                <Input type="select" name="gender" id="gender">
                  <option>-----</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="other">Other</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="about_me" css={inputLabelStyle}>
                  About Me (Optional)
                </Label>
                <textarea
                  type="text"
                  className="form-control"
                  name="about_me"
                  id="about_me"
                ></textarea>
              </FormGroup>
              <input
                className="btn btn-primary mb-4 submit-button"
                value="Confirm Details"
                //type="submit"
                onClick={() => Router.push("/channeldetails")}
              />
            </div>
          </form>
        </div>
      </LayoutAuth>
    </>
  );
}
