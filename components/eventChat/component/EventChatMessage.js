import React, { useEffect, useContext, useState } from 'react';
import ActionThread from '../assets/icons/ActionThread';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { HuePicker } from 'react-color';
import Axios from 'axios'
import { UserContext } from '../../../context/UserContext'
import SendIcon from '../assets/images/grey-sendIcon.png';

import dynamic from 'next/dynamic';
const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false });

export default function EventChatMessage(props) {
  const { socket, username, roomname, user_id, color, token } = props;
  const [state, setState] = useState({message: "", name: ""})
  const [chat, setChat] = useState([]);
  const [reply, setReply] = useState({text: ''});
  const [message, setMessage] = useState('');
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [showChatSettings, setChatSettings] = useState(false);
  const [showColor, setColor] = useState(false);
  const { user, setUser } = useContext(UserContext)

  useEffect(() => {

    const keyDownHandler = event => {
      if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('send-message').click();
        document.getElementById('message-input').value = '';
        setReply({text: ''});
      }
    };

    document.getElementById('message-form').addEventListener('keydown', keyDownHandler);

    return () => {
      document.getElementById('message-form')?.removeEventListener('keydown', keyDownHandler);
    };

  }, []);

  useEffect(()=>{
      setColor(color)
  },[])

  useEffect(() => {
  
    socket.on('message', messageListener);
    socket.on("NOTICE", noticeListener);
    socket.on("MEMO", memoListener);

    return () => {
      socket.off('message', messageListener);
      socket.off('NOTICE', noticeListener);
      socket.off('MEMO', memoListener);
    };

    setValue('')

  }, [chat, reply]);

  /*const color = useMemo(() => {
    return message.user?.color || getColor();
  }, [message?.id]); // eslint-disable-line*/


  const memoListener = (data) => {

    if( data.type == 'timeout'){
      setChat([...chat, { 
        type: data.type,
        username: data.username, 
        user_id: data.user_id, 
        message: data.message, 
        role: 'robot', 
        reply: false, 
        image: false,
        color: '#ffffff' 
      }]);
    }
    if( data.type == 'update' ){
      socket.emit('update_session', data)

      setChat([...chat, { 
        type: data.type,
        username: data.username, 
        user_id: data.user_id, 
        message: data.message, 
        role: 'robot', 
        reply: false, 
        image: false,
        color: '#ffffff' 
      }]);
    }
    if( data.type == 'ban' ){
      showBannedState();
    }
    if( data.type == 'unban' ){
      window.location.reload();
    }
  };

  const noticeListener = (data) => {

    if( typeof data.message !== 'undefined' ){

      
      if( data.type == 'ban' ) {}

      if( data.type == 'timeout' ){
        getChat().forEach((c,i,a) => {
          if( c.username == data.username && c.type == 'message' ){
            chat[i].message = 'message deleted';
          }
        })
        setChat(chat);
      }

      if( typeof data.message === 'undefined') return;

      setChat([ ...chat,  Object.assign(data, { 
        type: data.type,
        username: data.username, 
        user_id: data.user_id, 
        message: data.message, 
        role: 'robot', 
        reply: false, 
        image: false,
        color: '#ffffff' 
      })]);

    }
  };

  const messageListener = (data) => {

    setChat([ ...chat, { 
      type: data.type, 
      username: data.username, 
      user_id: data.user_id, 
      message: data.message,
      role: data.role, 
      reply: data.reply, 
      image: data.image, 
      color: data.color 
    } ]);
  };

  const getChat = () =>{
    return chat;
  }

  const showBannedState = () => {
    let form = document.getElementsByClassName('chat-column')[0];
    form.innerHTML = '<div class="banned-state">You are banned from chatting in this community.</div>';
  }

  function getTimeStamp(message) {
    let lastHours = message.created_at?.getHours();
    let lastMinutes = message.created_at?.getMinutes();
    let half = 'AM';

    if (lastHours === undefined || lastMinutes === undefined) {
      return '';
    }

    if (lastHours > 12) {
      lastHours = lastHours - 12;
      half = 'PM';
    }

    if (lastHours === 0)
      lastHours = 12;
    if (lastHours === 12)
      half = 'PM';

    if (lastMinutes.toString().length === 1) {
      lastMinutes = `0${lastMinutes}`;
    }

    return `${lastHours}:${lastMinutes} ${half}`;
  }

  const isMine = (message, reply) =>{
    if( typeof reply === 'undefined' ) return false;
    if( typeof reply.text === 'undefined' ) return false;
    if( ! reply.text.length ) return false;
    if( message.search(username) > 0 || reply.text.search(username) > 0 ){
      return true;
    }
    return false;
  }

  const getUsername = () => {

    return username;
  }

  const getProfileAvi = () =>{
    return user.avatar_urls.thumb;
  }

  // CHAT

  const renderChat = () => {
    return chat.map(({ type, username, user_id, message, role, reply, image, color }, index) => (
      <li key={index} data-username={type == 'message' ? username : 'robot'} data-mention={isMine(message,reply)}>
        <div className="message-text">

          {reply && reply.text.length ? <div className="repliedTo">{reply.text}</div> : ''}
          {image ? <div className="message-image"> <img src={image} /></div> : ''}
          
          <div className="message-container">
            {type == 'message' ? <><strong className="message-owner"><span style={{ color: color }}>{username}</span>:</strong><br /></> : ''}
            <span className="message">{message}</span>
          </div>
        </div>
        <div className="message-control">
          <ActionThread openThread={onOpenThread} />
        </div>
      </li>
    ))
  }

  const submitForm = (e) => {
    e.preventDefault();
    socket.emit('message', {
      type: 'message',
      message: message, 
      username : username, 
      roomname: roomname, 
      reply: reply ,
      user_id: user_id,
      image: user.avatar_urls.thumb,
      color: getColor()
    });    
    document.getElementById('message-input').value = '';
  }; 

  // EMOJIS

  const EmojiIcon = ({ openEmojiPicker }) => (
    <div onClick={() => { setShowPicker(val => !val); }} className="emoji-icon" style={{ cursor: 'pointer', display: 'flex' }}>
      <svg
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
        fillOpacity='0.5'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2ZM0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z'
          fill='white'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M9 7.5C9 8.32843 8.32843 9 7.5 9C6.67157 9 6 8.32843 6 7.5C6 6.67157 6.67157 6 7.5 6C8.32843 6 9 6.67157 9 7.5Z'
          fill='white'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M14 7.5C14 8.32843 13.3284 9 12.5 9C11.6716 9 11 8.32843 11 7.5C11 6.67157 11.6716 6 12.5 6C13.3284 6 14 6.67157 14 7.5Z'
          fill='white'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M5.42662 11.1807C5.87907 10.864 6.5026 10.9741 6.81932 11.4265C7.30834 12.1251 8.21252 12.9219 9.29096 13.1459C10.275 13.3503 11.6411 13.1262 13.2568 11.331C13.6263 10.9205 14.2585 10.8872 14.6691 11.2567C15.0796 11.6261 15.1128 12.2584 14.7434 12.6689C12.759 14.8738 10.7085 15.483 8.88421 15.1041C7.15432 14.7447 5.8585 13.5415 5.18085 12.5734C4.86414 12.121 4.97417 11.4974 5.42662 11.1807Z'
          fill='white'
        />
      </svg>
    </div>
  );

  const onEmojiClick = (event, emojiObject) => {
    let val = document.getElementById("message-input").value;
    setMessage(val + emojiObject.emoji);
    document.getElementById("message-input").value = val + emojiObject.emoji;
    setShowPicker(false);
  };

  // CHAT SETTINGS - COLOR

  const renderChatSettings = () => {
    return <div className="renderSettingsBox" style={{ padding:'8px',display: (showChatSettings ? 'block' : 'none') }}> 
      
      <div className="saveChatSettings" style={{float:'right'}}>
        <button onClick={saveColorChange}>Save</button>
      </div>
      
      <div style={{overflow: 'hidden', float: 'none'}}>
        
        <div className="label">
          Name Color: <span style={{ color: showColor }}>{username}</span>
        </div>

        <div>
          <HuePicker
            width="100%"
            color={ showColor }
            onChange={ handleColorChange } 
            /> 
        </div>        
      </div>

    </div>
  }

  const saveColorChange = (e) => {
    
    user.color = showColor
    setUser(user);

    e.preventDefault();
    let req_url = `${process.env.baseUrl}/wp-json/portl/v1/user/color/`;
    Axios.post(req_url, {color: showColor }, {

        headers : { Authorization:`Bearer ${token}`}
        
      }
    )
    setColor(showColor);
    setChatSettings(false);
  }

  const handleColorChange = (color, event) => {

    setColor(color.hex);
  }

  const ColorPicker = () => {
    return <div className="chat-settings" onClick={() => { setChatSettings(val => !val); }}>
    <svg 
      aria-hidden="true" 
      focusable="false" 
      data-prefix="fas" 
      data-icon="cog" 
      className="svg-inline--fa fa-cog fa-w-16 "
      role="img" 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 512 512">
        <path fill="currentColor" d="M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"></path>
    </svg>    
    </div>
  };

  const getColor = () => {

    return showColor;
  }

  // REPLIES

  const onOpenThread = event => {
    let limit = 40;
    let li = event.target.closest("li");
    let chatter = event.target.closest("li").querySelectorAll("strong.message-owner");
    let message = event.target.closest("li").querySelectorAll("span.message");

    chatter = chatter[0].innerText;
    message = message[0].innerText;

    let replayToMessage = ("Reply to @"+chatter+" "+message);
        replayToMessage = replayToMessage.length > limit 
                        ? replayToMessage.substring(0,limit) + '...' 
                        : replayToMessage;
    setReply({text:replayToMessage})
  }

  const onCancelReply = () => {

    setReply({text: ''});
  }

  const renderReply = () => {
    return reply.text.length ? (
      <div className="replyToBox">
        {reply.text}
        <span onClick={onCancelReply} ><FontAwesomeIcon icon={faTimes} /></span>
      </div>
    ) : '';
  }

  return (
    <>
    
    <div className="chat-container">
    <ul id="messages" className="render-chat">{renderChat()}</ul>
    </div>
    <form id="message-form" onSubmit={submitForm}>
      <ColorPicker />
      {renderReply()}
      {renderChatSettings()}
      <div className="text-chat position-relative">
        <EmojiIcon />
        <textarea
          type="text"
          name="message"
          id="message-input"
          autoComplete="off"
          onChange={(e) => {
            setMessage(e.currentTarget.value)
          }}
          placeholder="Say something..."
        ></textarea>
      </div>
      <button id="send-message" type="submit">
        <img className="sendIcon" src={SendIcon.src} />
      </button>
    </form>
    {showPicker && <Picker
          pickerStyle={{ width: '100%',"border-radius": "0px", "box-shadow":"none", "position":"absolute","bottom":"91px" }}
          onEmojiClick={onEmojiClick} />}
    </>
  );
};