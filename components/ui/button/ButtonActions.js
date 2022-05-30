import styled from "@emotion/styled";

export const ButtonActions = styled.button`
  background: transparent;
  color: #eee;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  max-width: 70px;
  margin-left: 10px;
  max-height: 60px;

  &:focus {
    outline: none;
  }

  .icon-action {
    font-size: 24px;
  }
  .text-acion {
    font-size: 11px;
    font-weight: 500;
    white-space: nowrap;
  }
`;

export const ButtonActionMark = styled(ButtonActions)`
  i {
    font-size: 22px;
  }
`;
