import { css } from "@emotion/core";

const CardDashboard = (props) => {
  return (
    <div
      css={css`
        background-color: var(--dashboard-card);
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
          color: var(--bg-font);
          @media (min-width: 768px) {
            color:var(--bg-font);
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

export default CardDashboard;
