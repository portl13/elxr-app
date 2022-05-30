import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { TIMEOUT } from "../../../utils/constant";
import { Input, Label, Button } from "reactstrap";
import {
  getSocialDetails,
  updateSocailSetting,
} from "../../../pages/api/channel-social.api";
import Loader from "../../loader";
function Setting({ user }) {
  const alert = useAlert();
  const [loader, setLoader] = useState(true);
  const [result, setResult] = useState();
  const [twitter, setTwitter] = useState();
  const [facebook, setFaceBook] = useState();
  const [instagram, setInstagram] = useState();
  const [youtube, setYoutube] = useState();
  const [linkedin, setLinkedin] = useState();
  const [gplus, setGooglePlus] = useState();
  const [snapchat, setSnapchat] = useState();
  const [pinterest, setPinterest] = useState();
  const updateState = (data) => {
    setTwitter(data.twitter);
    setFaceBook(data.facebook);
    setInstagram(data.instagram);
    setYoutube(data.youtube);
    setLinkedin(data.linkedin);
    setGooglePlus(data.gplus);
    setSnapchat(data.snapchat);
    setPinterest(data.pinterest);
  };
  useEffect(() => {
    getSocialDetails(user)
      .then((res) => {
        setResult(res.data);
        updateState(res.data.data);
        setLoader(false);
      })
      .catch(() => setLoader(false));
  }, [user]);
  const updateSocialSetting = () => {
    const formData = {
      user_id: user.id,
      data: {
        twitter,
        facebook,
        youtube,
        instagram,
        linkedin,
        gplus,
        snapchat,
        pinterest,
      },
    };
    updateSocailSetting(user, formData)
      .then(() => {
        alert.success("Social Settings updated successfully.", TIMEOUT);
      })
      .catch(() => {
        alert.error("Please update any value.", TIMEOUT);
      });
  };
  if (loader) {
    return (
      <div style={{ textAlign: "center" }}>
        <Loader color="primary" />
      </div>
    );
  }
  return (
    <>
      {result && (
        <>
          <div className="store-panel">
            <Label>Twitter</Label>
            <Input
              type="text"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
            />
          </div>
          <div className="store-panel">
            <Label>Facebook</Label>
            <Input
              type="text"
              value={facebook}
              onChange={(e) => setFaceBook(e.target.value)}
            />
          </div>
          <div className="store-panel">
            <Label>Instagram</Label>
            <Input
              type="text"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
            />
          </div>
          <div className="store-panel">
            <Label>YouTube</Label>
            <Input
              type="text"
              value={youtube}
              onChange={(e) => setYoutube(e.target.value)}
            />
          </div>
          <div className="store-panel">
            <Label>LinkedIn</Label>
            <Input
              type="text"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
            />
          </div>
          <div className="store-panel">
            <Label>Tiktok</Label>
            <Input
              type="text"
              value={gplus}
              onChange={(e) => setGooglePlus(e.target.value)}
            />
          </div>
          <div className="store-panel">
            <Label>Snapchat</Label>
            <Input
              type="text"
              value={snapchat}
              onChange={(e) => setSnapchat(e.target.value)}
            />
          </div>
          <div className="store-panel">
            <Label>Twitch</Label>
            <Input
              type="text"
              value={pinterest}
              onChange={(e) => setPinterest(e.target.value)}
            />
          </div>
          <div className="button-tab">
            <Button onClick={() => updateSocialSetting()}>SAVE</Button>
          </div>
        </>
      )}
    </>
  );
}
export default Setting;
