import React, { useState } from "react";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import BlockUi from "@components/ui/blockui/BlockUi";
import BackButton from "@components/shared/button/BackButton";
import ListNavItem from "@components/layout/ListNavItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import PhotoCreate from "@components/dashboard/photo/PhotoCreate";

function Photo() {
  const [isSaving, setIsSaving] = useState(false);
  return (
    <MainLayout sidebar={<MainSidebar />} title={"Create a Photo"}>
      <div className="position-relative">
        {isSaving && <BlockUi color="var(--primary-color)" />}
        <div className="container px-3 px-md-5 pt-5">
          <BackButton />
          <div className="container container-80">
            <div className="py-5">
              <ListNavItem
                data={{
                  title: "Create a Photo",
                  type: "heading",
                  icon: (
                    <FontAwesomeIcon
                      className="text-podcast"
                      icon={faImage}
                    />
                  ),
                }}
              />
              <div className="row">
                <PhotoCreate setIsSaving={setIsSaving} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Photo;
