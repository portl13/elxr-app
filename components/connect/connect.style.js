import styled from "@emotion/styled"
import { css } from "@emotion/core"


export const ConnectLoadMoreButton = styled.button`
    border: 1px solid #eee;
    &:hover{
        color: var(--primary-color);
    }
`

export const ButtonActionConnect = styled.button`
    font-size: 14px;
    font-weight: 500;
    padding: 0 0 10px;
    margin-right: 1.25rem !important;
    margin-top: 10px;
    color: ${props => props.active ? 'var(--primary-color)' : 'var(--white-color)'};
    border: 0;
    border-radius: 0;
    background-color: transparent;
    border-color: ${props => props.active ? '#fff' : 'var(--primary-color)'};
    text-transform: initial;
    &:active{
        background-color: transparent;
        color: ${props => props.active ? '#000100' : '#000100'};
        border-color: ${props => props.active ? '#FFF' : '#000'};
    }
    &:hover{
        color: ${props => props.active ? 'var(--primary-color)' : 'var(--primary-color)'};
        border-color: #FFF;
    }
    &:focus{
        outline: none;
    }
`

export const leftButton = css`
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
`

export const rightButton = css`
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
`

export const inputSearch = css`
    color: #eee !important;
    background-color: transparent;
    &:focus{
        background-color: transparent;
        border-color: #eee;
        color: #eee;
    }
`

export const groupTextStyle = css`
    background-color: transparent;
    border-left: none;
    cursor: pointer;
`
