import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2'
import useSWR from 'swr'
import { genericFetch } from '@request/dashboard'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import Link from 'next/link'
import { cardBox } from '@/elxr/components/widgets/Subscriptions/styles'
import Card from '@/elxr/components/bits/Card'
import { HeaderSection } from '@/elxr/components/widgets/Notifications/styles'
import Header from '@/elxr/components/bits/text/Header'
import { professionalsLink, profileLink } from '@utils/links'
import CardDashboard from '@/elxr/components/bits/CardDashboard'
const myAccountApi = `${process.env.apiV2}/dashboard/subs/`

function AmountSubscriptions({ token }) {
  const { data, isLoading } = useSWR(
    token ? [myAccountApi, token] : null,
    genericFetch,
    {
      revalidateOnFocus: false,
    }
  )

  return (
    <CardDashboard css={cardBox} className="card-box mobile-box pr-3">
      <HeaderSection>
        <h5 className="font-quicksand">SUBSCRIBERS</h5>
      </HeaderSection>
      <div className="list-container">
        {isLoading && <SpinnerLoader />}
        {!isLoading && (!data || data?.length === 0) && (
          <div className="text-center w-100 p-2">
            <p className="no-record-color">You have no subscribers.</p>
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
            {data?.map((c, k) => {
              return (
                <Link key={c.id} href={profileLink(c.user_nicename, c.id)}>
                  <div className="list-row pointer">
                    <div className="img-box">
                      {c?.avatar ? (
                        <img src={c.avatar} alt="default" />
                      ) : (
                        <div className="name-world">
                          <span className="name-inner-container">
                            {c.user_nicename
                              .split(' ')
                              ?.map((n) => n[0])
                              ?.join('')
                              ?.slice(0, 2) || 'NA'}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="info-box bold-text">{c.user_nicename}</div>
                  </div>
                </Link>
              )
            })}
          </Scrollbars>
        )}
      </div>
    </CardDashboard>
  )
}

export default AmountSubscriptions
