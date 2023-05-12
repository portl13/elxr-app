import React, { useContext, useState } from "react";
import MainSidebar from "@components/main/MainSidebar";
import MainLayout from "@components/main/MainLayout";
import Branding from "@components/dashboard/my-store/Branding";
import { UserContext } from "@context/UserContext";
import BackButton from "@components/shared/button/BackButton";
import ListNavItem from "@components/layout/ListNavItem";
import ScrollTags from "@components/shared/slider/ScrollTags";
import Social from "@components/dashboard/my-store/Social";


const tabs = [
  {
    label: "Branding",
    value: "branding",
  },
  {
    label: "Social",
    value: "social",
  }
];

function BrandingPage() {
  const { user } = useContext(UserContext);

  const [tab, setTab] = useState("branding");
  const titleSection = {
    branding: "Customize Page",
    social: "Social",
    "policy-settings": "Policies",
    support: "Support",
  };
  const setTabHandler = (tab) => {
    setTab(tab);
  };

  return (
    <MainLayout title={"Customize Page"} sidebar={<MainSidebar />}>
      <div className="container container-80">
        <BackButton />
        <div className="my-5">
          <ListNavItem
            data={{
              type: "heading",
              title: titleSection[tab],
              icon: "/img/icon-movil/manage-menu/branding-icon.svg",
            }}
          />
        </div>
        <div className="w-100 mt-4 mb-5">
          <ScrollTags>
            {tabs.map((value) => (
              <div key={value.value} className="p-1 ">
                <button
                  onClick={() => setTabHandler(value.value)}
                  className={`btn-transparent ${
                    tab === value.value ? "active" : ""
                  }`}
                >
                  {value.label}
                </button>
              </div>
            ))}
          </ScrollTags>
        </div>
        {user && tab === "branding" && <Branding user={user} />}
        {user && tab === "social" && <Social user={user} />}
      </div>
    </MainLayout>
  );
}

export default BrandingPage;
