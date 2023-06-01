import React from "react"
import MainLayout from "@components/main/MainLayout"
import VideoCreateForm from "@components/dashboard/video/VideoCreateForm"

function CreateVideo() {
  return (
    <MainLayout title="Create Video">
      <VideoCreateForm />
    </MainLayout>
  )
}

export default CreateVideo
