import React, { useState, useEffect } from "react";
import { Label, Input, Button , Alert, Spinner} from "reactstrap";
import { searchField } from "../../components/livefeed/livefeed.style";
import { getGroupMembers, getMemberDetail, sendInvite} from "../api/meet.api";
import FriendMeetCard from "./FriendMeetCard";
import JitsiMeet from "./JitsiMeet";
import Loader from "../../pages/profile/loader";

function FriendMeet({ user, id }) {
  const [roomName, setRoomName] = useState("");
  const [searchText, setSearchText] = useState("");
  const [result, setResult] = useState([]);
  const [memberId, setMemberId] = useState([]);
  const [showMeet, setShowMeet] = useState(false);
  const [loader, setLoader] = useState(false);
  const [load,setLoad] = useState(false)
  const [msg,setMsg] = useState(false)
  const [errorMsg, setErrorMsg] = useState(false)
  const [displayName, setDisplayName] = useState("");
  useEffect(() => {
    if (user?.id) {
      getMemberData();
    }
  }, [user]);
  function getMemberData() {
    getMemberDetail(user).then((res) => {
      setDisplayName(res.data.name);
    });
  }

  function getMember() {
    getGroupMembers(user, id, searchText).then((res) => {
      var member_id = memberId.includes(
        parseInt(res.data.map((d) => d.id).toString())
      );
      setLoader(false);
      
      if(res.data.length == 0){
        setErrorMsg(true)
        setTimeout(()=>setErrorMsg(false),[2000])
      }
      if (!member_id) {
        setResult([...result, ...res.data]);
        var newData = res.data.map((d) => d.id);
        setMemberId([...memberId, ...newData]);
      }
    });
  }
  const handleSearch = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      setLoader(true);
      getMember();
    } else {
      const search = e.target ? e.target.value : e;
      setSearchText(search);
    }
  };
  function removeId(childData) {
    setResult(result.filter((item) => item.id !== childData));
    setMemberId(memberId.filter((item) => item !== childData));
  }
  function sendMeetInvite() {
    const formData={
      group_id: parseInt(id),
      room_name: roomName,
      users: memberId
    }
    console.log("data:", formData);
    setLoad(true)
    sendInvite(user,formData).then((res)=>{
      console.log(res.data)
      setLoad(false)
      setMsg(true)
      setTimeout(()=>setMsg(false),[1000])
      setShowMeet(true);
    })
    setShowMeet(true)
  }

  const apiReady = (api) => {
    api.addListener('readyToClose', (payload) => setShowMeet(false))
    api.addListener('participantLeft', (payload) => setShowMeet(false))
  }
  return (
    <>
      {!showMeet && (
        <>
          <div className="friend-meet-container">
            <div className="main-content">
              <Label>Room Name</Label>
              <Input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
              />
              <Label>Search for members to invite in the room</Label>
              <Input
                css={searchField}
                type="search"
                name="search"
                value={searchText}
                onChange={handleSearch}
                onKeyDown={handleSearch}
                placeholder={`Search Members`}
              />
              {errorMsg && <Alert color="danger">User not a group member</Alert>}
            </div>
              {loader && memberId.length === 0 && <Loader />}
              {result &&
                result.map((d) => (
                  <FriendMeetCard
                    member={d.id}
                    name={d.name}
                    image={d.avatar_urls.thumb}
                    removeId={removeId}
                  />
                ))}
              <div className="button-panel">
                {result.length !== 0 && roomName && (
                  <Button onClick={() => sendMeetInvite()} className="send-invite">{load && <Spinner style={{ width: '1.2rem', height: '1.2rem' }}/>}Send Invite</Button>
                )}
                {msg && <Alert color="success">Meet Invitation send Successfully</Alert>}
              </div>
          </div>
          </>
        )}
        {showMeet && <JitsiMeet onApiReady={apiReady} roomName={roomName} displayName={displayName} />}
    </>
  );
}
export default FriendMeet;
