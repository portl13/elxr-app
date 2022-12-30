import React from "react";
import Head from "next/head";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import BackButton from "@components/shared/button/BackButton";
import Appointment from "@components/calendar/Appointment";
import { css } from "@emotion/core";

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
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
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

export default function CreateAppointment() {
  return (
    <>
      <MainLayout sidebar={<MainSidebar />}>
        <div css={createAppointmentStyle} className="appointment-container">
          <Head>
            <title>Create Appointment</title>
          </Head>
          <BackButton />
          <Appointment />
        </div>
      </MainLayout>
    </>
  );
}
