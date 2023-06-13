import React, { useContext } from 'react'
import AmountCard from '@components/creatorDashboard/cards/AmountCard'
import AmountCardLight from '@components/creatorDashboard/cards/AmountCardLight'
import StoreNotificationsCard from '@components/creatorDashboard/cards/StoreNotificationsCard'
import { UserContext } from '@context/UserContext'
import { Section } from '@/elxr/pages/home/styles'
import AmountPayoutCard from './cards/AmountPayoutCard'
import AmountChooseDateCard from './cards/AmountChooseDateCard'
import AmountFollowings from './AmountFollowings'
import AmountSubscriptions from './AmountSubscriptions'

function CreatorDashboard() {
  const { user } = useContext(UserContext)
  const token = user?.token
  return (
    <>
      <div className="row">
        <div className="col-12">
          <h4 className="mb-4 font-weight-bold">Creator Dashboard</h4>
        </div>
      </div>
      <div className="dash-analytics-container">
        <div className="sales-analytics">
          <AmountCard token={token} />
        </div>
        <div className="next-payout">
          <AmountPayoutCard token={token} />
        </div>
        <div className="sales-choose-date">
          <AmountChooseDateCard token={token} />
        </div>
        <div className="page-analytics">
          <AmountCardLight token={token} />
        </div>
        <div className="store-notification">
          <StoreNotificationsCard token={token} />
        </div>
        <Section area="following">
          <AmountFollowings token={token} user={user} />
        </Section>
        <Section area="subscription">
          <AmountSubscriptions token={token} />
        </Section>
      </div>
    </>
  )
}

export default CreatorDashboard
