import axios from "axios";
import Router from "next/router";
import { useRef, useEffect, useContext } from "react";
import { UserContext } from '../context/UserContext'
import { format } from 'date-fns';

const defaultData = {
    name: {
        id: 1
    },
    last_name: {
        id: 31
    },
    about_me: {
        id: 25
    },
    birthdate: {
        id: 26
    },
    gender: {
        id: 27
    },
    channel: {
        id: 113
    }
}

function useUpdateProfile({ setBlocking }) {

    const baseUrl = process.env.bossApi + '/xprofile/'

    const { user } = useContext(UserContext)

    const isMounted = useRef(true);

    const updateProfile = async (data) => {

        setBlocking(true)

        const config = {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        }

        for (const value in data) {
            defaultData[value].value = data[value]
        }

        const requests = []

        for (const field in defaultData) {

            if (defaultData[field].id === 26) {
                defaultData[field].value = format(defaultData[field].value, "yyyy-MM-dd HH:mm:ss")
            }

            if (defaultData[field].id !== 113) {
                requests.push(axios.patch(baseUrl + defaultData[field].id + '/data/' + user.id, {
                    value: defaultData[field].value
                }, config))
            }

        }


        try {
            if (isMounted) {
                const result = await Promise.all(requests)

                if (defaultData.channel.value === 'yes') {
                    Router.push('/create-channel')
                } else {
                    Router.push('/')
                }

            }
        } catch (error) {
            console.log(error);
            setBlocking(false)
        }

    }

    useEffect(() => {
        return () => {
            isMounted.current = false;
            setBlocking(false)
        }
    }, [])

    return {
        updateProfile
    }
}

export default useUpdateProfile
