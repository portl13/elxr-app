import { CircularProgress } from "material-ui-core";
import React from "react";

{/* <CircularProgress style={{ color: "" }} />; */}

const index = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress
        className="CenteredLoader"
        style={
          {
            // top: "50%",
            // left:"50%",
            // position:"absolute"
          }
        }
      />
    </div>
  );
};

export default index;
