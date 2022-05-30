import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faLink } from "@fortawesome/free-solid-svg-icons";
import { Button } from "reactstrap";
import Description from "./Description";
import Policies from "./Policies";
import Reviews from "./Reviews";
import { TIMEOUT } from "../../utils/constant";
import { useAlert } from "react-alert";

function Header({ result, status, setStatus, channelPolicy }) {
  const alert = useAlert();
  const [count, setCount] = useState(1);
  const extractContent = (s) => {
    var span = document.createElement("span");
    span.innerHTML = s;
    return span.textContent || span.innerText;
  };
  return (
    <>
      <div className="subscription-detail-wrapper">
        <div className="woocommerce-breadcrumb">
          <a href="">Home</a> /
          <a href="">{result?.categories.map((d) => d.name)}</a> /
          <a href="">{result?.name}</a>
        </div>
        <div className="bsAccount-details-wrapper">
          <div className="left-section">
            <img src={result?.images.map((d) => d.src)[0]} alt="image" />
            <div className="wffc-icons">
              <a onClick={() => alert.success("Coming Soon..", TIMEOUT)}>
                <FontAwesomeIcon icon={faLink} />
              </a>
              <span>|</span>
              <a onClick={() => alert.success("Coming Soon..", TIMEOUT)}>
                <FontAwesomeIcon icon={faEdit} />
              </a>
              <span>|</span>
              <a onClick={() => alert.success("Coming Soon..", TIMEOUT)}>
                <FontAwesomeIcon icon={faLink} />
              </a>
            </div>
          </div>

          <div className="right-section">
            <h1>{result?.name}</h1>

            {result?.price_html && <div className="price-tag">
              {extractContent(result?.price_html)}
            </div>}

            {result?.description && <div className="description-tag">
              {extractContent(result?.description)}
            </div>}

            <div className="quantity-tag">
              <div className="quantity-panel">
                <span
                  className="minus-tag"
                  onClick={() => count > 1 && setCount(count - 1)}
                >
                  -
                </span>
                <span>{count}</span>
                <span className="plus-tag" onClick={() => setCount(count + 1)}>
                  +
                </span>
              </div>
              <button
                className="signup-button"
                onClick={() => alert.success("Coming Soon..", TIMEOUT)}
              >
                {result?.type === "subscription" ? "Sign up now" : "Add to cart"}
              </button>
            </div>
            <div className="spec-conatiner">
              <h4>SPECS</h4>
              <div className="posted-tag">
                <div className="pr-atts-title">Category:</div>
                <div className="pr-atts-data">
                  <a href="">{result?.categories.map((d) => d.name)}</a>
                </div>
              </div>
              <div className="posted-tag">
                {result?.tags.length !== 0 && <div className="pr-atts-title">Tag:</div>}
                <div className="pr-atts-data">
                  <a href="">{result?.tags.map((d) => d.name)}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="woocommerce-tabs">
          <ul>
            <li className={status === "description" && "active"}>
              <Button onClick={() => setStatus("description")}>
                Description
              </Button>
            </li>
            <li className={status === "reviews" && "active"}>
              <Button onClick={() => setStatus("reviews")}>Reviews</Button>
            </li>
            <li className={status === "policies" && "active"}>
              <Button onClick={() => setStatus("policies")}>Policies</Button>
            </li>
          </ul>
          {status === "description" && <Description result={result} />}
          {status === "reviews" && <Reviews />}
          {status === "policies" && <Policies channelPolicy={channelPolicy} />}
        </div>
      </div>
    </>
  );
}
export default Header;
