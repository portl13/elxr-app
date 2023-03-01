import {css} from "@emotion/core";

export const mealCss = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 30px;
  .meal, .recipes {
    border-radius: 10px;
    &::before {
      content: '';
      background-color: rgba(10, 12, 13, 0.2);
    }
  }
  h4 {
    font-family: "Oswald", serif;
    font-weight: 700;
    text-transform: uppercase;
    color: #fff;
    margin: 0;
    font-size: 22px;
    line-height: 44px;
    padding: 5px 15px;
  }
`