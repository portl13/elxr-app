import { css } from '@emotion/core'

export const courseDetailUsersStyle = css`
  .card-courses-avatar {
    border-radius: 50%;
    border: 1px solid var(--white-color);
    background-color: var(--text-grey);
    width: 70px;
    height: 70px;
    z-index: 1;
    overflow: hidden;
  }
  .card-courses-users{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    @media (min-width: 768px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media (min-width: 992px) {
        grid-template-columns: repeat(4, 1fr);
    }
    @media (min-width: 1440px) {
        grid-template-columns: repeat(8, 1fr);
    }
  }
  .card-courses-title{
    text-align: center;
    font-size: 12px;
  }
`
