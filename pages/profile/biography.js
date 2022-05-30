import React from 'react';
import moment from 'moment';
import {BiographyContainer, BiographyHeading, BiographyList} from "../../components/livefeed/profile.style";


 function Biography({user}){

    const  fields = user?.xprofile?.groups[1].fields;
    console.log("🚀 ~ file: biography.js ~ line 9 ~ Biography ~ fields", fields)

    let firstName = "";
    let lastName = "";
    let username = "";
    let gender = "";
    let birthDate = "";
    let aboutMe = "";
   

    if (fields) {
      firstName = (1 in fields) ? fields[1]?.value?.raw || "" : ""
      lastName = (31 in fields) ? fields[31]?.value?.raw || "" : ""
      username = (32 in fields) ? fields[32]?.value?.raw || "" : ""
      gender = (27 in fields) ? fields[27]?.value?.raw || "" : ""
      aboutMe = (25 in fields) ? fields[25]?.value?.raw || "" : ""
      birthDate = (26 in fields) ? fields[26]?.value?.raw || "" : ""
    }
     return(
         <>
          <BiographyContainer>
                  <BiographyHeading>Biography</BiographyHeading>
                  <BiographyList>
                  {firstName =="" ? null : <><span>First Name</span> <span>{`${firstName}`}</span></>}
                  </BiographyList>
                  <BiographyList>
                    {lastName =="" ? null : <><span>Last Name</span> <span>{`${lastName}`}</span></>}
                  </BiographyList>
                  <BiographyList>
                    {username == "" ? null : <><span>Username</span> <span>{`${username}`}</span></>}
                  </BiographyList>
                  <BiographyList>
                    {aboutMe == "" ? null : <><span>About me</span> <span>{`${aboutMe}`}</span></>}
                  </BiographyList>
                  <BiographyList>
                    {birthDate == "" ? null : <><span>Birth Date</span> <span>{`${moment(birthDate).format("DD MMM YYYY")}`}</span></>}
                  </BiographyList>
                  <BiographyList>
                   {gender == "" ? null : <><span>Gender</span> <span>{`${gender}`}</span></>}
                  </BiographyList>
                  
                </BiographyContainer> 

         </>
     )
 }

 export default Biography