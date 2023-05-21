import React from "react"
import CreatorSeeAllButton from "@components/creator/tabs/home/CreatorSeeAllButton"

function CreatorSectionHeader({ title, setTab, children, show = true }) {
  return (
    <div className="row mt-5">
      <div className="col-12 mb-2 d-flex justify-content-between">
        <div className="d-flex flex-column flex-lg-row w-100">
          <h4 className="section-main-title text-capitalize d-flex align-items-center justify-content-between">
            {title}
            <CreatorSeeAllButton
              className={"d-lg-none d-flex"}
              setTab={setTab}
            />
          </h4>
          <div className={"filter-contents mb-2 ml-lg-3"}>{children}</div>
        </div>
        {show ? (
          <CreatorSeeAllButton className={"d-none d-lg-flex"} setTab={setTab} />
        ) : null}
      </div>
    </div>
  )
}

export default CreatorSectionHeader
