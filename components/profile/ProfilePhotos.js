import React, { useState } from "react";
import ProfilePhotosTab from "@components/profile/ProfilePhotosTab";
import AddPhotoProfile from "@components/profile/AddPhotoProfile";
import useSWRInfinite from "swr/infinite";
import { genericFetch } from "@request/dashboard";
const url = process.env.bossApi;
const photoUrl = `${url}/media`;
function ProfilePhotos({ user, isGroup, groupId, isCurrentUser }) {
  const limit = 20;
  const token = user?.token;

  const { data, error, size, setSize, mutate } = useSWRInfinite(
    (index) =>
      token
        ? [
            `${photoUrl}?per_page=${limit}&page=${index + 1}&scope=personal`,
            token,
          ]
        : null,
    genericFetch
  );

  return (
    <>
      <div className="itemBody profile">
        <div className="item-body-inner">
          <div className={`d-flex justify-content-between mb-5`}>
            <h2 className="page-title">Photos</h2>
            <AddPhotoProfile
              user={user}
              mutate={mutate}
            />
          </div>
          <div className="w-100">
            <ProfilePhotosTab
              data={data}
              error={error}
              size={size}
              setSize={setSize}
              isCurrentUser={isCurrentUser}
              token={token}
              mutate={mutate}
            />
          </div>
        </div>
      </div>

      {/*<ReportModal*/}
      {/*  show={reportModalShow}*/}
      {/*  setReportModalOpen={setReportModalOpen}*/}
      {/*  selPhoto={selPhoto}*/}
      {/*  user={user}*/}
      {/*  title={"Photo"}*/}
      {/*  setResult={setResult}*/}
      {/*  result={result}*/}
      {/*  setSelPhoto={setSelPhoto}*/}
      {/*  selPhotoIndex={selPhotoIndex}*/}
      {/*  getPhotos={getPhotos}*/}
      {/*/>*/}
    </>
  );
}

export default ProfilePhotos;
