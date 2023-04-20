import React, { useRef } from "react";
import {
  FILTERS_POST,
  OPTIONS_SPLIDE_BID_CARD,
  OPTIONS_SPLIDE_CHANNELS,
} from "@utils/constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import AppointmentProductCard from "@components/calendar/AppointmentProductCard";
import CreatorSectionHeader from "@components/creator/tabs/home/CreatorSectionHeader";

function CreatorAppointment({ products, isLoading, setTab }) {
  const refSlide = useRef();

  const next = () => {
    refSlide.current.splide.go(">");
  };

  const prev = () => {
    refSlide.current.splide.go("<");
  };

  if (products && products && products.length === 0) {
    return "";
  }

  return (
    <>
      <CreatorSectionHeader
        title={"Appointment"}
        setTab={() => setTab("appointments")}
      />

      {isLoading && (
        <div className={"row"}>
          <SpinnerLoader />
        </div>
      )}
      <div className="section-events">
        <Splide
          ref={refSlide}
          options={OPTIONS_SPLIDE_CHANNELS}
          hasTrack={false}
        >
          <SplideTrack>
            {products &&
              products.length > 0 &&
              products.map((product) => (
                <SplideSlide key={product.id}>
                  <AppointmentProductCard product={product} />
                </SplideSlide>
              ))}
          </SplideTrack>
        </Splide>
      </div>
    </>
  );
}

export default CreatorAppointment;
