import styled from "@emotion/styled";

export const SectionChannel = styled.section`
  .event-meta {
    @media (min-width: 768px) {
      display: flex;
      justify-content: space-between;
    }
  }
  .channel-title {
    text-align: center;
    line-height: 1;
    text-transform: uppercase;
    margin-bottom: 20px;
    font-size: 32px;
    @media (min-width: 768px) {
      text-align: left;
    }
  }

  .channel-action {
    display: block;
    text-align: center;
    margin-bottom: 1rem;
    @media (min-width: 768px) {
      text-align: right;
    }
  }

  .channel-footer {
  }

  .channel-artist {
    margin-bottom: 1rem;
    @media (min-width: 768px) {
      flex: 0 0 36%;
      margin-right: 15px;
    }
  }

  .channel-description {
    font-size: 17px;
    p {
      font-size: inherit;
    }
  }
`;
