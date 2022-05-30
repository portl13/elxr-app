import React, { useContext, useEffect, useState } from 'react'
import { css } from '@emotion/core'
import { UserContext } from '../../context/UserContext'
import axios from 'axios'
import { useRouter } from 'next/router'

const ChannelFollowerButtonStyle = css`
  background-color: #1c1c1c;
  &:hover {
    color: #fff;
  }
`

const portlApiUrl = process.env.baseUrl + '/wp-json/portl/v1/'

const ChannelFollowerButton = (props) => {
  const { followers } = props

  const { user } = useContext(UserContext)
  const { query } = useRouter()

  const [isFollow, setIsFollow] = useState(false)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!followers) return

    const { data } = followers
    for (let i = 0; i < data.length; i++) {
      const follower = data[i]
      if (Number(user.id) === Number(follower.ID)) {
        setIsFollow(true)
      }
    }
  }, [followers])

  const follow = async () => {
    setLoading(true)
    try {
      await axios.post(
        `${portlApiUrl}channel/followers`,
        {
          channel_id: query.id,
          follower_id: user.id,
        },
        {
          headers: {
            Authorization: 'Bearer ' + user.token,
          },
        }
      )
      setIsFollow(true)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const unFollow = async () => {
    setLoading(true)
    try {
      await axios({
        method: 'delete',
        url: `${portlApiUrl}channel/followers`,
        data:{
          channel_id: query.id,
          follower_id: user.id,
        },
        headers:{
          Authorization: 'Bearer ' + user.token,
        }
      })
      setIsFollow(false)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {isFollow ? (
        <button
          onClick={() => unFollow()}
          css={ChannelFollowerButtonStyle}
          disabled={loading}
          className="btn btn-sm mx-2 text-white"
        >
          Unfollow
        </button>
      ) : (
        <button
          onClick={() => follow()}
          css={ChannelFollowerButtonStyle}
          disabled={loading}
          className="btn btn-sm mx-2 text-white"
        >
          Follow
        </button>
      )}
    </>
  )
}

export default ChannelFollowerButton
