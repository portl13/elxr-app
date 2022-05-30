import React, { useContext, useState } from "react";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../context/UserContext";
import useIcon from "../../hooks/useIcon";
import axios from "axios";
const LikeButton = ({ id, favorited, favorite_count, setFav }) => {
  const { user } = useContext(UserContext);
  const [result, setResult] = useState("");
  const { iconElement: heartRegular } = useIcon(faHeartRegular);
  const { iconElement: heartSolid } = useIcon(faHeartSolid);
  function getFav() {
    axios(process.env.bossApi + `/activity/${id}/favorite`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }).then((res) => {
      setResult(res.data);
      if (favorited) {
        setFav(false);
      } else {
        setFav(true);
      }
    });
  }
  return (
    <button
      type="button"
      className="btn-icon btn-3 btn pl-0 pr-1"
      onClick={() => getFav()}
    >
      <span className="btn-inner--icon">
        {result.favorited === true
          ? heartSolid
          : result.favorited === false
          ? heartRegular
          : favorited === true
          ? heartSolid
          : heartRegular}
      </span>
      <span className="btn-inner--text">
        {`${
          result.favorited === true
            ? "Unl"
            : result.favorited === false
            ? "L"
            : favorited === true
            ? "Unl"
            : "L"
        }`}
        ike
        {/* ({result.favorited === true ? result.favorite_count
                    :
                    result.favorited === false ?
                        result.favorite_count :
                        favorite_count}) */}
      </span>
    </button>
  );
};
export default LikeButton;
