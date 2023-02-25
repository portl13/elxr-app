import React from "react";
import { Container, Button, Typography } from "@material-ui/core";
function progressTracker() {
  return (
    <Container
      maxWidth="lg"
      className="main-inner d-flex flex-column justify-content-between vh100"
    >
      <div>
        <div className="dashboard-container-wrap waterlog-detail progress-detail">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12 backtopage">
              <div class="back-btn d-flex">
                <img
                  src="/img/back-arrow.svg"
                  class="d-none d-md-block"
                  alt="back"
                />
                <img src="/img/back-icon.svg" class="d-md-none" alt="back" />
                <span>Back to Dashboard</span>
              </div>
            </div>

            {/* <div className="col-sm-12 col-md-12 col-lg-8">
            <div className="dashboard-card detail_card">
              <div className="detail_title">
                <p>meals &amp; calorie board</p>
                <h1>DAILY TRACKER</h1>
              </div>
            </div> */}

            <div className="col-sm-12 col-md-12 col-lg-8">
              <div className="dashboard-card detail_card">
                <div className="detail_title">
                  <p>meals & calorie board</p>
                  <h1>DAILY TRACKER</h1>
                </div>
                <p className="tracker-text">
                  <img src="/img/tracking-apple.png" alt="back" /> Make sure to
                  have the meals listed in your plan and maintain a calorie
                  intake of 2,000 kcal!
                </p>
                <div class="weight-log-graph-wrap"></div>
              </div>
              <div className="dashboard-card meal_card">
                <p className="meal-heading">
                  <img
                    src="/img/apple-full.png"
                    class="d-none d-md-block"
                    alt="apple"
                  />{" "}
                  Items from your weekly meal plans for today May 4, 2022
                </p>
                <ul className="meal_list">
                  <li>
                    <div className="meal_left">
                      <strong>Masala Vegan Tofu Scrambled</strong>
                      <span className="kcal">
                        +83 Kcal <span>(From Plan)</span>
                      </span>
                      <p>
                        Carbs: 0.40 kcal, Fat: 0.40 kcal, Protein: 0.40 kcal
                      </p>
                    </div>
                    <div className="meal_right">
                      <span className="meal-checked">
                        <figure>
                          <img
                            src="/img/green-check.png"
                            class="d-none d-md-block"
                            alt="check"
                          />
                        </figure>{" "}
                        Meal checked
                      </span>
                    </div>
                  </li>
                  <li>
                    <div className="meal_left">
                      <strong>Masala Vegan Tofu Scrambled</strong>
                      <span className="kcal">
                        +83 Kcal <span>(From Plan)</span>
                      </span>
                      <p>
                        Carbs: 0.40 kcal, Fat: 0.40 kcal, Protein: 0.40 kcal
                      </p>
                    </div>
                    <div className="meal_right">
                      <span className="meal-checked">
                        <figure>
                          <img
                            src="/img/green-check.png"
                            class="d-none d-md-block"
                            alt="check"
                          />
                        </figure>{" "}
                        Meal checked
                      </span>
                    </div>
                  </li>
                  <li>
                    <div className="meal_left">
                      <strong>Masala Vegan Tofu Scrambled</strong>
                      <span className="kcal">
                        +83 Kcal <span>(From Plan)</span>
                      </span>
                      <p>
                        Carbs: 0.40 kcal, Fat: 0.40 kcal, Protein: 0.40 kcal
                      </p>
                    </div>
                    <div className="meal_right">
                      <span className="meal-skippped">Skipped</span>
                    </div>
                  </li>
                  <li>
                    <div className="meal_left">
                      <strong>Masala Vegan Tofu Scrambled</strong>
                      <span className="kcal">
                        +83 Kcal <span>(From Plan)</span>
                      </span>
                      <p>
                        Carbs: 0.40 kcal, Fat: 0.40 kcal, Protein: 0.40 kcal
                      </p>
                    </div>
                    <div className="meal_right">
                      <span className="meal-unchecked">Unchecked</span>
                    </div>
                  </li>
                  <li>
                    <div className="meal_left">
                      <strong>Masala Vegan Tofu Scrambled</strong>
                      <span className="kcal">
                        +83 Kcal <span>(From Plan)</span>
                      </span>
                      <p>
                        Carbs: 0.40 kcal, Fat: 0.40 kcal, Protein: 0.40 kcal
                      </p>
                    </div>
                    <div className="meal_right">
                      <span className="meal-unchecked">Unchecked</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-sm-12 col-md-12 col-lg-4">
              <div className="dashboard-card right_bar">
                <h2>Log Water intake</h2>
                <p>
                  <span>Today (May 4, 2022)</span>
                </p>

                <div className="progress-tracker-wrap">
                  <div className="progress-tracker-img">
                    <img src="/img/progress-bar-circle.png" alt="img" />
                  </div>
                  <div>
                    <div className="progress-title">43/200</div>
                    <div className="progress-subtitle">Kcal consumed today</div>
                    <div className="progress-bar-label">
                      <span className="label-col pink" />
                      <span className="label-text">Carbs (20/100 gm)</span>
                    </div>
                    <div className="progress-bar-label">
                      <span className="label-col blue" />
                      <span className="label-text">Fat (0.02/1 gm)</span>
                    </div>
                    <div className="progress-bar-label">
                      <span className="label-col red" />
                      <span className="label-text">Protein (23/30 gm)</span>
                    </div>
                  </div>
                </div>

                <div className="logDetail">
                  <p className="log-heading">Log:</p>
                  <ul className="list-unstyled log_list meal_log">
                    <li>
                      <img src="/img/log-edit.svg" />
                      <p>
                        <strong>You logged on:</strong> <span>May 2, 2022</span>
                        <span className="block_text">
                          Carbs: 0.40 kcal, Fat: 0.40 kcal, Protein: 0.40 kcal
                        </span>
                      </p>
                    </li>
                    <li>
                      <img src="/img/log-edit.svg" />
                      <p>
                        <strong>You logged on:</strong> <span>May 2, 2022</span>
                        <span className="block_text">
                          Carbs: 0.40 kcal, Fat: 0.40 kcal, Protein: 0.40 kcal
                        </span>
                      </p>
                    </li>
                    <li>
                      <img src="/img/log-edit.svg" />
                      <p>
                        <strong>You logged on:</strong> <span>May 2, 2022</span>
                        <span className="block_text">
                          Carbs: 0.40 kcal, Fat: 0.40 kcal, Protein: 0.40 kcal
                        </span>
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="copyright-text">
        Copyright © 2010-2023 ELXR. All rights reserved.
      </div>
    </Container>
  );
}

export default progressTracker;
