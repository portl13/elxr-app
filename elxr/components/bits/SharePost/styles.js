import { css } from "@emotion/core";

export const ShareActions = (props) => {
  return (
    <div
      css={css`
        display: flex;
        gap: 6px;
      `}
      {...props}
    />
  );
};
