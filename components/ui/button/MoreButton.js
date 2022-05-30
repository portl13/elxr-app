import styled from "@emotion/styled"

export const MoreButton = styled.button`
    display: flex;
    align-items: center;
    width: 100%;
    background: transparent;
    color: #eee;
    border: none;
    margin-top: 15px;
    margin-bottom: 15px;
    &:focus{
        outline: none;
    }
    span{
        flex: 1 0 auto;
    }
    &::before,&::after{
        display: flex;
        align-items: center;
        content: ' ';
        background-color: rgb(45 45 45 / .8);
        height: 1px;
        width: 100%;
    }

    &::before{
        margin-right: 15px;
    }

    &::after{
        margin-left: 15px;
    }
    button{
        background:transparent;
        color:#eee;
        border:none;
    }
`
