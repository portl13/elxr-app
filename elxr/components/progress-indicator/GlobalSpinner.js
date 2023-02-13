import React from "react";

import { UserContext } from "@/context/UserContext";

import SpinnerLoader from "@/components/shared/loader/SpinnerLoader";

const GlobalSpinner = ({ children }) => {
  const { ready } = React.useContext(UserContext);

  if (!ready) {
    return <SpinnerLoader />;
  }

  return children;
};

export default GlobalSpinner;
