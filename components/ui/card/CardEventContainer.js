import styled from '@emotion/styled';

const CardEventContainer = styled.article`
    position: relative;
    overflow: hidden;
    border-radius: 4px;
    margin-bottom: 25px;
    max-width:100%;
    min-height: 285px;
    /* &::before{
        display: block;
        content: "";
        width: 100%;
        padding-top: 70%;
    } */
    img {
        max-width: 100%;
        //height: 200px;
    }
    .card-link-event{
        /* position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0; */
        cursor: pointer;
    }
    .card-title-event{
        font-size:16px;
        overflow-y: hidden;
        line-height: 1;
        margin: 0 0 6px;
        margin-bottom: 5px;
        font-size: 14px;
        line-height: 1.45;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        &:hover {
            color: var(--primary-color);
            text-decoration: underline;
        }
    }
    .card-time-event{
        font-weight: 600;
        text-transform: uppercase;
        font-size: 13px;
        color: #A3A5A9;
    }
    .card-header-event {
        float: none;
        width: 100%;
        //padding-right: 15px;
        height: auto;
        .image1 {
            position: relative;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
          }
          .image2 {
            position: absolute;
            width:37px;
            top: 1px;
            right: 15px;
          }
    }
    .event-footer-events {
        padding: 0;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        .text-section {
            padding-left: 12px;
            flex: 1;
            padding-top: 2px;
            align-items: flex-start;
            display: flex;
            flex-direction: column;
            .card-title-event {
                font-weight: 500;
                font-size: 16px;
            }
            .card-time-event {
                margin-bottom: 5px;
            }
        }
        .date-panel {
            border-right: 1px solid var(--typo);
            padding-right: 5px;
            padding: 3px 8px 3px 0;
            color: var(--typo);
            font-size: 24px;
            display: flex;
            flex-direction: column;
            span {
                font-size: 12px;
                color: #f1451f;
                margin-bottom: 5px;
                font-weight: inherit;
                display: block;
                text-transform: uppercase;
            }
        }
    }
    .card-footer-event{
        /* position: absolute;
        left: 0;
        right: 0;
        top: 202px; */
        position: relative;
        padding:.4rem;
        color: var(--typo);
        background: var(--bg);
        width: 100%;
        padding-right: 30px;
        margin-bottom: 5px;
        font-size: 14px;
        line-height: 1.45;
        .svg-icon {
            width: 5px;
            position: absolute;
            right: 11px;
            top: 6px;
            .tooltip-panel {
                width: 130px;
                display: block;
                background: #ccc;
                padding: 10px 10px 0 10px;
                background: #545454;
                position: absolute;
                right: -8px;
                bottom: 17px;
                border-radius: 5px;
                ul {
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    width: 100%;
                    li {
                        padding: 0 0 10px 0;
                        font-size: 12px;
                        cursor: pointer;
                        a{
                            color: #ffffff !important;
                            cursor: pointer;
                            &:hover {
                                color: var(--primary-color) !important;
                            }
                        }
                    }
                }
            }
        }
        .card-title-event-detail {
            font-size: 11px;
        }
    }
`

export default CardEventContainer;
