import styled from '@emotion/styled';

export const LiMenuItem = styled.li`

    cursor: pointer;



    .sidebar-text{
        display: none;
    }
    .sidebar-icon {
        width: 20px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #eee;
    }

    .nav-link{
        padding: .6rem 0.75rem;
    }
    @media(min-width:1200px){
        .sidebar-text{
            display: block;
            font-size: 14px;
            line-height: 1;
        }
        .sidebar-link{
            display: flex;
            align-items: flex-end;
            padding-left:0;
            padding-right:0;
        }
        .sidebar-icon{
            margin-right: 10px;
            justify-content: flex-start;
        }
        .nav-link{
            color:#eee;
            padding: 0.938rem 0.75rem;
        }
    }

    &:hover .sidebar-icon, &:hover .nav-link{
        transition: all .3s ease;
        color: #eb1e79;
    }
`
