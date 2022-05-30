import styled from '@emotion/styled';

export const ChannelTabsStyle = styled.ul`
  padding: 0;
  float: left;
  width: 100%;
  margin: 0 0 50px 0;
  list-style: none;
  .channel-tab-item {
    padding: 0;
    float: left;
    border: 1px solid var(--white-color);
    border-bottom: 1px solid var(--white-color);
    position: relative;
    margin: 0;
    margin-right: 2px;
    margin-bottom: -2px;
    border-top: none !important;
    border-left: none;
    border-right: none;
    
    &.active {
      border-top: 2px solid var(--white-color);
      border-bottom: 1px solid var(--primary-color);
      .channel-tab-item-link{
        color: var(--primary-color);
      }
    }
    &.active::before{
      width:0 !important;
    }
  }
  .channel-tab-item-link {
    font-size: 12px;
    line-height: 18px;
    letter-spacing: 0.3px;
    color: var(--white-color);
    padding: 10px 19px 10px 19px;
    display: inline-block;
    text-transform: uppercase;
  }
`;
