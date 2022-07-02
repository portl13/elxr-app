import Meta from "@components/layout/Meta";
import {
  faArrowLeft,
  faCalendar,
  faClock,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import React from "react";

function EventDetailsPage() {
  return (
    <div>
      <Meta />
      <Head>
        <title>EVENT DETAILS</title>
      </Head>
      <div className="container container-80">
        <div className="contain-icon-back d-flex align-items-center py-5">
          <span className="contain-icon">
            <FontAwesomeIcon className="back-icon" icon={faArrowLeft} />
          </span>
        </div>
        <div className="row">
          <div className="col-12">
            <div>
              <span className="bg-primary px-2 rounded">Food and Drink</span>
            </div>
            <div>
              <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center">
                <div>
                  <h3 className="m-0">RECREATING ANCIENT RECIPES WITH VAWAA</h3>
                  <div className="d-flex">
                    <div className="pr-3">
                      <span className="pr-2">
                        {" "}
                        <FontAwesomeIcon icon={faCalendar} />
                      </span>
                      <span>MAY 30, 2022</span>
                    </div>
                    <div>
                      <span className="pr-2">
                        {" "}
                        <FontAwesomeIcon icon={faClock} />
                      </span>
                      <span>12:30 AM-1:30 PM</span>
                    </div>
                  </div>
                </div>
                <div className="d-flex mt-3 m-md-0">
                  <span className="">
                    <FontAwesomeIcon />
                  </span>
                  <button className="btn btn-create">
                    See Complere Details
                  </button>
                  <div className="contain-icon-border">
                    <span>
                      <FontAwesomeIcon
                        className="icon-setting"
                        icon={faEllipsisH}
                      />
                    </span>
                  </div>
                </div>
              </div>
              <div className="ratio ratio-16x9 bg-secondary mt-4">
              </div>
              <div className="pt-3 text-justify">
                <span>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id quod debitis aut. Harum explicabo soluta velit.</span>

                <h5 className="mt-2">COUSE DESCRIPTION</h5>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas natus veritatis nihil aut cumque odio odit fugit quo ad culpa, quis tenetur vel eligendi? Recusandae distinctio incidunt harum error consectetur! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas natus veritatis nihil aut cumque odio odit fugit quo ad culpa, quis tenetur vel eligendi? Recusandae distinctio incidunt harum error consectetur!Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas natus veritatis nihil aut cumque odio odit fugit quo ad culpa, quis tenetur vel eligendi? Recusandae distinctio incidunt harum error consectetur! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas natus veritatis nihil aut cumque odio odit fugit quo ad culpa, quis tenetur vel eligendi? Recusandae distinctio incidunt harum error consectetur!</p>

                <h5>SYLLABUS AT A GLANCE</h5>

                <p>This course includes three total sessions, each lasting for 2 hours on three consecutive Saturdays neginning june 4.</p>
                <ul className="sessions">
                  <li>Session 1 (Saturday. 6/4, 12-2PM ET): Babylonia: Fowl pre and Mersu</li>
                  <li>Session 1 (Saturday. 6/11, 12-2PM ET): Acient Rome: Mustacel with Moretum cheese paste, Alenxandrian gourds, and dulcia domesatica</li>
                  <li>Two wees off</li>
                  <li>Session 1 (Saturday. 7/2, 12-2PM ET): Mediterranean Middle Ages: Itriyya and hummus: Fowl pre and Mersu</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetailsPage;


export async function getServerSideProps({ query }) {
  const { id } = query
  return {
    props: { data: { id } },
  }
}
