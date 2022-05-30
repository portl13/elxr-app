import styled from '@emotion/styled'
import { SectionChannel } from "./SectionChannel";

export const SectionEvent = styled(SectionChannel)`
    padding-bottom: 2rem;
    .event-meta{
        margin-bottom: 15px;
    }
    .event-extra-details{
        margin-top: 30px;
    }
    .events-info-footer {
        p {
            font-weight: 400;
            color: #ffffff;
            font-size: 16px;
        }
    }
    .events-main-tag {
        margin: 30px 0 0 0;
        .img-ration {
            width: 100%;
            height: auto;
            max-width: 100%;
        }
        .click-events {
            width: 100%;
            display: flex;
            margin: 0 0 15px 0;
            justify-content: end;
            a {
                margin: 0 0 0 5px;
            }
        }
        .event-meta-left {
            display: flex;
            flex-direction: row;
            .event-left-panel {
                flex: 0 0 50px;
                max-width: 50px;
                text-align: center;
                line-height: 1;
                padding: 12px 0 0 0;
                display: flex;
                flex-direction: column;
                font-size: 36px;
                font-weight: 400;
                span {
                    color: #f1451f;
                    font-size: 18px;
                    margin-bottom: 5px;
                    font-weight: inherit;
                    display: block;
                    text-transform: uppercase;
                }
            }
            .event-right-panel {
                flex: 1;
                padding-left: 20px;
                padding-top: 2px;
                display: flex;
                flex-direction: column;
                position: relative;
                h1 {
                    font-weight: 500;
                    font-size: 40px;
                }
                .event-date {
                    font-size: 14px;
                    color: #a3a5a9;
                    line-height: 1;
                    margin-bottom: 20px;
                }
                .event-address{
                    margin-bottom: 10px;
                    color:white;
                    font-size: 14px;
                    line-height: 1;
                    span{
                        color: #a3a5a9;
                    }
                    &.end{
                        margin-bottom: 30px;
                    }
                }
            }
        }
    }
    .svg-icon {
        width: 5px;
        position: absolute;
        right: 11px;
        top: 15px;
        .tooltip-panel {
            width: 130px;
            display: block;
            background: #ccc;
            padding: 10px 10px 0 10px;
            background: #545454;
            position: absolute;
            right: -8px;
            top: 22px;
            border-radius: 5px;
            ul {
                margin: 0;
                padding: 0;
                width: 100%;
                list-style: none;
                li {
                    padding: 0 0 10px 0;
                    font-size: 12px;
                    color: #ffffff !important;
                    cursor: pointer;                    
                    a{
                        color: #ffffff !important;
                        cursor: pointer;
                        &:hover {
                            color: #eb1e79 !important;
                        }
                    }
                }
            }
        }
    }
    .event-title{
        font-size:24px;
    }
    .event-meta-right{
         display: flex;
    }
    .event-date{
        display:block;
        margin-bottom: 15px;
    }
    .event-interested{
        max-height: 60px;
        width: 120px;
    }
    .event-meta-item{
        display: block;
    }
    .event-interested-icon{
        display: flex;
        width: 100%;
        background: #310047;
        border-radius: 50px;
        height: 35px;
        margin-bottom: 11px;
        justify-content: space-evenly;
        align-items: center;
        height: 40px;
    }
    .icon-action{
        width: 30px;
    }
    .icon-bookmark{
        width: 20px;
    }
    .icon-check{
        font-size: 24px;
        text-align: center;
        cursor:pointer;
    }
    .icon-action-check{
        font-size: 24px;
        text-align: center;
        cursor:pointer;
    }
    .event-interested-text{
        display: flex;
    }
    .text-acion-left{
        font-size: 11px;
        font-weight: 500;
        line-height: 1;
        width: 50%;
        display: block;
        text-align: center;
        cursor:pointer;
    }
    .text-acion-right{
        font-size: 11px;
        font-weight: 500;
        line-height: 1;
        text-align: right;
        cursor:pointer;
    }
    .content-css{
        width: 100%;
        min-width: 100%;
    }
    .channel-info{
        max-width: 100%;
        overflow-x: hidden;
        color: var(--typo);
    }
    .channel-info p {
        color: var(--typo);
    }
`
