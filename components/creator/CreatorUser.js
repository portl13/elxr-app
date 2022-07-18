import ClockIcon from "@icons/ClockIcon";
import React, { useState } from "react";

const tabs = [
  {
    tab: "home",
    label: "Home",
  },
  {
    tab: "channels",
    label: "Channels",
  },
  {
    tab: "events",
    label: "Events",
  },
  {
    tab: "videos",
    label: "Videos",
  },
  {
    tab: "podcasts",
    label: "Podcasts",
  },
  {
    tab: "courses",
    label: "Courses",
  },
  {
    tab: "communities",
    label: "Communities",
  },
  {
    tab: "blog",
    label: "Blog",
  },
  {
    tab: "products",
    label: "Products",
  },
  {
    tab: "about",
    label: "About",
  },
];

function CreatorUser({ creator }) {
  const [tab, setTab] = useState("home");

  return (
    
      <div>
        <div className="d-flex flex-column flex-md-row">
          <div className="contain-channel-img margin-negative bg-gray position-relative">
            {creator && creator.vendor_shop_logo && (
              <img
                src={creator.vendor_shop_logo}
                alt={creator.vendor_shop_name}
              />
            )}
          </div>
          <div className="pl-md-3 pt-2">
            <div className="d-flex align-items-center pl-md-2 font-size-12 mt-2">
              <h1 className="m-0 font-weight-bold line-height-1 font-size-34 mr-3">
                {creator &&
                  creator.vendor_shop_name &&
                  creator.vendor_shop_name}
              </h1>
            </div>
            <div className="pl-2">
              {creator && creator.vendor_display_name && (
                <p>{creator.vendor_display_name}</p>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 mt-4">
            <div className="d-none d-md-flex justify-content-between align-items-center">
              <div className="d-flex"></div>
              <div className="d-flex">
                <div className="position-relative">
                  <button
                    // onClick={() =>
                    //   router.push(`/dashboard/channel/${id}/create-event`)
                    // }
                    className="btn btn-borde btn-border-primary text-primary"
                  >
                    <i className="btn-icon-container">
                      <ClockIcon className="btn-icon text-primary" />
                    </i>
                    <span>Schedule Session</span>
                  </button>
                </div>
                <div className="position-relative">
                  <button
                    // onClick={() =>
                    //   router.push(`/dashboard/channel/${id}/go-live`)
                    // }
                    className="btn btn-create rounded-lg d-flex"
                  >
                    <span>Subscribe</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-5">
          {tabs.map((item) => (
            <button
              key={item.tab}
              onClick={() => setTab(item.tab)}
              className={`${
                tab === item.tab ? "active" : ""
              } btn btn-transparent font-weight-500 py-1 px-2`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    
  );
}

export default CreatorUser;
