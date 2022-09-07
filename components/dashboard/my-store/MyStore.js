import { UserContext } from "@context/UserContext";
import React, { useContext, useState } from "react";
import Branding from "./Branding";
import PolicySettings from "./PolicySettings";
import Social from "./Social";
import Support from "./Support";
import ScrollTags from "@components/shared/slider/ScrollTags";

const tabs = [
  {
    label: "Branding",
    value: "branding",
  },
  {
    label: "Social",
    value: "social",
  },
  {
    label: "Policies",
    value: "policy-settings",
  },
  {
    label: "Social",
    support: "Support",
  },
];

function MyStore() {
  const { user } = useContext(UserContext);
  const [tab, setTab] = useState("branding");
  const titleSection = {
    branding: "Branding",
    social: "Social",
    "policy-settings": "Policies",
    support: "Support",
  };
  const setTabHandler = (tab) => {
    setTab(tab);
  };
  return (
    <div className="container">
      <div className="mb-4">
        <h1 className="dashboard-title">{titleSection[tab]}</h1>
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

        <div className={`${tab === "branding" ? "d-block" : "d-none"}`}>
          <Branding user={user} />
        </div>
        <div className={`${tab === "social" ? "d-block" : "d-none"}`}>
          <Social user={user} />
        </div>
        <div className={`${tab === "policy-settings" ? "d-block" : "d-none"}`}>
          <PolicySettings />
        </div>
        <div className={`${tab === "support" ? "d-block" : "d-none"}`}>
          <Support />
        </div>
      </div>
    </div>
  );
}

export default MyStore;
