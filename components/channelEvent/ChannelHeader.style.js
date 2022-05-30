import styled from '@emotion/styled'

export const ChannelHeaderStyle = styled.header`
  position: relative;
  min-height: 260px;
  margin-bottom: 30px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  .channel-header {
    background-color: rgba(77,92,109,.8);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    @media (min-width: 992px) {
      flex-direction: row;
    }
    //max-height: 60px;
  }
  .channel-header-title-avatar {
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    @media (min-width: 992px) {
      flex-direction: row;
      padding-left: 60px;
    }
  }
  .channel-header-avatar-container {
    position: relative;
    width: 90px;
    @media (min-width: 992px) {
      width: 150px;
    }
  }
  .channel-header-avatar {
    position: absolute;
    width: 90px;
    height: 90px;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 0 6px 0 #ccc;
    bottom: -15px;

    @media (min-width: 992px) {
      flex-direction: row;
      height: 150px;
      width: 150px;
    }
  }
  .channel-header-title {
    display: flex;
    align-items: center;
    color: var(--white-color);
    font-size: 1.618em;
    clear: both;
    font-weight: 500;
    margin-left: 30px;
    margin-bottom: 0;
    height: 60px;
  }
`
