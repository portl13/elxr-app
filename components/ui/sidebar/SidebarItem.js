import styled from "@emotion/styled";

export const SidebarItem = styled.li`
  position: relative;
  min-height: 45px;
  .sidebar-link {
    display: block;
    color: #eee;
    padding: 15px 0;
    display: flex;
    font-size: 14px;
    letter-spacing: -0.24px;
    align-items: center;
    line-height: 1;
    position: absolute;
    width: 100%;
  }
  .sidebar-link:hover {
    color: #eb1e79;
  }
  .sidebar-icon{
    font-size: 18px;
    min-width: 35px;
  }

`;
