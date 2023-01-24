import React, { useState } from "react";
import MainSidebar from "@components/main/MainSidebar";
import BlockUi from "@components/ui/blockui/BlockUi";
import BackButton from "@components/shared/button/BackButton";
import ListNavItem from "@components/layout/ListNavItem";
import MainLayout from "@components/main/MainLayout";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageCreate from "@components/dashboard/image/ImageCreate";

function PageEditForm({ id }) {
  const [isSaving, setIsSaving] = useState(true);
  return (
    <MainLayout sidebar={<MainSidebar />} title={"Edit a Image"}>
      <div className="position-relative">
        {isSaving && <BlockUi color="var(--primary-color)" />}
        <div className="container px-3 px-md-5 pt-5">
          <BackButton />
          <div className="container container-80">
            <div className="py-5">
              <ListNavItem
                data={{
                  title: "Edit a Image",
                  type: "heading",
                  icon: (
                    <FontAwesomeIcon className="text-podcast" icon={faImage} />
                  ),
                }}
              />
              <div className="row">
                <ImageCreate
                  id={id}
                  isSaving={isSaving}
                  setIsSaving={setIsSaving}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default PageEditForm;

export async function getServerSideProps({ query }) {
  const { id } = query;
  return {
    props: { id },
  };
}
