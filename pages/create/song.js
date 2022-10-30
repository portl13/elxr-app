import React, { useState } from "react";
import MainSidebar from "@components/main/MainSidebar";
import BlockUi from "@components/ui/blockui/BlockUi";
import BackButton from "@components/shared/button/BackButton";
import ListNavItem from "@components/layout/ListNavItem";
import MainLayout from "@components/main/MainLayout";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SongCreate from "@components/song/SongCreate";

function Song() {
  const [isSaving, setIsSaving] = useState(false);
  return (
    <MainLayout sidebar={<MainSidebar />} title={"Create a Song"}>
      <div className="position-relative">
        {isSaving && <BlockUi color="var(--primary-color)" />}
        <div className="container px-3 px-md-5 pt-5">
          <BackButton />
          <div className="container container-80">
            <div className="py-5">
              <ListNavItem
                data={{
                  title: "Create a Song",
                  type: "heading",
                  icon: (
                    <FontAwesomeIcon
                      className={"text-primary"}
                      icon={faMusic}
                    />
                  ),
                }}
              />
              <div className="row">
                <SongCreate isSaving={isSaving} setIsSaving={setIsSaving} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Song;
