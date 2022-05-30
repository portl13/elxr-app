import React from "react";
import { Button } from 'reactstrap';
import Head from "next/head";
import Layout from "../components/layout/Layout";
import emailjs from 'emailjs-com';

function Email() {
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_a4xhc8g', 'template_fs4aln6', e.target, 'user_qnfvvSs8dEgpo11IfMhey')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  }
  return (
    <>
      <Layout>
        <Head>
          <title>Connections-WeShare</title>
        </Head>
        <div className="itemBody item-wrapper-panel">
          <div className="item-body-inner member-wrapper">
            <div className="SubNav">
              <ul>
                <li className="active">
                  <Button type="button">All Members <span className="badge badge-pill badge-primary ml-2">1</span></Button>
                </li>
                <li>
                  <Button
                    type="button"
                  >My Connections <span className="badge badge-pill badge-primary ml-2">100</span></Button>
                </li>
                <li>
                  <Button
                    type="button"
                  >Following <span className="badge badge-pill badge-primary ml-2">10</span></Button>
                </li>
              </ul>
            </div>
            <form className="contact-form" onSubmit={sendEmail}>
              <input type="hidden" name="contact_number" />
              <label>Name</label>
              <input type="text" name="user_name" />
              <label>Email</label>
              <input type="email" name="user_email" />
              <label>Message</label>
              <textarea name="message" />
              <input type="submit" value="Send" />
            </form>
            <div className="profile-container">
              <div className="title-tag">sfff</div>
              <div className="submit-wrapper">Please add fields to search members.</div>
            </div>
            <div className="member-container-panel">
              <div className="member-container-panel"></div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
export default Email;
