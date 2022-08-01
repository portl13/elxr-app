import {useEffect, useRef, useState } from 'react'
import { Client } from '@livepeer/webrtmp-sdk'

function useStream(stream_key) {

  const videoPreview = useRef(null)
  const stream = useRef(null)
  const session = useRef(null)
  const [isActive, setIsActive] = useState(false)
  const [muted, setMuted] = useState(true)
  const [video, setVideo] = useState(true)
  const [streamKey, setStreamKey] = useState(null)

  const getLocalVideo = async () => {
    videoPreview.current.volume = 0

    stream.current = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    })

    videoPreview.current.srcObject = stream.current

    videoPreview.current.play()
  }

  const startStream = async () => {
    if (!streamKey) {
      return
    }

    if (!stream.current) {
      await getLocalVideo()
    }

    const client = new Client()

    session.current = client.cast(stream.current, streamKey)

    session.current.on('open', () => {
      setIsActive(true)
    })

    session.current.on('close', () => {
      setIsActive(false)
    })

    session.current.on('error', (err) => {})
  }

  const stopCameraAndMic = () => {
    stream.current.getTracks().forEach((track) => track.stop())
    stream.current = null
  }

  const showCamera = () => {
    stream.current.getVideoTracks().forEach((track) => {
      const enabled = !track.enabled
      setVideo(enabled)
      track.enabled = enabled
    })
  }

  const showMuted = () => {
    stream.current.getAudioTracks().forEach((track) => {
      const enabled = !track.enabled
      setMuted(enabled)
      track.enabled = enabled
    })
  }

  const stopStream = () => {
    session.current.close()
  }

  useEffect(() => {
    getLocalVideo()
  }, [])

  useEffect(() => {
    return () => stopCameraAndMic()
  }, [])

  useEffect(() => {
    if (stream_key) {
        setStreamKey(stream_key)
    }
  }, [stream_key])
  

  return {
    isActive,
    muted,
    video,
    videoPreview,
    startStream,
    showCamera,
    showMuted,
    stopStream,
  }
}

export default useStream
