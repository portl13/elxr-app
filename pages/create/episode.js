import React, { useState } from "react";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import BlockUi from "@components/ui/blockui/BlockUi";
import BackButton from "@components/shared/button/BackButton";
import ListNavItem from "@components/layout/ListNavItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPodcast} from "@fortawesome/free-solid-svg-icons";
import EpisodeCreate from "@components/podcasts/EpisodeCreate";

function Episode() {
  const [isSaving, setIsSaving] = useState(false);
  return (
    <MainLayout sidebar={<MainSidebar />} title={"Create an Episode"}>
      <div className="position-relative">
        {isSaving && <BlockUi color="var(--primary-color)" />}
        <div className="container px-3 px-md-5 pt-5">
          <BackButton />
          <div className="container container-80">
            <div className="py-5">
              <ListNavItem
                data={{
                  title: "Create an Episode",
                  type: "heading",
                  icon: (
                    <FontAwesomeIcon
                      className={"text-primary"}
                      icon={faPodcast}
                    />
                  ),
                }}
              />
              <div className="row">
                  <EpisodeCreate setIsSaving={setIsSaving} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Episode;
