import React, { useContext } from "react";
import useSWR from "swr";
import { UserContext } from "@context/UserContext";
import { genericFetch } from "@request/dashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { getFormat } from "@utils/dateFromat";
import { TIMEOUT } from "@utils/constant";
import { useAlert } from "react-alert";
import { genericDelete } from "@request/dashboard";

const url = `${process.env.bossApi}/invites`;

export const SentInvites = (formInvite) => {
  const { user } = useContext(UserContext);
  const alert = useAlert();
  const token = user?.token;
  const { data, mutate } = useSWR(token ? [url, token] : null, genericFetch);
  const deleteInvite = async (id) => {
    if (!token) return;
    try {
      await genericDelete(`${url}/${id}`, token);
      await mutate();
    } catch (error) {
      alert.error(error.message, TIMEOUT);
    }
  };
  return (
    <>
      <h2>Sent Invites</h2>
      <p>You have sent invitation emails to the following people:</p>
      <div className="d-none d-md-flex flex-column justify-content-around table-responsive-row mt-5">
        <div className="d-md-flex justify-content-between px-2">
          <div className="table-header client_name">
            <p className="table-header-item">Name</p>
          </div>
          <div className="table-header items text-center">
            <p className="table-header-item">Email</p>
          </div>
          <div className="table-header billing_address">
            <p className="table-header-item">Invited</p>
          </div>
          <div className="table-header puchased_date text-center">
            <p className="table-header-item">Status</p>
          </div>
        </div>
      </div>
      <div className="mt-4 mt-md-2 border-white font-color px-0 py-0">
        {data?.map((email) => (
          <div
            key={email.id}
            className="table-responsive-row px-3 d-flex flex-column flex-md-row justify-content-md-between align-items-md-center py-4 border-bottom"
          >
            <div className="client_name d-flex justify-content-between align-items-center">
              <div>
                <p className="m-0">{email.name}</p>
              </div>
            </div>
            <div className="d-flex justify-content-between justify-content-md-center items">
              <span className="d-md-none">Email</span>
              <p className="text-success m-0">{email.email}</p>
            </div>
            <div className="d-flex justify-content-between billing_address">
              <span className="d-md-none">Invited</span>
              <p className="text-right text-md-center max-width-140 m-0">
                {getFormat(email.date, "MM-dd-yyyy")}
              </p>
            </div>
            <div className="d-flex justify-content-between pr-3 justify-content-md-center puchased_date">
              <span className="d-md-none">Status</span>
              <div className="d-flex justify-content-between">
                <span
                  className="pointer mr-2 pt-md-3  color-font p-0 ml-2"
                  onClick={() => deleteInvite(email.id)}
                >
                  <FontAwesomeIcon
                    className="icon-setting"
                    icon={faTimesCircle}
                  />
                </span>
                <p className="m-0">{email.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
