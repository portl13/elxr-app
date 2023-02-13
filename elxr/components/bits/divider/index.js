import { css } from "@emotion/core";

const Divider = (props) => {
  return (
    <div
      css={css`
        width: 100%;
        opacity: 0.06;
        border: 1px solid #000000;
      `}
      {...props}
    />
  );
};

export default Divider;
