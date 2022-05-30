import styled from "@emotion/styled";

const DoubleButton = styled.button`
display: inline-block;
    font-weight: 500;
    color: ${props => props.is_active ? "var(--dark-color)" : "#eee"};
    text-align: center;
    vertical-align: middle;
    user-select: none;
    background-color: ${props => props.is_active ? "#eee" : "var(--dark-color)"};
    border:  1px solid #eee;
    padding: .625rem 1.25rem;
    line-height: 1.5;
    border-radius: ${props => props.right ? ".25rem 0 0 .25rem" : "0 .25rem .25rem 0"} ;
    -webkit-transition: all .15s ease;
    transition: all .15s ease;
    &:focus{
      outline: none;
    }
`

export default DoubleButton
