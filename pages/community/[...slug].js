import React, { useContext, useEffect, useState } from 'react';
import { Col } from 'reactstrap';
import Head from 'next/head'
import HeaderCommunity from '../../components/layout/HeaderCommunity';
import Layout from '../../components/layout/Layout';
import Axios from 'axios';
import useRequestWp from '../../hooks/useRequestWp';
import useLoadMore from '../../hooks/useLoadMore';
import { useRouter } from 'next/router';
import { UserContext } from '../../context/UserContext';
import { v4 as uuidv5 } from 'uuid';
import LiveFeedCard from '../../components/livefeed/LiveFeedCard';

export default function commnunitySinglePage() {

  const router = useRouter();

  const query = router.query;

  const { slug } = query;

  const { user } = useContext(UserContext);

  const [activity, setActivity] = useState([])

  const [community, setCommunity] = useState({
    name: "",
    cover_url: null,
    avatar_urls: {
      full: null
    },
    description: { raw: '' },
    types: [],
    status: "",
    is_member: null
  })


  const getCommunity = ({ source, token, extra }) => {

    return Axios.get(process.env.bossApi + '/groups/' + extra[1], {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      cancelToken: source.token
    }).catch((err) => console.log(err));

  }

  const getActivities = ({ per_page, page, source, token, extra }) => {

    return Axios.get(process.env.bossApi + '/activity', {
      params: {
        page,
        per_page,
        group_id: extra[1]
      },
      headers: {
        'Authorization': `Bearer ${token}`
      },
      cancelToken: source.token
    }).catch((err) => console.log(err));

  }

  const [dataCommunity, error] = useRequestWp(getCommunity, user?.token, slug);

  const { data, loadMore, noMore, loading } = useLoadMore(getActivities, user?.token, slug);


  useEffect(() => {

    if (!dataCommunity) return;

    setCommunity(dataCommunity)

  }, [dataCommunity])


  useEffect(() => {

    if (!data) return;

    setActivity([...activity, ...data])

  }, [data])

  return (
    <Layout>
      <Head>
        <title>WeShare | communities</title>
      </Head>
      <Col xs="12" lg="9">

        <HeaderCommunity community={community} />

        <Col xs="12 mt-4">
          <h3 css={{ fontSize: '1.2rem' }}>ACTIVITY</h3>
        </Col>
        <div className="col mt-5">
          {activity.map(act => (
            <LiveFeedCard key={`${act.id}-${uuidv5()}`} activity={act}            
            activityList={activity}
            setActivityList={setActivity}
            showProfileGroup={true} />
          ))}
        </div>
      </Col>
      <Col lg="3"></Col>
    </Layout>
  );
}



