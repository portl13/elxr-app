import { Button } from "reactstrap";
import { css } from "@emotion/core";

const ButtonBlackWhite = ({ className, handlerClick, children, is_black }) => {
  const buttonColor = "var(--dark-color)";
  return (
    <Button
      css={css`
        min-width: 170px;
        height: 35px;
        line-height: 1;
        padding: 0;
        background: ${is_black ? buttonColor : "#eee"};
        color: ${is_black ? "#eee" : buttonColor};
        border: ${is_black ? "1px solid #eee" : "1px solid #eee"};
        &:hover {
          background: ${is_black ? "#eee" : buttonColor};
          color: ${is_black ? buttonColor : "#eee"};
        }
        &:active {
          background-color: transparent !important;
        }
      `}
      className={className}
      onClick={() => handlerClick}
    >
      {children}
    </Button>
  );
};

export default ButtonBlackWhite;
