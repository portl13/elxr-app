const { css } = require("@emotion/core");

export const lessonItem = css`
    display: flex;
    border-bottom: 2px solid var(--text-grey);
    padding-bottom: 2rem;
    margin-top: .8rem;
    &:first-of-type{
        margin-top: 0;
    }
    &:last-child {
        border-bottom: none;
        padding-bottom: 0;
    }
    .lesson-content{
        width: 95%;
    }
    .lesson-content-icon{
        width: 5%;
    }
    .lesson-meta{
        color: var(--text-grey);
    }
    .lesson-title{
        font-size: 20px;
        margin: 0;
    }
    .lesson-icon{
        width: 30px;
        height: 30px;
    }
`