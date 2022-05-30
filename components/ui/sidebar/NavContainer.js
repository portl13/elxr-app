import styled from "@emotion/styled";

export const NavContainer = styled.nav`
    display: none;
    position: relative;
    padding-right: 15px;
    padding-left: 15px;
    width: 80px;

    @media(min-width:768px){
      display: block;
    }
    @media(min-width:1024px){
        width: 200px;
    }

    ul{
      max-width: 100%;
    }
`
