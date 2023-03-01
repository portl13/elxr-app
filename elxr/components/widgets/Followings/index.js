import React from "react";
import Card from "@/elxr/components/bits/Card";
import { HeaderSection } from "@/elxr/components/widgets/Notifications/styles";
import Header from "@/elxr/components/bits/text/Header";
import { Scrollbars } from "react-custom-scrollbars-2";
import Link from "next/link";
import { profileLink } from "@utils/links";
import useSWR from "swr";
import { genericFetch } from "@request/dashboard";
import { cardBox } from "@/elxr/components/widgets/Subscriptions/styles";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
const followingUrl = process.env.bossApi + "/members";

function Followings({ token, user }) {
  const { data: followList, isLoading: followLoading } = useSWR(
    token
      ? [`${followingUrl}?user_id=${user?.id}&scope=following`, token]
      : null,
    genericFetch,
    {
      revalidateOnFocus: false,
    }
  );

  return (
    <Card css={cardBox}>
      <HeaderSection>
        <Header sub="PEOPLE YOU ARE">FOLLOWING</Header>
      </HeaderSection>
      <div className="list-container">
        {followLoading && <SpinnerLoader />}
        {!followLoading && (!followList || followList.length === 0) && (
          <div className="text-center w-100 p-2">
            <p className="no-record-color">You are not Following anyone yet.</p>
            <a className="link text-center" href="/">
              Follow Elxr Professionals
            </a>
          </div>
        )}
        {!followLoading && followList && followList.length > 0 && (
          <Scrollbars
            universal
            renderView={(props) => <div {...props} className="scroll-inner" />}
            renderThumbVertical={(props) => (
              <div {...props} className="thumb-vertical" />
            )}
          >
            {followList.map((c, k) => {
              const userName = "";
              return (
                <Link key={c.id} href={profileLink(c.profile_name, c.id)}>
                  <a className="list-row">
                    <div className="img-box small-box">
                      {c?.avatar_urls?.thumb ? (
                        <img src={c?.avatar_urls?.thumb} alt="default" />
                      ) : (
                        <div className="name-world">
                          <span className="name-inner-container">
                            {userName}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="info-box">
                      <div className="bold-text">{c?.name}</div>
                      <div className="description-text">{c.mention_name}</div>
                    </div>
                  </a>
                </Link>
              );
            })}
          </Scrollbars>
        )}
      </div>
    </Card>
  );
}

export default Followings;
