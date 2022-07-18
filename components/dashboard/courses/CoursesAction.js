import { css } from "@emotion/core";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useState } from "react";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";

const style = css`
  .button-icon {
    background-color: transparent;
    border: none;
    padding: 0;
    color: var(--typo);
  }
  .dropdown-menu {
    background-color: var(--bg);
    min-width: 5rem;
  }
  .item-event-actions {
    padding: 0 0.5rem;
    color: var(--typo);
    cursor: pointer;
  }
  .item-event-actions a {
    color: inherit;
  }
  .item-event-actions:hover {
    color: var(--primary-color);
  }
`;
function CoursesAction(props) {
  const { openDeleteModal, setOpenDeleteModal } = props;
  const [open, setOpen] = useState(false);

  const openModalDelete = () => {
    setOpen(!open);
    setOpenDeleteModal(!openDeleteModal);
  };

  return (
    <span css={style} className=" d-block mr-2">
      <Dropdown direction="left" isOpen={open} toggle={() => setOpen(!open)}>
        <DropdownToggle className="button-icon bg-transparent border-0 py-0 mr-4">
          <FontAwesomeIcon className="avatar-icon" icon={faEllipsisH} />
        </DropdownToggle>
        <DropdownMenu>
          <span className="d-flex item-event-actions">
            <Link href={`/dashboard/courses/edit/`}>
              <a>Edit</a>
            </Link>
          </span>
          <span
            onClick={openModalDelete}
            className="d-flex item-event-actions pointer"
          >
            Delete
          </span>
        </DropdownMenu>
      </Dropdown>
    </span>
  );
}

export default CoursesAction;
