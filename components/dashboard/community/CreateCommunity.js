import React from "react";
import Meta from "@components/layout/Meta";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Link from "next/link";
import Head from "next/head";

function CreateCommunity() {
  return (
    <>
      <Meta />
      <Head>
        <title>CREATE A COMMUNITY</title>
      </Head>
      <div className="container px-3 px-md-5 pt-5">
        <div className="d-flex align-items-center">
          <Link href={"/dashboard/community"}>
            <a className="text-white">
              <span className="contain-icon">
                <FontAwesomeIcon className="back-icon" icon={faArrowLeft} />
              </span>
              <span className="back">Back</span>
            </a>
          </Link>
        </div>
        <div className="container container-80">
          <div className="contain-title">
            <h1 className="create-communities-title">CREATE A COMMUNITY</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateCommunity;
