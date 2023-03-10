import { css } from '@emotion/core'
import styled from '@emotion/styled'

export const LoginContainer = styled.div`
  max-width: 450px;
  padding: 0;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  &.full{
    max-width: 1200px;
  }
  .password-reset-input {
    position: relative;
  }

  svg {
    width: 20px;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    margin: 12px;
  }
`

export const topInputStyle = css`
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  border-bottom: 1px solid #525f7f;
`

export const midleInputStyle = css`
  border-radius: 0;
  border-bottom: 1px solid #525f7f;
`
export const bottomInputStyle = css`
  border-top-right-radius: 0;
  border-top-left-radius: 0;
`

export const AnchorCaption = styled.div`
  font-size: 24px;
  margin-top: 20px;
`

export const DivCaption = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  margin: auto;
  span {
    flex: 1 0 auto;
  }

  &::before,
  &::after {
    display: flex;
    align-items: center;
    content: ' ';
    background-color: rgb(45 45 45 / 0.8);
    height: 1px;
    width: 100%;
  }

  &::before {
    margin-right: 15px;
  }

  &::after {
    margin-left: 15px;
  }
`

export const inputLabelStyle = css`
  font-weight: 400;
  color: var(--primary-color);
  font-size: 14px;
  margin: 0 0 3px;
  width: 100%;
  text-align: left;
`
export const inputWithLabelStyle = css`
  display: flex;
  align-items: center;
  label {
    margin-bottom: 0;
    margin-right: 0.5rem;
    color: var(--primary-color);
    font-size: 14px;
  }
  select {
    margin-bottom: 0 !important;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
`
export const BackLink = styled.div`
  font-size: 14px;
  text-transform: lowercase;
  text-align: left;
  margin-bottom: 1.2rem;
  span {
    color: #fff;
    &:hover {
      color: var(--primary-color);
    }
  }
`
