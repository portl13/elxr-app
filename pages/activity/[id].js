import React, { useEffect, useContext, useState } from "react";
import { useRouter } from 'next/router';
import Head from 'next/head';
import { v4 as uuidv5 } from 'uuid';

import { UserContext } from '../../context/UserContext';
import Loader from "../../components/loader";
import Layout from '../../components/layout/Layout';
import LiveFeedCard from "../../components/livefeed/LiveFeedCard";
import { getActivity } from "../api/feeds.api";

const CommentWrapper = () => {
    const router = useRouter();
    const { user } = useContext(UserContext)
    const [activity, setActivity] = useState(null)
    const query = router.query;
    const { id = null } = query

    useEffect(() => {
        if (id) {
            getActivity(user, id).then((res) => {
                setActivity([res.data])
            })
        }
    }, [id])
    return (
        <Layout>
            <Head>
                <title>WeShare</title>
            </Head>
            <div className="d-flex flex-column flex-fill w-100">
                {!activity ? <div style={{ textAlign: "center" }}><Loader color="primary" /></div> : ""}
                {activity && activity.map(act => (
                    <LiveFeedCard
                        key={`${act.id}-${uuidv5()}`}
                        activity={act}
                        activityList={activity}
                        setActivityList={setActivity}
                        isComment={true}
                    />))}
            </div>
        </Layout>
    );
};

export default CommentWrapper;
