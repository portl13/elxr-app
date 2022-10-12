import React, { useEffect, useState } from 'react';
import transformXprofileData from '../../helpers/transformXprofileData';
import { useChannel } from '@hooks/useChannel';
import ChannelDetail from './ChannelDetail';
import ChannelLoadDetail from './ChannelLoadDetail';

const Channel = ({ user_login }) => {

    const [data, setData] = useState(null)

    const {
        channel,
        isLoading,
        isError
    } = useChannel(user_login);


    useEffect(() => {
        if (channel) {
            setData(transformXprofileData(channel, 8));
        }

    }, [channel])

    return (
        <>
            {data && <ChannelDetail channel={data} />}
            {isLoading && <ChannelLoadDetail />}
        </>
    )
}

export default Channel
