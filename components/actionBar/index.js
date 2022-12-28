import React from "react";
import { ActionBarWrapper } from "./actionBar.style";
import { Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faThLarge, faTimes } from "@fortawesome/free-solid-svg-icons";
import { searchField } from "@components/livefeed/livefeed.style";
import InputDashSearch from "@components/shared/form/InputDashSearch";

function ActionBar(props) {
  const {
    handleActivityChange,
    setView,
    type,
    placeholderText,
    handleSearch,
    searchVal,
    isSearch,
    isGroup,
    hideGridView,
  } = props;
  return (
    <ActionBarWrapper
      className={`member-justify-between ${isGroup && "no-top"}`}
    >
      {isSearch && (
        <div className="profile-container">
          <InputDashSearch
            value={searchVal}
            onChange={handleSearch}
            onKeyDown={handleSearch}
            placeholder={"Search All Members"}
          />
          {searchVal && (
            <span className="input-group-append">
              <button className="btn btn-outline-secondary" type="button">
                <FontAwesomeIcon
                  icon={faTimes}
                  onClick={() => handleSearch("")}
                />
              </button>
            </span>
          )}
        </div>
      )}
      <div className="member-recent-activity-panel">
        {!isGroup && (
          <Input
          className="input-search border-radius-35"
            type="select"
            id="filterConnection"
            onChange={handleActivityChange}
            value={type || ""}
          >
            <option value="active">Recently Active</option>
            <option value="newest">Newest Members</option>
            <option value="alphabetical">Alphabetical</option>
          </Input>
        )}
        {!hideGridView && (
          <>
            <div className="has-tooltip select d-none d-md-flex align-items-center">
              <div className="popover bs-popover-top">
                <div className="arrow"></div>
                <div className="popover-body">Grid view</div>
              </div>
              <FontAwesomeIcon
                icon={faThLarge}
                onClick={() => setView("grid")}
              />
            </div>
            <div className="has-tooltip select d-none d-md-flex align-items-center">
              <div className="popover bs-popover-top">
                <div className="arrow"></div>
                <div className="popover-body">List view</div>
              </div>
              <FontAwesomeIcon icon={faBars} onClick={() => setView("list")} />
            </div>
          </>
        )}
      </div>
    </ActionBarWrapper>
  );
}
export default ActionBar;
