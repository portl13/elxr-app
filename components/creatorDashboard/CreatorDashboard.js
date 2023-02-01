import React from "react";
import AmountCard from '@components/creatorDashboard/cards/AmountCard';
import AmountCardLight from '@components/creatorDashboard/cards/AmountCardLight';
import MapCard from '@components/creatorDashboard/cards/MapCard';
import TopReferrersCard from '@components/creatorDashboard/cards/TopReferrersCard';
import StoreNotificationsCard from '@components/creatorDashboard/cards/StoreNotificationsCard';
import TopProductsCard from '@components/creatorDashboard/cards/TopProductsCard';

const SALES_ANALYTICS = {
    title: 'SALES Analytics',
    items: [
        {
            title:'Gross Sales',
            amount: 2200.50,
            time: 'Last 30 days',
        },
        {
            title:'Net Earnings',
            amount: 1540.00,
            time: 'Last 30 Days',
        },
        {
            title:'Items Sold',
            amount: 90,
            time: 'Last 30 Days',
        },
        {
            title:'Orders Recieved',
            amount: 63,
            time: 'Last 30 Days',
        }
    ]
}

const PAGE_ANALYTICS = {
    title: 'PAGE Analytics',
    items: [
        {
            title:'Followers',
            amount: 190,
            time: 'Last 30 Days',
        },
        {
            title:'Sunscribers',
            amount: 33,
            time: 'Last 30 Days',
        },
        {
            title:'Views',
            amount: 12801,
            time: 'This month',
        }
    ]
}

const AFFILIATE_STATS = {
    title: 'AFFILIATE STATS',
    items: [
        {
            title:'Total Commisions',
            amount: 1333.00,
            time: 'This month',
        },
        {
            title:'Paid Commisions',
            amount: 543.00,
            time: 'This month',
        },
        {
            title:'No. of Vendors',
            amount: 90,
            time: 'This month',
        },
        {
            title:'No. of Orders',
            amount: 66,
            time: 'This month',
        }
    ]
}

const TOP_REFERRERS = {
    items: [
        {
            url:'https://backend.portl.live/channel/contact/',
            count: 3,
        },
        {
            url:'https://backend.portl.live/channel/contact/',
            count: 3,
        },
        {
            url:'https://backend.portl.live/channel/contact/',
            count: 3,
        },
        {
            url:'https://backend.portl.live/channel/contact/',
            count: 3,
        },
        {
            url:'https://backend.portl.live/channel/contact/',
            count: 3,
        }
    ]
}

const STORE_NOTIFICATIONS = {
    items: [
        {
            order: 60473,
            channel: 'Woodland Channel Subscription',
        },
        {
            order: 60473,
            channel: 'Woodland Live Event Ticket',
        },
        {
            order: 60473,
            channel: 'Woodland Channel Subscription',
        },
        {
            order: 60473,
            channel: 'Woodland Downloadable Product',
        },
        {
            order: 60473,
            channel: 'Woodland Channel Subscription',
        },
        {
            order: 60473,
            channel: 'Woodland Live Event Ticket',
        },
        {
            order: 60473,
            channel: 'Woodland Channel Subscription',
        },
        {
            order: 60473,
            channel: 'Woodland Downloadable Product',
        },
    ]
}

function CreatorDashboard() {

  return (
    <>
      <div className="row">
        <div className="col-12">
          <h4 className="mb-4 font-weight-bold">Creator Dashboard</h4>
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-md-5 mb-3">
            <AmountCard data={SALES_ANALYTICS} />
        </div>
        <div className="col-12 col-md-3 mb-3">
            <AmountCardLight data={PAGE_ANALYTICS} />
        </div>
        <div className="col-12 col-md-4 mb-3">
            <AmountCard data={AFFILIATE_STATS} />
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-md-8 mb-3">
            <MapCard data={null} />
        </div>
        <div className="col-12 col-md-4 mb-3">
            <TopReferrersCard data={TOP_REFERRERS} />
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-md-4 mb-3">
            <StoreNotificationsCard data={STORE_NOTIFICATIONS} />
        </div>
        <div className="col-12 col-md-4 mb-3">
            <TopProductsCard data={null} />
        </div>
        {/* <div className="col-12 col-md-4 mb-3">
            <TopReferrersCard data={TOP_REFERRERS} />
        </div> */}
      </div>
    </>
  );
}

export default CreatorDashboard;
