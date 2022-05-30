import React from 'react';
import { Thread } from 'stream-chat-react';


import { EventChatMessage } from './EventChatMessage';
import { EventChatMessageInput } from './EventChatMessageInput';

export const EventChatThread = () => {
  return (
    <>
      <Thread Message={EventChatMessage} Input={EventChatMessageInput} />
    </>
  );
};
