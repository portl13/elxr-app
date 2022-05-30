import React, { useEffect, useRef } from 'react'
import usePortlApi from '../../../hooks/usePortlApi'
import VideoEventMain from './VideoEventMain'

import { EventVideoContainer } from './VideoEventStyle'

export default function VideoEvent(props) {

    const {vendor_id} = props

    const videoRef = useRef()

    const { data , isLoadingStore } = usePortlApi(`stream?user_id=${vendor_id}`)

    useEffect(() => {
        const videoHeight = videoRef.current.clientHeight
        props.setVideoHeight(videoHeight)
      }, [])

    return (
        <EventVideoContainer ref={videoRef}>
            {data && <VideoEventMain {...{
                ...props,
                    streamData: data.data
                }} />}
        </EventVideoContainer>
    )
}
