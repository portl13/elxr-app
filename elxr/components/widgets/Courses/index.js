import React from "react";
import { cardBox } from "@/elxr/components/widgets/Subscriptions/styles";
import { HeaderSection } from "@/elxr/components/widgets/Notifications/styles";
import Header from "@/elxr/components/bits/text/Header";
import useSWR from "swr";
import { genericFetch } from "@request/dashboard";
import { Scrollbars } from "react-custom-scrollbars-2";
import Link from "next/link";
import { stringToSlug } from "@lib/stringToSlug";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import Card from "@/elxr/components/bits/Card";

const courseApi = process.env.courseUrl;

const extractContent = (html) => {
    let characterLength = 70;
    if (html && html.length > characterLength) {
        return (
            <span
                dangerouslySetInnerHTML={{
                    __html: html.slice(0, characterLength).concat("..."),
                }}
            ></span>
        );
    } else {
        return (
            <span
                dangerouslySetInnerHTML={{
                    __html: html,
                }}
            ></span>
        );
    }
};

function Courses({ token, user }) {
  const { data: courses, isLoading: courseLoading } = useSWR(
    token ? [`${courseApi}/ldlms/v2/users/${user?.id}/courses`, token] : null,
    genericFetch,
    {
      revalidateOnFocus: false,
    }
  );

  return (
    <Card css={cardBox}>
      <HeaderSection>
        <Header sub="YOUR">COURSES</Header>
      </HeaderSection>
      <div className="list-container">
        <Scrollbars
          universal
          renderView={(props) => <div {...props} className="scroll-inner" />}
          renderThumbVertical={(props) => (
            <div {...props} className="thumb-vertical" />
          )}
        >
          {courseLoading && <SpinnerLoader />}
          {!courseLoading && (!courses || courses.length === 0) && (
            <div className="text-center w-100 p-2">
              <p className="no-record-color">
                You have not taken any Courses yet.
              </p>
              <Link href="/courses">
                <a className="link text-center">Explore courses</a>
              </Link>
            </div>
          )}
          {!courseLoading &&
            courses &&
            courses.length > 0 &&
            courses.map((c, k) => {
              return (
                <div className="list-row pr-0 pr-sm-2" key={k}>
                  <Link
                    href={`/course-detail/${stringToSlug(c.title?.rendered)}/${
                      c.id
                    }`}
                  >
                    <a className="img-box">
                      <img
                        src={c.course_img ? c.course_img : "/img/user.png"}
                        alt="default"
                      />
                    </a>
                  </Link>
                  <div className="info-box">
                    {/*<div className="small-image-container">*/}
                    {/*  <div className="author-box"></div>*/}
                    {/*  <div className="count-box">{c?.lessons}</div>*/}
                    {/*</div>*/}
                    <div className="bold-text">
                      <Link
                        href={`/course-detail/${stringToSlug(
                          c.title?.rendered
                        )}/${c.id}`}
                      >
                        <a className={"text-font"}>{c?.title?.rendered}</a>
                      </Link>
                    </div>
                    <div className="description-text">
                      {extractContent(c?.content?.rendered)}
                    </div>
                    <div className="mt-3 text-center d-block d-sm-none">
                      <button
                        className="btn btn-primary continue-btn"
                        onClick={() => (window.location.href = c?.link)}
                      >
                        Continue Learning
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </Scrollbars>
      </div>
    </Card>
  );
}

export default Courses;
