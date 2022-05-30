import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import { Col } from 'reactstrap';

import Layout from '../components/layout/Layout'
import { UserContext } from '../context/UserContext';
import useLoadMore from '../hooks/useLoadMore';
import Axios from 'axios';

import { v4 as uuidv5 } from 'uuid';
import useRequestWp from '../hooks/useRequestWp';
import { SkeletoConnect } from '../components/profile/profile-skeleton';
import { ButtonSmall } from '../components/ui/button/ButtonSmall';

const CardMessageDetail = ({ message }) => {


  const { avatar: {
    thumb = '/img/avatar.jpg',
    },
    excerpt:{
      rendered = ''
    },
    current_user,
    recipients,
  } = message;

  let other_user;

  for (const user_id in recipients) {
      if(user_id !== current_user){
        other_user = recipients[user_id];
      }
  }
  

  return (
    <div className="row mb-3">
      <div className="col-auto">
        <img css={{
          'minWidth' : 45,
          'minHeight' : 45
        }} className="avatar" width="45" height="45" src={thumb} alt={`image avatar`} />
      </div>
      <div className="col-6 ml-0">
          <h2 className="h4">{other_user.name}</h2>
          <p dangerouslySetInnerHTML={{ __html:rendered }} />
      </div>
      <div className="col-3">
        <ButtonSmall className="btn" > 
            unread
        </ButtonSmall>
      </div>
    </div>
  );
}



function MessagePage() {

  const { user } = useContext(UserContext)

  const getMessages = ({ source, token, extra }) => {

    return Axios.get(process.env.bossApi + '/messages', {
      params: {
        user_id: extra
      },
      headers: {
        'Authorization': `Bearer ${token}`
      },
      cancelToken: source.token
    });

  }

  const [messages, error] = useRequestWp(getMessages, user?.token, user?.id)

  const loadingCard = [...Array(5).keys()]

  return (
    <Layout>
      <Head>
        <title>Message</title>
      </Head>

      <Col xs="12" md="9">
        <Col className="mb-5 mt-4">
            <h2>Message</h2>
        </Col>

      {messages && messages.map(message => (
        <CardMessageDetail key={message.id} message={message} />
      ))}

      {!messages ? (loadingCard.map(load =>(
          <Col key={load} xs="12">
            <SkeletoConnect  />
          </Col>
        ))
      ) : ''}

      { messages && messages.length === 0 ? (
          <div className="p-4 text-center">
              <h3>No messages available</h3>
          </div>
      ) : '' }
      </Col>
      <Col md="3">

      </Col>
    </Layout>
  );
}



export default MessagePage;
