import { NavItem, Nav } from "reactstrap";
import { css } from "@emotion/core";
import useIcon from "../../../hooks/useIcon";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { MenuContext } from "../../../context/MenuContext";

const HamburgerButton = () => {
  const { showMobileMenu, setShowMobileMenu } = useContext(MenuContext);

  const { iconElement: bars } = useIcon(faBars);

  return (
    <Nav
      css={css`
        @media (min-width: 768px) {
          display: none;
        }
      `}
    >
      <NavItem>
        <button
          css={css`
            border: none;
            color: white;
            background: #000;
            font-size: 22px;
            padding: 0 15px;
            &:focus {
              outline: none;
            }
          `}
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {bars}
        </button>
      </NavItem>
    </Nav>
  );
};

export default HamburgerButton;
