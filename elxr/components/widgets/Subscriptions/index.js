import React from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import useSWR from "swr";
import { genericFetch } from "@request/dashboard";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import Link from "next/link";
import { cardBox } from "@/elxr/components/widgets/Subscriptions/styles";
import Card from "@/elxr/components/bits/Card";
import { HeaderSection } from "@/elxr/components/widgets/Notifications/styles";
import Header from "@/elxr/components/bits/text/Header";
import ViewAllLink from "@/elxr/components/bits/buttons/ViewAllLink";
const myAccountApi = process.env.myAccount + "/subscriptions";

function Subscriptions({ token }) {
  const { data, isLoading } = useSWR(
    token ? [myAccountApi, token] : null,
    genericFetch,
    {
      revalidateOnFocus: false,
    }
  );

  return (
    <Card css={cardBox} className="card-box mobile-box pr-3">
      <HeaderSection>
        <Header sub="Your">Subscriptions ({data?.data?.length})</Header>
      </HeaderSection>
      <div className="list-container">
        {isLoading && <SpinnerLoader />}
        {!isLoading && (!data?.data || data?.data.length === 0) && (
          <div className="text-center w-100 p-2">
            <p className="no-record-color">You have no Subscriptions yet.</p>
            <Link href={"/professionals"}>
              <a className="link text-center">Discover Professionals</a>
            </Link>
          </div>
        )}
        {!isLoading && (
          <Scrollbars
            universal
            renderView={(props) => <div {...props} className="scroll-inner" />}
            renderThumbVertical={(props) => (
              <div {...props} className="thumb-vertical" />
            )}
          >
            {data?.data.map((c, k) => {
              return (
                <div className="list-row" key={k}>
                  <div className="img-box">
                    {c.product[0].img ? (
                      <img src={c.product[0].img} alt="default" />
                    ) : (
                      <div className="name-world">
                        <span className="name-inner-container">
                          {c.product[0].name
                            .split(" ")
                            ?.map((n) => n[0])
                            ?.join("")
                            ?.slice(0, 2) || "NA"}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="info-box">
                    <div className="bold-text">{c.product[0].name}</div>
                  </div>
                </div>
              );
            })}
          </Scrollbars>
        )}
      </div>
    </Card>
  );
}

export default Subscriptions;
