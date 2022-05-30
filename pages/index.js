import React from 'react';
import Head from 'next/head';
import { Col } from 'reactstrap';
import Layout from '../components/layout/Layout';
import HomeCommunities from '../components/home/HomeCommunities';
import HomeEvents from '../components/home/HomeEvents';
import HomeCarousel from '../components/home/HomeCarousel';


export default function Home() {
  return (
    <Layout>
      <Head>
        <title>WeShare</title>
      </Head>
      <Col className='bg-black bd-radius py-3 col-padding' xs='12'>
        <HomeCarousel />
        <HomeCommunities />
        <HomeEvents />
      </Col>
    </Layout>
  );
}