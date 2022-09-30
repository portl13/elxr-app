import React, { useState, useEffect, useContext } from "react";
import DownloadCard from "@components/my-purchases/DownloadCard";
import { getDownload } from "@api/my-account/Download.api";
import { Spinner } from "reactstrap";
import { UserContext } from "@context/UserContext";
import useSWR from "swr";
import { genericFetch } from "@request/dashboard";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";

const myAccountApi = process.env.myAccount + "/downloads";

function MyDownloads() {
  const { user } = useContext(UserContext);
  const token = user?.token;
  const { data: downloads } = useSWR(
    token ? [myAccountApi, token] : null,
    genericFetch
  );
  const isLoading = !downloads;
  return (
    <>
      <h3>Downloads</h3>
      <div className="wc-MyAccount-inner-content fl-d pt-1">
        {downloads && downloads.data && downloads.data.length === 0 && (
          <div className="wc-MyAccount-fix-center d-flex justify-content-center flex-wrap">
            <img
              alt={"downloads"}
              src="https://data.portl.live/wp-content/themes/buddyboss-theme/assets/images/svg/cart.svg"
            />
            <div className="wc-tagline w-100 text-center mt-3">
              No downloads available yet.
            </div>
          </div>
        )}

        {isLoading && <SpinnerLoader />}

        {downloads && downloads.data && downloads.data.length > 0 && (
          <DownloadCard result={downloads.data} />
        )}
      </div>
    </>
  );
}

export default MyDownloads;
