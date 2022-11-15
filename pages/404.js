import React from 'react';
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import {css} from "@emotion/core";
const style404 = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 500px);
  text-align: center;
  .page-404{
    font-size: 150px;
    line-height: 1;
  }
  .not-found{
    font-size: 40px;
  }
`

function Page404()
{
    return (
        <MainLayout title={"page not found"} sidebar={<MainSidebar />}>
            <div css={style404}>
                <div className={'container-404'}>
                    <h2 className={"page-404"}>404</h2>
                    <p className={"not-found"}>page not found</p>
                </div >
            </div>
        </MainLayout>
    );
}

export default Page404;