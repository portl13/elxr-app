import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import { biographyForm } from "@components/profile-edit/biography.style";
import Loader from "@components/loader";
import { LoaderContainer } from "@components/livefeed/livefeed.style";
const Privacy = ({ handleUpdateSetting, setLoad, tabData, alertInfo }) => {
  const [loadData, setLoadData] = useState(false);
  const [fname, setFname] = useState();
  const [username, setUsername] = useState();
  const [lname, setLname] = useState();
  const [bdate, setBdate] = useState();
  const [memberType, setMemberType] = useState();
  const [gender, setGender] = useState();
  const [channelName, setChannelName] = useState();
  const [channelCat, setChannelCat] = useState();
  const [channelDesc, setChannelDesc] = useState();
  const [channelTwilId, setChannelTwilId] = useState();
  const [channelWowzId, setChannelWowzId] = useState();
  const [channelPrice, setChannelPrice] = useState();
  const [socialNetwork, setSocialNetwork] = useState();
  const [channelImage, setChannelImage] = useState();
  const [channelNoImage, setChannelNoImage] = useState();
  useEffect(() => {
    setFname(tabData.map((d) => d.value)[1]);
    setUsername(tabData.map((d) => d.value)[3]);
    setLname(tabData.map((d) => d.value)[2]);
    setBdate(tabData.map((d) => d.value)[5]);
    setMemberType(tabData.map((d) => d.value)[6]);
    setGender(tabData.map((d) => d.value)[7]);
    setChannelName(tabData.map((d) => d.value)[9]);
    setChannelCat(tabData.map((d) => d.value)[10]);
    setChannelDesc(tabData.map((d) => d.value)[11]);
    setChannelTwilId(tabData.map((d) => d.value)[12]);
    setChannelWowzId(tabData.map((d) => d.value)[13]);
    setChannelPrice(tabData.map((d) => d.value)[14]);
    setSocialNetwork(tabData.map((d) => d.value)[15]);
    setChannelImage(tabData.map((d) => d.value)[16]);
    setChannelNoImage(tabData.map((d) => d.value)[17]);
  }, [tabData]);
  useEffect(() => {
    setLoadData(true);
  }, []);
  return (
    <div className={"container container-80"}>
      <Form css={biographyForm} className="group-manage-form privacy-form">
        {!loadData && (
          <p css={LoaderContainer}>
            <span>
              <FontAwesomeIcon icon={faClock} />
            </span>
            Loading Data. Please wait.
          </p>
        )}
        {loadData && (
          <>
            <h2>Profile Visibility Settings</h2>
            <h3 className="select-text">
              Select who may see your profile details.
            </h3>
            <div className="privacy-box-panel bg-new">
              <div className="main-tag">
                <span>Biography</span>
                <span>Visibility</span>
              </div>
              <FormGroup className="inner-tag">
                <Label>First Name</Label>
                <Label>Public</Label>
              </FormGroup>
              <FormGroup className="inner-tag">
                <Label>Last Name</Label>
                <Input
                  type="select"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                >
                  <option value="public">Public</option>
                  <option value="loggedin">All Members</option>
                  <option value="friends">My Connections</option>
                  <option value="adminsonly">Only Me</option>
                </Input>
              </FormGroup>
              <FormGroup className="inner-tag">
                <Label>Username</Label>
                <Label>Public</Label>
              </FormGroup>
              <FormGroup className="inner-tag">
                <Label>Birthdate</Label>
                <Input
                  type="select"
                  value={bdate}
                  onChange={(e) => setBdate(e.target.value)}
                >
                  <option value="public">Public</option>
                  <option value="loggedin">All Members</option>
                  <option value="friends">My Connections</option>
                  <option value="adminsonly">Only Me</option>
                </Input>
              </FormGroup>
              <FormGroup className="inner-tag">
                <Label>Member Type</Label>
                <Input
                  type="select"
                  value={memberType}
                  onChange={(e) => setMemberType(e.target.value)}
                >
                  <option value="public">Public</option>
                  <option value="loggedin">All Members</option>
                  <option value="friends">My Connections</option>
                  <option value="adminsonly">Only Me</option>
                </Input>
              </FormGroup>
              <FormGroup className="inner-tag">
                <Label>Gender</Label>
                <Input
                  type="select"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="public">Public</option>
                  <option value="loggedin">All Members</option>
                  <option value="friends">My Connections</option>
                  <option value="adminsonly">Only Me</option>
                </Input>
              </FormGroup>
            </div>
          </>
        )}
      </Form>
      <div className="lower-alert-panel d-flex justify-content-end">
        <button
          className="btn btn-create"
          onClick={() => {
            const data = `
                  fields[${tabData.map((d) => d.name)[1]}]=${fname}&
                  fields[${tabData.map((d) => d.name)[2]}]=${lname}&
                  fields[${tabData.map((d) => d.name)[3]}]=${username}&
                  fields[${tabData.map((d) => d.name)[5]}]=${bdate}&
                  fields[${tabData.map((d) => d.name)[6]}]=${memberType}&
                  fields[${tabData.map((d) => d.name)[7]}]=${gender}&
                  fields[${tabData.map((d) => d.name)[9]}]=${channelName}&
                  fields[${tabData.map((d) => d.name)[10]}]=${channelCat}&
                  fields[${tabData.map((d) => d.name)[11]}]=${channelDesc}&
                  fields[${tabData.map((d) => d.name)[12]}]=${channelTwilId}&
                  fields[${tabData.map((d) => d.name)[13]}]=${channelWowzId}&
                  fields[${tabData.map((d) => d.name)[14]}]=${channelPrice}&
                  fields[${tabData.map((d) => d.name)[15]}]=${socialNetwork}&
                  fields[${tabData.map((d) => d.name)[16]}]=${channelImage}&
                  fields[${tabData.map((d) => d.name)[17]}]=${channelNoImage}
                `;
            handleUpdateSetting(data);
          }}
        >
          Save Changes {setLoad && <Loader />}
        </button>
        {alertInfo === true ? (
          <Alert>Your profile settings have been saved</Alert>
        ) : null}
      </div>
    </div>
  );
};
export default Privacy;
