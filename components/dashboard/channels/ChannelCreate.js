import React, { useState } from "react";
import CreateChannelForm from "@components/dashboard/channels/CreateChannelForm";
import BlockUi from "@components/ui/blockui/BlockUi";
import EditChannelForm from "./EditChannelForm";
import BackButton from "@components/shared/button/BackButton";
import ListNavItem from "@components/layout/ListNavItem";

function ChannelCreate({ id = null }) {
  const [loading, setLoading] = useState(!!id);

  return (
    <div className="container px-3  postion-relative">
      {loading && <BlockUi color={"var(--primary-color)"} />}
      <div className="d-flex align-items-center">
        <BackButton />
      </div>
      <div className="container container-80 pb-4">
        <div className="contain-title">
          <h1 className="create-communities-title">
            {!id ? (
              <ListNavItem
                data={{
                  title: "Create a Channel",
                  type: "heading",
                  icon: "/img/icon-movil/create-menu/channles-icon.svg",
                }}
              />
            ) : (
              <ListNavItem
                data={{
                  title: "Edit Channel",
                  type: "heading",
                  icon: "/img/icon-movil/create-menu/channles-icon.svg",
                }}
              />
            )}
          </h1>
        </div>
        {!id && <CreateChannelForm loading={loading} setLoading={setLoading} />}
        {id && (
          <EditChannelForm id={id} loading={loading} setLoading={setLoading} />
        )}
      </div>
    </div>
  );
}

export default ChannelCreate;
