import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const RenderIcon = ({icon, title}) => {
  if(typeof icon === 'string'){
      return <img src={icon} alt={title} />
  }
  return icon;
}

function ListNavItem({ data, className = '' }) {
  const { link, title, icon, type = "item" } = data;

  if (type === "heading") {
    return (
      <article className="list-nav-item">
        <span className="list-nav-item-grupe">
          <RenderIcon icon={icon} title={title} />
        </span>
        <h4 className="list-nav-item-title">{title}</h4>
      </article>
    );
  }

  return (
    <article className={className}>
      <Link href={link}>
        <a className="list-nav-item">
          <span className="list-nav-item-grupe">
            <RenderIcon icon={icon} title={title} />
          </span>
          <h4 className="list-nav-item-title">{title}</h4>
          <span className="list-nav-item-icon">
            <FontAwesomeIcon icon={faAngleRight} />
          </span>
        </a>
      </Link>
    </article>
  );
}

export default ListNavItem;
