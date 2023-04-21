import { css } from "@emotion/core";

const Card = (props) => {
  return (
    <div
      css={css`
        background-color: white;
        height: 100%;
        padding: 20px 16px;

        & table {
          table-layout: fixed;
          width: 100%;
        }
        & td {
          width: 25%;
          text-align: center;
        }

        @media (min-width: 768px) {
          border-radius: 10px;
          padding: 20px 30px;
        }
        .thumb-vertical {
          background: #eee;
          border-radius: 6px;
        }
        .bold-text {
          font-family: "Quicksand", serif;
          font-style: normal;
          font-weight: 700;
          font-size: 16px;
          line-height: 20px;
          /* identical to box height */
          text-align: center;
          color: #000;
          @media (min-width: 768px) {
            color: #000;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            text-align: left;
            font-size: 16px;
          }
        }
      `}
      {...props}
    />
  );
};

export default Card;
