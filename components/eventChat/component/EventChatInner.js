import React from 'react';
import { logChatPromiseExecution } from 'stream-chat';
import { MessageInput, MessageList, useChannelActionContext, Window } from 'stream-chat-react';
import { EventChatMessage } from './EventChatMessage';
import { EventChatMessageInput } from './EventChatMessageInput';
import { EventChatThread } from './EventChatThread';
import Link from 'next/link';



export const GamingChatInner = (props) => {
  const {
    timestamp,
    setTimestamp,
    auth
  } = props;

  const { sendMessage } = useChannelActionContext();

  const overrideSubmitHandler = (message) => {

    const sendMessagePromise = sendMessage(message);

    logChatPromiseExecution(sendMessagePromise, 'send message');
  };

  return (
    <>
      <Window>
        <MessageList Message={(props) => <EventChatMessage {...props} {...{ timestamp }} />} />
        {auth ? (
        <MessageInput
          focus
          grow
          Input={(props) => (
            <EventChatMessageInput {...props}  />
          )}
          overrideSubmitHandler={overrideSubmitHandler}
        />
        ) : (
          <Link href="/login">
            <a style={{
              borderRadius: 0
            }} className="btn btn-primary">
              login to participate in the chat
            </a>
          </Link>
        )}
      </Window>
      <EventChatThread />
    </>
  );
};
