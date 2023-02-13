import React, { useContext } from "react";
import { UserContext } from "@/context/UserContext";

import ProfilePicture from "@/elxr/components/bits/ProfilePicture";
import Card from "@/elxr/components/bits/Card";
import {
  ContentTitle,
  ContentText,
  cardCSS,
  ContentContainer,
  ContentSubTitle,
} from "./styles";

const FoodLog = () => {
  const { user } = useContext(UserContext);
  return (
    <Card css={cardCSS}>
      <ContentContainer>
        <ProfilePicture
          src={user?.avatar_urls.thumb}
          alt={`${user?.name} user pictue`}
          size="large"
        />
        <ContentTitle>👋 Hi {user?.name}</ContentTitle>
        <ContentSubTitle>Welcome to Elxr</ContentSubTitle>
        <ContentText>
          Your Dashboard will be your go-to destination to stay updated on your
          latest discoveries and upcoming activities.
        </ContentText>
        <ContentText>
          Start browsing and see what Elxr has to offer you today!
        </ContentText>
      </ContentContainer>
    </Card>
  );
};

export default FoodLog;
