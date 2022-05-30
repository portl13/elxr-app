import styled from '@emotion/styled'

export const WrapperProdutcDetail = styled.article`
  @media (min-width: 992px) {
    display: flex;
  }
  .product-gallery {
    border: 1px solid #e7e9ec;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 15px;
    @media (min-width: 992px) {
      border-right: none;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      margin-bottom: 0;
      flex: 1 0 auto;
      max-width: 50%;
    }
  }
  .product-detail {
    border: 1px solid #e7e9ec;
    border-radius: 4px;
    overflow: hidden;
    background-color: #1b1b1b;
    padding: 1.5rem;
    margin-bottom: 32px;
    @media (min-width: 992px) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      margin-bottom: 0;
      border-left: 0;
    }
  }
  .product-detail-price {
    display: block;
    font-weight: 500;
    font-size: 1.25em;
    margin-top: 1.2em;
    margin-bottom: 1.2em;
    color: var(--primary-color);
  }
  .product-detail-title {
    font-size: 1.2rem;
  }
  .pr-sub-heading {
    text-transform: uppercase;
    font-size: 0.75rem;
    font-weight: 600;
    margin-bottom: 10px;
    border-bottom: 1px solid #e7e9ec;
  }
  .pr-atts-row {
    display: flex;
    align-items: center;
    font-size: 14px;
  }
  .pr-atts-title {
    width: 40%;
    color: #a3a5a9;
  }
`
