import React, { useState } from "react";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import { css } from "@emotion/core";
import Link from "next/link";

const style = css`
  .button-icon {
    background-color: transparent;
    border: none;
    padding: 0;
    color: var(--typo);
  }
  .dropdown-menu {
    min-width: 5rem;
    background-color: rgba(29, 51, 91, 0.9);
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
  &.actions-events {
    position: static !important;
  }
`;

function ProductActions({
  product,
  openDeleteModal,
  setOpenDeleteModal,
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const openModalDelete = () => {
    setOpen(!open);
    setOpenDeleteModal(!openDeleteModal);
  };
  return (
    <>
      <span css={style} className={className}>
        <Dropdown direction="left" isOpen={open} toggle={() => setOpen(!open)}>
          <DropdownToggle className="button-icon">
            <FontAwesomeIcon className="avatar-icon color-font" icon={faEllipsisH} />
          </DropdownToggle>
          <DropdownMenu>
            <span className="d-flex item-event-actions">
              <Link href={`/dashboard/products/edit-product/${product.id}`}>
                <a>Edit</a>
              </Link>
            </span>
            <span
              onClick={openModalDelete}
              className="d-flex item-event-actions"
            >
              Delete
            </span>
          </DropdownMenu>
        </Dropdown>
      </span>
    </>
  );
}

export default ProductActions;
