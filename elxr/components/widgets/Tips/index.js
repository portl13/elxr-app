import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ClientTipsIcon from "@/elxr/components/assets/svg/icons/ClientTips";
import { Carousel } from "react-responsive-carousel";

import Card from "@/elxr/components/bits/Card";

import * as S from "./styles";

const tips = [
  {
    icon: <ClientTipsIcon />,
    title: "Create your first client",
    text: (
      <>
        Add yourself your client information <br /> and invite them to Elxr
      </>
    ),
  },
];

const TipsWidget = () => {
  return (
    <Card css={S.cardCSS}>
      <S.TipContainer>
        <Carousel
          css={S.carouselCSS}
          showArrows={false}
          showStatus={false}
          showThumbs={false}
          infiniteLoop
          autoPlay={false}
          stopOnHover={false}
          autoFocus={false}
          emulateTouch={true}
          dynamicHeight={false}
        >
          {tips.map((tip, index) => {
            return (
              <S.TipItem key={index}>
                <S.TipIcon>{tip.icon}</S.TipIcon>
                <S.TipInfo>
                  <S.Title>{tip.title}</S.Title>
                  <S.Text>{tip.text}</S.Text>
                </S.TipInfo>
              </S.TipItem>
            );
          })}
        </Carousel>
      </S.TipContainer>
    </Card>
  );
};

export default TipsWidget;
