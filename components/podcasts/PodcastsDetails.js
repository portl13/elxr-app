import React, { useContext, useEffect } from "react"
import MainLayout from "@components/main/MainLayout"
import PodcastsRelated from "./PodcastsRelated"
import SkeletonEventDetail from "@components/SkeletonLoading/events/SkeletonEventDetail"
import { UserContext } from "@context/UserContext"
import PodcastsInfo from "@components/podcasts/PodcastsInfo"
import { countView } from "@request/shared"
import SeoMetaComponent from "@components/seo/SeoMetaComponent"
import { stringToSlug } from "@lib/stringToSlug"

function PodcastsDetails({ id, audio }) {
  const { user } = useContext(UserContext)
  const isLoading = !audio

  useEffect(() => {
    if (id) {
      countView(id).then()
    }
  }, [id])

  return (
    <>
      <SeoMetaComponent
        title={`Elxr | ${audio?.title}`}
        description={audio?.description}
        titleContent={audio?.title}
        image={audio?.thumbnail}
        url={
          process.env.nextSite + `/podcasts/${stringToSlug(audio?.title)}/${id}`
        }
      />
      <MainLayout branding={audio?.branding}>
        <section className="row">
          <div className="col-12  col-xl-10">
            {isLoading ? <SkeletonEventDetail /> : null}
            {!isLoading ? <PodcastsInfo user={user} audio={audio} /> : null}
          </div>

          <div className="col-12  col-xl-2">
            <h4 className="text-center text-uppercase font-size-18">
              More podcasts like this
            </h4>
            {audio && <PodcastsRelated category={audio?.category_id} />}
          </div>
        </section>
      </MainLayout>
    </>
  )
}

export default PodcastsDetails
