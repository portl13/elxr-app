import React, {useContext, useState} from "react";
import useSWRImmutable from "swr/immutable";
import InputDashSearch from "@components/shared/form/InputDashSearch";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import ScrollTags from "@components/shared/slider/ScrollTags";
import useDebounce from "@hooks/useDebounce";
import { genericFetch, getFetchPublic } from "@request/creator";
import { FILTERS_POST } from "@utils/constant";
import useSWRInfinite from "swr/infinite";
import InfinitScroll from "react-infinite-scroll-component";
import SpinnerLoading from "@components/shared/loader/SpinnerLoading";
import useSWR from "swr";
import ImageCard from "@components/image/ImageCard";
import {UserContext} from "@context/UserContext";

const url = `${process.env.apiV2}/images?all=true`;
const categoriesUrl = `${process.env.apiV2}/gallery/categories?hide=true`;
const galleryUrl = `${process.env.apiV2}/gallery`;

function PageGallery({ id }) {
  const limit = 12;
  const {user} = useContext(UserContext)
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("desc");

  const debounceTerm = useDebounce(search, 500);

  const { data: gallery } = useSWR(
    id ? `${galleryUrl}/${id}` : null,
    genericFetch
  );

  const { data, error, size, setSize } = useSWRInfinite(
    (index) =>
        gallery
        ? `${url}&page=${
            index + 1
          }&per_page=${limit}&order=${filter}&search=${debounceTerm}&category=${category}&single=true&include=${
            gallery?.images_ids.toString()
          }`
        : null,
    genericFetch
  );

  const images = data ? [].concat(...data) : [];

  const isLoadingInitialData = !data && !error;

  const isEmpty = data?.[0]?.length === 0;

  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < limit);

  const loadMore = async () => {
    await setSize(size + 1);
  };

  const { data: categories } = useSWRImmutable(categoriesUrl, getFetchPublic);

  const all = () => {
    setCategory("");
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <h4 className="mb-4 font-weight-bold">Gallery: {gallery?.title}</h4>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-9 mb-3">
          <ScrollTags>
            {FILTERS_POST?.map((fil) => (
              <div key={fil.value} className="p-1">
                <button
                  onClick={() => setFilter(fil.value)}
                  className={`custom-pills nowrap ${
                    filter === fil.value ? "active" : ""
                  }`}
                >
                  {fil.label}
                </button>
              </div>
            ))}
          </ScrollTags>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-9 mb-4 mb-md-5">
          <ScrollTags>
            <div className="p-1">
              <span
                onClick={all}
                className={`text-capitalize section-category nowrap pointer  ${
                  category === "" ? "active" : ""
                }`}
              >
                All
              </span>
            </div>
            {categories?.map((value) => (
              <div key={value.value} className="p-1">
                <span
                  onClick={() => setCategory(value.value)}
                  className={`text-capitalize section-category nowrap pointer  ${
                    category === value.value ? "active" : ""
                  }`}
                >
                  {value.label}
                </span>
              </div>
            ))}
          </ScrollTags>
        </div>
        <div className="col-12 col-md-3 mb-4 mb-md-5">
          <div className="d-flex  justify-content-md-end">
            <InputDashSearch
              value={search}
              name={"search"}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="row">{isLoadingInitialData && <SpinnerLoader />}</div>
      <InfinitScroll
        className={"row"}
        dataLength={images.length}
        next={() => loadMore()}
        hasMore={!isReachingEnd}
        loader={!isLoadingInitialData ? <SpinnerLoading /> : null}
      >
        {images &&
          images.map((image) => (
            <div key={image.id} className="col-6 col-md-6 col-lg-3 mb-4">
              <ImageCard user={user} image={image} />
            </div>
        ))}
      </InfinitScroll>
    </>
  );
}

export default PageGallery;
