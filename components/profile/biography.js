import React from "react";
import moment from "moment";
import {
  BiographyContainer,
  BiographyHeading,
  BiographyList,
} from "../livefeed/profile.style";
import { XPROFILE_FIELDS } from "@utils/constant";

function Biography({ user }) {
  const fields = user?.xprofile?.groups[1].fields;

  let firstName = "";
  let lastName = "";
  let username = "";
  let gender = "";
  let birthDate = "";
  let aboutMe = "";

  console.log({fields})

  if (fields) {
    firstName =
      XPROFILE_FIELDS.name in fields
        ? fields[XPROFILE_FIELDS.name]?.value?.raw || ""
        : "";
    lastName =
      XPROFILE_FIELDS.last_name in fields
        ? fields[XPROFILE_FIELDS.last_name]?.value?.raw || ""
        : "";
    username = XPROFILE_FIELDS.username in fields ? fields[XPROFILE_FIELDS.username]?.value?.raw || "" : "";
    gender =
      XPROFILE_FIELDS.gender in fields
        ? fields[XPROFILE_FIELDS.gender]?.value?.raw || ""
        : "";
    aboutMe =
      XPROFILE_FIELDS.about_me in fields
        ? fields[XPROFILE_FIELDS.about_me]?.value?.raw || ""
        : "";
    birthDate =
      XPROFILE_FIELDS.birth_date in fields
        ? fields[XPROFILE_FIELDS.birth_date]?.value?.raw || ""
        : "";
  }
  return (
    <>
      <BiographyContainer>
        <BiographyHeading>Biography</BiographyHeading>
        <BiographyList>
          {firstName === "" ? null : (
            <>
              <span>First Name</span> <span>{`${firstName}`}</span>
            </>
          )}
        </BiographyList>
        <BiographyList>
          {lastName === "" ? null : (
            <>
              <span>Last Name</span> <span>{`${lastName}`}</span>
            </>
          )}
        </BiographyList>
        <BiographyList>
          {username === "" ? null : (
            <>
              <span>Username</span> <span>{`${username}`}</span>
            </>
          )}
        </BiographyList>
        <BiographyList>
          {aboutMe === "" ? null : (
            <>
              <span>About me</span> <span>{`${aboutMe}`}</span>
            </>
          )}
        </BiographyList>
        <BiographyList>
          {birthDate === "" ? null : (
            <>
              <span>Birth Date</span>{" "}
              <span>{`${moment(birthDate).format("DD MMM YYYY")}`}</span>
            </>
          )}
        </BiographyList>
        <BiographyList>
          {gender === "" ? null : (
            <>
              <span>Gender</span> <span>{`${gender}`}</span>
            </>
          )}
        </BiographyList>
      </BiographyContainer>
    </>
  );
}

export default Biography;
