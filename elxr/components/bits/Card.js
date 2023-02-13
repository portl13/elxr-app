import { css } from "@emotion/core";

const Card = (props) => {
  return (
    <div
      css={css`
        background-color: white;
        height: 100%;
        padding: 20px 16px;

        @media (min-width: 768px) {
          border-radius: 10px;
          padding: 20px 30px;
        }
      `}
      {...props}
    />
  );
};

export default Card;
