import React, { useRef } from "react";
import {OPTIONS_SPLIDE_BID_CARD} from "@utils/constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import AppointmentProductCard from "@components/calendar/AppointmentProductCard";

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
      <div className="row mt-5">
        <div className="col-12 d-flex justify-content-between mb-3 align-items-baseline">
          <h4 className="section-main-title text-capitalize">appointment</h4>
          <span>
            {products?.length > OPTIONS_SPLIDE_BID_CARD.perPage && (
              <>
                <button
                  onClick={prev}
                  className="arrow-slide btn-icon-header mr-3"
                >
                  <FontAwesomeIcon
                    className="center-absolute"
                    icon={faChevronLeft}
                  />
                </button>
                <button
                  onClick={next}
                  className="arrow-slide btn-icon-header mr-4"
                >
                  <FontAwesomeIcon
                    className="center-absolute"
                    icon={faChevronRight}
                  />
                </button>
              </>
            )}
            <button className={"no-btn"} onClick={() => setTab("appointments")}>
              <span className="font-size-14 text-white">See all</span>
            </button>
          </span>
        </div>
        {isLoading && <SpinnerLoader />}
      </div>
      <div className="section-main section-events">
          <Splide
            ref={refSlide}
            options={OPTIONS_SPLIDE_BID_CARD}
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
