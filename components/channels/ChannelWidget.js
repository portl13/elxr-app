import { css } from '@emotion/core'
import styled from "@emotion/styled";

const widgetStyle = css`
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    padding: 1.5rem 1rem;
    & .widget-content{
        word-break: break-word;
    }

    & ul{
        padding-left: 0;
        list-style: none;
    }
    & li {
        margin-bottom: 15px;
    }
    .widget-about{
        margin-bottom: 15px;
    }
    ul.d-flex{
        margin-bottom: 0;
    }
    .d-flex li{
        margin-right: 5px !important;
    }
`

const H1Title = styled.h3`
      display: table;
      text-transform: uppercase;
      background: linear-gradient(90deg, rgba(200,71,236,1) 0%, rgba(213,71,192,1) 25%, rgba(230,71,137,1) 50%, rgba(248,165,99,1) 75%, rgba(255,201,84,1) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
`

const ChannelWidget = ({ title, children }) => {
    return (
        <div css={widgetStyle} className="channel-br">
            <H1Title>{title}</H1Title>
            <div className="widget-content">
                {children}
            </div>
        </div>
    );
}

export default ChannelWidget;
