import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useAlert } from "react-alert";
import { TIMEOUT } from "../../utils/constant";
function Reviews() {
  const alert = useAlert();
  return (
    <>
      <div className="description-wrappper">
        <h2>Review Page</h2>
        <p>There are no reviews yet.</p>
        <div className="review-form">
          <div className="comment-reply-title">
            Be the first to review “Woodland Channel Subscription”
          </div>
          <div className="comment-box">
            <label>
              Your rating <span>*</span>
            </label>
            <div className="stars-tag">
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </div>
          </div>
          <div className="comment-box">
            <label>
              Your review <span>*</span>
            </label>
            <textarea></textarea>
          </div>
          <div className="btn-tag">
            <button onClick={() => alert.success("Coming Soon..", TIMEOUT)}>Submit</button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Reviews;
