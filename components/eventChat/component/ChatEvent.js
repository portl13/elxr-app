import React, { useEffect, useState } from 'react';

import { getColor } from '../../../lib/color';
import { EventChatContainer } from './EventChatStyle';
import { NodeChatContainer } from './NodeChatStyle';
import { EventChatThreadHeader } from './EventChatThreadHeader';
import EventChatMessage from './EventChatMessage';

import axios from 'axios';
import { v4 as uuidv5 } from 'uuid';
import io from "socket.io-client";

import SendIcon from '../assets/icons/SendIcon';
import ActionThread from '../assets/icons/ActionThread';
import CardBlogs from '@components/creator/cards/CardBlogs';


const apiKey = '';//process.env.NEXT_PUBLIC_GETSTREAM_KEY


export default function ChatEvent(props) {
  const { user, vendor_id, owner, auth } = props;

  const [channel, setChannel] = useState(null)
  const [state, setState] = useState({message: "", name: ""})
  const [socket, setSocket] = useState(null);

  useEffect(
    () => {

      const username = user.mention_name; // <--- user is null
      const newSocket = io(`https://socket.portl.live`);

      setSocket(newSocket);

      newSocket.emit("join", {
        owner : owner,
        username: username, 
        roomname : vendor_id,
        user_id: user.id
      });

      return () => newSocket.close();

    }, [setSocket]
  )

  const getUsername = () => {
    return user.mention_name;
  }
  const getUserId = () => {
    return user.id;
  }
  const getUserColor = () => {
    return user.color;
  }
  const getUserToken = () => {
    return user.token;
  }

/*
  const showBannedState = () => {
    document.getElementById('messages').remove();
    document.getElementById('message-input').remove();
    document.getElementById('message-form').style.height = '100%';
    document.getElementById('message-form').innerHTML = '<div class="banned-message"><h4>You are banned from chatting in this community.</h4></div>';
  }

  */

  return (
    <NodeChatContainer>
    { socket ? (
      <>
      <div className="chat-header">Live Chat</div>
        <EventChatMessage socket={socket} username={getUsername()} roomname={vendor_id} user_id={getUserId()} color={getUserColor()} token={getUserToken()}/>
      
      </>
    ) : (
      <div>Not Connected</div>
    )}
    </NodeChatContainer>
  )
}
