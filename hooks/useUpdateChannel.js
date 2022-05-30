import axios from "axios";
import Router from "next/router";
import { useState, useRef, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

const useUpdateChannel = (setBlocking) => {

    const baseUrl = process.env.bossApi + '/xprofile/'
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const { user } = useContext(UserContext)

    const isMounted = useRef(true)

    const updateChannel = async ({
        channel_name,
        channel_category,
        channel_description,
        social
    }) => {

        setBlocking(true)

        const config = {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        }

        const bodyChannel = {
            'user_id': user.id,
            'member_type': 'channel'
        }

        let networks = Object.assign({ id: 102 }, { value: social })

        const sendData = [channel_name, channel_category, channel_description, networks]

        const requests = [axios.post('/api/channel', bodyChannel)];

        for (const data of sendData) {
            if (
                data?.value.length !== 0 ||
                data?.value.length !== null ||
                data?.value.length !== undefined) {
                requests.push(axios.patch(baseUrl + data.id + '/data/' + user.id, {
                    value: data?.value
                }, config))
            }
        }

        try {

            const data = await Promise.all(requests);

            Router.push(`/channel/${user.user_login}`)

        } catch (error) {
            setError(true)
            setBlocking(false)
            console.log(error);
        }



    }

    useEffect(() => {
        return () => {
            isMounted.current = false
            setBlocking(false)
        }
    }, [])

    return {
        success,
        error,
        updateChannel
    };
}

export default useUpdateChannel;
