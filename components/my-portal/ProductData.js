import React,{useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import ReCAPTCHA from "react-google-recaptcha";
import {
  verifyCaptcha
} from "../../pages/api/channel.api";
export default function ProductData({ result,user }) {
  //const recaptchaRef = React.createRef();
  const key = "6Ldyuh0eAAAAAGlpdkRxqy0uB2B61D-rkjnsNFxs"
  const [responseKey,setResponseKey] = useState()
  const extractContent = (s) => {
    var span = document.createElement("span");
    span.innerHTML = s;
    return span.textContent || span.innerText;
  };
  function getResponse(value) {
    //var response = grecaptcha.getResponse()
    console.log("Captcha value:", value);
    setResponseKey(value)
  }
  // function verifyCode(){
  //   const formData = {
  //     secret : key,
  //     response: responseKey
  //   }
  //   verifyCaptcha( 
  //     user,
  //     formData)
  //     .then((res) => {
  //       console.log("response:",res.data)
  //     })
  //     .catch(() => console.log("error"));
  // }
  return (
    <>
      <div className="product-detail-panel">
        <h1>{result.name}</h1>
        <img src={
        result.images.map((d) => d.src)[0] === undefined
                  ? "https://data.portl.live/wp-content/uploads/woocommerce-placeholder-150x150.png"
                  : result.images.map((d) => d.src)[0]} />
        <h5>{extractContent(result.description)}</h5>
        <div className="review-section">
          <h2>Reviews</h2>
          <div className="review-comment">There are no reviews yet.</div>
          <div className="review-subscription">
            Be the first to review “{result.name}”
          </div>
          <div className="review-ratings">
            Your rating<span>*</span>
          </div>
          <div className="star-tag">
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
          </div>
          <div className="star-tag">
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
          </div>
          <div className="review-ratings">
            Your review<span>*</span>
          </div>
          <div className="review-textarea">
            <textarea type=""></textarea>
          </div>
          <div className="capcha-panel">
            <ReCAPTCHA
              //ref={recaptchaRef}
              sitekey= {key}
              onChange={(e)=>getResponse(e)}
              theme= "dark"
            />
            
          </div>
          
          <div className="button-tag">
            <button type="">Submit</button>
            
            
          </div>
          {/* <div className="button-tag">
            
            <button onClick={()=>verifyCode()}>verify captcha</button>
            
          </div> */}
        </div>
      </div>
    </>
  );
}
