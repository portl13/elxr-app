import styled from "@emotion/styled";

export const RationWrapper = styled.figure`

  position: relative;
  margin-bottom: 0;

  &:before {
    display: block;
    content: " ";
    width: 100%;
    padding-top: calc(9 / 16 * 100%) ;
  }

  & .img-ration {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

`
