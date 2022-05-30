import styled from '@emotion/styled';

export const ChannelProductStyle = styled.article`
  height:100%;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  overflow: hidden;
  align-items: center;
  margin-bottom: 15px;
  .channel-product-add-to-card {
    color: var(--white-color);
    border-top: 1px solid var(--primary-color);
    background-color: var(--primary-color);
    transition: all 0.2s linear;
    outline: none;
    text-decoration: none;
    border-radius: 0 0 4px 4px;
    text-transform: uppercase;
    font-weight: 400;
    font-size: 12px;
    line-height: 2.5;
    text-align: center;
    min-height: auto;
    white-space: nowrap;
    overflow: hidden;
    padding: 0.618em 1em;
    margin: 0;
    cursor: pointer;
    display: inline-block;
    width: 100%;
    &:hover {
      background-color: var(--primary-hover);
    }
  }
  .channel-product-body {
    padding: 0 15px;
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
    justify-content: center;
  }
  .channel-product-content{
    width: 100%;
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
  }
  .channel-product-title {
    margin: 0;
    font-size: 14px;
    font-weight: 400;
    text-align: center;
    color: var(--typo);
    padding: 0.5em 0;
  }
  .channel-product-price {
    display: block;
    font-weight: 400;
    margin-bottom: 0.5em;
    font-size: 0.857em;
    text-align: center;
  }
`;
