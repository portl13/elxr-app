import React, { useContext } from "react";
import { UserContext } from "@/context/UserContext";

import Card from "@/elxr/components/bits/Card";


const FoodLog = () => {
  const { user } = useContext(UserContext);
  return (
    <Card >
      <h5>
        Hi {user?.name},
      </h5>
      <p>
        Welcome to your Elxr Dashboard, your go-to destination to stay updated on your latest discoveries and upcoming activities. Start browsing and see what Elxr has to offer you today.
      </p>
    </Card>
  );
};

export default FoodLog;
