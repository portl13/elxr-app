import React, { useState } from "react";
import MainSidebar from "@components/main/MainSidebar";
import BlockUi from "@components/ui/blockui/BlockUi";
import BackButton from "@components/shared/button/BackButton";
import ListNavItem from "@components/layout/ListNavItem";
import MainLayout from "@components/main/MainLayout";
import { faHeadphones } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AlbumCreate from "@components/album/AlbumCreate";

function AlbumCreatePage() {
  const [isSaving, setIsSaving] = useState(false);
  return (
    <MainLayout sidebar={<MainSidebar />} title={"Create a Album"}>
      <div className="position-relative">
        {isSaving && <BlockUi color="var(--primary-color)" />}
        <div className="container px-3 px-md-5 pt-5">
          <BackButton />
          <div className="container container-80">
            <div className="py-5">
              <ListNavItem
                data={{
                  title: "Create a Album",
                  type: "heading",
                  icon: (
                    <FontAwesomeIcon
                      className={"text-primary"}
                      icon={faHeadphones}
                    />
                  ),
                }}
              />
              <div className="row flex-column">
                <AlbumCreate setIsSaving={setIsSaving} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default AlbumCreatePage;
