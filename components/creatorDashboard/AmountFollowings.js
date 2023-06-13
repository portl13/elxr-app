import React from "react";
import Card from "@/elxr/components/bits/Card";
import { HeaderSection } from "@/elxr/components/widgets/Notifications/styles";
import Header from "@/elxr/components/bits/text/Header";
import { Scrollbars } from "react-custom-scrollbars-2";
import Link from "next/link";
import { profileLink } from "@utils/links";
import useSWR from "swr";
import { genericFetch } from "@request/dashboard";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import CardDashboard from "@/elxr/components/bits/CardDashboard";
import { cardBox } from "@/elxr/components/widgets/Subscriptions/styles";
const followingUrl = process.env.bossApi + "/members";

function AmountFollowings({ token, user }) {
  const { data: followList, isLoading: followLoading } = useSWR(
    token
      ? [`${followingUrl}?user_id=${user?.id}&scope=followers`, token]
      : null,
    genericFetch,
    {
      revalidateOnFocus: false,
    }
  );

  return (
    <CardDashboard css={cardBox}>
      <HeaderSection>
        <h5 className="font-quicksand">followers</h5>
      </HeaderSection>
      <div className="list-container">
        {followLoading && <SpinnerLoader />}
        {!followLoading && (!followList || followList.length === 0) && (
          <div className="text-center w-100 p-2">
            <p className="no-record-color">You have no followers yet!</p>
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
              return (
                <Link key={c.id} href={profileLink(c.profile_name, c.id)}>
                  <a className="list-row">
                    <div 
                    
                    style={{
                      backgroundImage: `url(${c?.avatar_urls?.thumb})`
                    }}
                    className="img-box small-box bg-cover bg-gray">
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
    </CardDashboard>
  );
}

export default AmountFollowings;
