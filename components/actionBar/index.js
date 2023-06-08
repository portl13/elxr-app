import React from 'react'
import { ActionBarWrapper } from './actionBar.style'
import { Input } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faThLarge, faTimes } from '@fortawesome/free-solid-svg-icons'
import InputDashSearch from '@components/shared/form/InputDashSearch'
import { css } from '@emotion/core'

function ActionBar(props) {
  const {
    handleActivityChange,
    setView,
    type,
    handleSearch,
    searchVal,
    isSearch,
    isGroup,
    hideGridView,
    withButton,
    clickSearch,
  } = props
  return (
    <ActionBarWrapper
      className={`member-justify-between ${isGroup && 'no-top'}`}
    >
      {isSearch && (
        <div 
        css={css`
        & .input-search{
          height: 43px;
        }
        `}
        className="profile-container d-flex align-item-center">
          <InputDashSearch
            value={searchVal}
            onChange={handleSearch}
            onKeyDown={handleSearch}
            placeholder={'Search All Members'}
            className='mr-1'
          />
          {withButton && searchVal && (
            <>
              <button onClick={clickSearch} className="btn btn-primary b-radius-25">
                Search
              </button>
            </>
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
            value={type || ''}
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
                onClick={() => setView('grid')}
              />
            </div>
            <div className="has-tooltip select d-none d-md-flex align-items-center">
              <div className="popover bs-popover-top">
                <div className="arrow"></div>
                <div className="popover-body">List view</div>
              </div>
              <FontAwesomeIcon icon={faBars} onClick={() => setView('list')} />
            </div>
          </>
        )}
      </div>
    </ActionBarWrapper>
  )
}
export default ActionBar
