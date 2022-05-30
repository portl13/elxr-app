import React from "react"
import Head from "next/head";
import Layout from "../components/layout/Layout";
import { Col } from 'reactstrap';

export default function MyEvents() {
  return (
    <>
      <Layout>
        <Head>
          <title>Events-WeShare</title>
        </Head>
        <Col xs="12">
          <div className="tribe-events-wrapper">
            <div className="tribe-container">
              <div className="button-tag">Today</div>
              <div className="date-panel">August 29 - September 18</div>
            </div>
            <div className="custom-arrow-panel">
              <div className="arrow-panel">
                <span className="back-arrow"></span>
                <span className="right-arrow"></span>
              </div>
              <div className="view-panel">
                <a href="">Grid View</a>
              </div>
            </div>
          </div>
          <div className="tribe-events-pro-photo">
            <div className="tribe-common-g-row">
              {/* add listing-view class for list view */}
              <div className="tribe-common-g-col">
                <div className="featured-image-wrapper">
                  <a href="">
                    <img src="https://portl.imgix.net/2021/08/613ad4ab4d283a8f9191c1a97cda14fa.jpg?auto=compress&fm=pjpg&ixlib=php-3.3.0&s=514bb3050ca272924e3742428d4c9ade" alt="image" />
                  </a>
                </div>
                <div className="event-details-wrapper">
                  <div className="event-date-tag">
                    <div className="event-date-tag-datetime">
                      <div className="event-date-tag-month">Aug</div>
                      <div className="event-date-tag-weekday">28</div>
                    </div>
                  </div>
                  <div className="event-details">
                    <div className="tribe-common-b2">
                      <span>11:00 am</span>
                      <span>-</span>
                      <span>12:00 am</span>
                    </div>
                    <div className="tribe-common-h6">
                      <a href="">Social Justice Readers</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tribe-common-g-col">
                <div className="featured-image-wrapper">
                  <a href="">
                    <img src="https://portl.imgix.net/2021/08/613ad4ab4d283a8f9191c1a97cda14fa.jpg?auto=compress&fm=pjpg&ixlib=php-3.3.0&s=514bb3050ca272924e3742428d4c9ade" alt="image" />
                  </a>
                </div>
                <div className="event-details-wrapper">
                  <div className="event-date-tag">
                    <div className="event-date-tag-datetime">
                      <div className="event-date-tag-month">Aug</div>
                      <div className="event-date-tag-weekday">28</div>
                    </div>
                  </div>
                  <div className="event-details">
                    <div className="tribe-common-b2">
                      <span>11:00 am</span>
                      <span>-</span>
                      <span>12:00 am</span>
                    </div>
                    <div className="tribe-common-h6">
                      <a href="">Social Justice Readers</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tribe-common-g-col">
                <div className="featured-image-wrapper">
                  <a href="">
                    <img src="https://portl.imgix.net/2021/08/613ad4ab4d283a8f9191c1a97cda14fa.jpg?auto=compress&fm=pjpg&ixlib=php-3.3.0&s=514bb3050ca272924e3742428d4c9ade" alt="image" />
                  </a>
                </div>
                <div className="event-details-wrapper">
                  <div className="event-date-tag">
                    <div className="event-date-tag-datetime">
                      <div className="event-date-tag-month">Aug</div>
                      <div className="event-date-tag-weekday">28</div>
                    </div>
                  </div>
                  <div className="event-details">
                    <div className="tribe-common-b2">
                      <span>11:00 am</span>
                      <span>-</span>
                      <span>12:00 am</span>
                    </div>
                    <div className="tribe-common-h6">
                      <a href="">Social Justice Readers</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tribe-common-g-col">
                <div className="featured-image-wrapper">
                  <a href="">
                    <img src="https://portl.imgix.net/2021/08/613ad4ab4d283a8f9191c1a97cda14fa.jpg?auto=compress&fm=pjpg&ixlib=php-3.3.0&s=514bb3050ca272924e3742428d4c9ade" alt="image" />
                  </a>
                </div>
                <div className="event-details-wrapper">
                  <div className="event-date-tag">
                    <div className="event-date-tag-datetime">
                      <div className="event-date-tag-month">Aug</div>
                      <div className="event-date-tag-weekday">28</div>
                    </div>
                  </div>
                  <div className="event-details">
                    <div className="tribe-common-b2">
                      <span>11:00 am</span>
                      <span>-</span>
                      <span>12:00 am</span>
                    </div>
                    <div className="tribe-common-h6">
                      <a href="">Social Justice Readers</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Layout>
    </>
  )
}
