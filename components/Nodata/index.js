import React from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

export const LoadingBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  width: 220px;
  color: var(--primary-color);
  font-size: 16px;
  font-weight: 400;
  margin: 20px auto 0;
  cursor: default;
  height: 100%;
  div {
    margin-left: 15px;
  }
`;
const index = ({text=""}) => {
  return <LoadingBtn className="no_data">{text || 'No data found'}</LoadingBtn>;
};

export default index;
