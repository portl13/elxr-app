import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
function ShopCard() {
  return (
    <>
      <li>
        <div className="icon-tag">
          <a>
            <FontAwesomeIcon icon={faLink} />
          </a>
          <span>|</span>
          <a>
            <FontAwesomeIcon icon={faEdit} />
          </a>
          <span>|</span>
          <a>
            <FontAwesomeIcon icon={faTrash} />
          </a>
        </div>
        <div className="sale-tag">SALE</div>
        <div className="image-tag">
          <img
            src="https://data.portl.live/wp-content/uploads/2022/03/bird-35-1-1-1-2-1-1-1-2.jpg"
            alt="image"
          />
        </div>
        <div className="text-tag">Test</div>
        <div className="dollar-cut-tag">
          <span className="cut-tag">$12</span>
          <span className="highlighted-text">$35</span>
        </div>
        <div className="button-tag">Add to cart</div>
      </li>
    </>
  );
}
export default ShopCard;
