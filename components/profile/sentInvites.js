import React, { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { UserContext } from "@context/UserContext";
import { genericFetch } from "@request/dashboard";
import { useAlert } from "react-alert";
import { Alert, Spinner } from "reactstrap";
import EmailItem from "./EmailItem";

const url = `${process.env.bossApi}/invites`;

export const SentInvites = ({ formInvite, setFormInvite }) => {
  const { user } = useContext(UserContext);
  const alert = useAlert();
  const token = user?.token;
  const { data, error, mutate } = useSWR(
    token ? [url, token] : null,
    genericFetch
  );

  useEffect(() => {
    if (formInvite) {
      setTimeout(() => {
        setFormInvite(null);
      }, 5000);
    }
  }, [formInvite]);

  const isLoading = !data && !error;

  return (
    <>
      <h2>Sent Invites</h2>
      <p>You have sent invitation emails to the following people:</p>
      {formInvite?.failed ? (
        <Alert color="danger">{formInvite?.failed}</Alert>
      ) : null}
      {formInvite?.exists ? (
        <Alert color="warning">{formInvite?.exists}</Alert>
      ) : null}
      {formInvite?.data?.map((invites) => (
        <Alert>
          Invitations were sent successfully to the following email addresses:{" "}
          {invites?.email}
        </Alert>
      ))}
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
          <EmailItem key={email.id} email={email} mutate={mutate} />
        ))}
      </div>
      <div className="d-flex justify-content-center mt-4">
        {isLoading ? <Spinner size={"sm"} /> : null}
      </div>
    </>
  );
};
