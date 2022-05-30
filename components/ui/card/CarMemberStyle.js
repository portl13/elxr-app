import styled from "@emotion/styled"

const CarMemberStyle = styled.article`
    @media(max-width: 767px){
        .member-card-action{
            display: none !important;
        }
    }
    .list-wrap{
        overflow: visible;
        padding: 15px 20px;
        position: relative;
        transition: box-shadow linear .2s;
    }
    .list-wrap-inner{
        display: flex;
    }
    .member-avatar-container{
        float: left;
        margin: 0 20px 0 0;
    }
    .item {
        flex: 1;
        display: flex;
        flex-flow: row wrap;
        margin: 0;
    }

    .member-card-button-action{
        background: transparent;
        border: none;
        color: #eee;
        height: 34px;
        margin: auto 0;
        svg{
            height: 22px;
            width: 22px;
        }
    }

    .member-card-button-action:focus{
        outline: none;
    }

    .member-card-body{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .member-card-action{
        display: flex;
        align-items: center;
        margin-left: auto;
    }

    h2{
        display: inline-block;
        font-size: 20px;
        font-weight: 500;
        line-height: 1.2;
        margin-bottom: 0;
    }

    h3{
        font-size: 16px;
    }
`

export default CarMemberStyle;
