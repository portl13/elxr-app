import styled from "@emotion/styled";

export const ActionBarWrapper = styled.div`
display: flex;
align-items: center;
justify-content: flex-end;
margin-bottom: 20px;
.member-recent-activity-panel {
  width: auto;
  display: flex;
  flex-direction: row;
}
.has-tooltip{
  padding: 4px 7px;
  position: relative;
  opacity: .4;
  color: var(--bg-font-grey);
  &:last-child{
    border-left: 1px solid var(--bg-font-grey);
  }
  .popover{
    display: none;
    transition: all .18s ease-out .18s;
    white-space: nowrap;
    .popover-body{
      font-weight: 500;
      font-size: 13px;
      line-height: 1.3;
      padding: 7px 15px;
    }
    &.bs-popover-top{
      margin-bottom: 0.5rem;
      .arrow{
        bottom: calc((0.5rem + 1px) * -1);
        margin: 0 1.5rem;
        &::before{
          bottom: 0;
          border-width: 0.5rem 0.5rem 0;
          border-top-color: transparent;
        }
        &::after{
          bottom: 1px;
          border-width: 0.5rem 0.5rem 0;
          border-top-color: #fff;
        }
      }
    }
  }
  &:hover{
    opacity: 1;
    color: #e0116d;
    .popover{
      display: block;
      transform: translate(-40%,-130%);
      &.bs-popover-top .arrow{
        margin: 0 2.3rem;
      }
    }
  }
}
svg{
  height: 18px;
  width: 18px;
}
select{
  -webkit-appearance: none;
  -moz-appearance:    none;
  appearance:         none;
  background-color: var(--bg);
  border: 1px solid var(--typo);
  color: var(--typo);
  width: auto;
  min-width: 140px;
  border-radius: 3px;
  margin-bottom: 0 !important;
  margin-right: 12px;
  &:hover,
  &:active,
  &:focus{
    background-color: var(--bg);
    border-color: var(--typo);
    color: var(--typo);
  }
}
`
