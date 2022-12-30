import { css } from "@emotion/core";
import Head from "next/head";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import BackButton from "@components/shared/button/BackButton";
import React from "react";
import AppointmentUpdate from "@components/calendar/AppointmentUpdate";

export const createAppointmentStyle = css`
  &.appointment-container {
    .main_grid {
      background: transparent;
    }
  }
  .page-Title {
    background: rgba(29, 51, 91, 0.48);
    height: 50px;
    width: 100%;
    border-radius: 22px;
    font-family: "Quicksand";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    /* identical to box height */
    color: #ffffff;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    justify-content: center;
    @media (min-width: 576px) {
      max-width: 323px;
    }
    img {
      margin-right: 10px;
    }
  }
`;

export default function CreateAppointment({ id }) {
  return (
    <div css={createAppointmentStyle} className="appointment-container">
      <Head>
        <title>Create Appointment</title>
      </Head>
      <MainLayout sidebar={<MainSidebar />}>
        <BackButton />
        <AppointmentUpdate id={id} />
      </MainLayout>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const { id } = query;
  return {
    props: { id },
  };
}
