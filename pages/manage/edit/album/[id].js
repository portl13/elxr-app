import React, { useState } from "react";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import BlockUi from "@components/ui/blockui/BlockUi";
import BackButton from "@components/shared/button/BackButton";
import ListNavItem from "@components/layout/ListNavItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadphones } from "@fortawesome/free-solid-svg-icons";
import AlbumCreate from "@components/album/AlbumCreate";

function AlbumEditForm({ id }) {
  const [isSaving, setIsSaving] = useState(true);
  return (
    <MainLayout sidebar={<MainSidebar />} title={"Edit Album"}>
      <div className="position-relative">
        {isSaving && <BlockUi color="var(--primary-color)" />}
        <div className="container px-3 px-md-5 pt-5">
          <BackButton />
          <div className="container container-80">
            <div className="py-5">
              <ListNavItem
                data={{
                  title: "Edit Album",
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
                <AlbumCreate id={id} setIsSaving={setIsSaving} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default AlbumEditForm;

export async function getServerSideProps({ query }) {
  const { id } = query;
  return {
    props: { id },
  };
}
