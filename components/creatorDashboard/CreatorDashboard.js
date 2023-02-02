import React from "react";
import AmountCard from '@components/creatorDashboard/cards/AmountCard';
import AmountCardLight from '@components/creatorDashboard/cards/AmountCardLight';
import MapCard from '@components/creatorDashboard/cards/MapCard';
import TopReferrersCard from '@components/creatorDashboard/cards/TopReferrersCard';
import StoreNotificationsCard from '@components/creatorDashboard/cards/StoreNotificationsCard';
import TopProductsCard from '@components/creatorDashboard/cards/TopProductsCard';
import SalesTrendsCard from '@components/creatorDashboard/cards/SalesTrendsCard';

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

const REGIONAL_ANALYTICS = {
    items: [
        {
          region: 'United States',
          views: 30,
          perceint: 100,
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

const TOP_PRODUCTS = {
    items: [
        { name: 'Shadows Mp3 Collection', value: 70 },
        { name: 'Woodland Channel Subscription', value: 20 },
        { name: 'Harp Course by Kelly', value: 10 },
    ]
}

const SALES_TRENDS = {
    items: [
        {
          name: 'Jan 29, 23',
          value: 0,
        },
        {
          name: 'Jan 30, 23',
          value: 0,
        },
        {
          name: 'Jan 31, 23',
          value: 0,
        },
        {
          name: 'Feb 1, 23',
          value: 25,
        }
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
            <MapCard data={REGIONAL_ANALYTICS} />
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
            <TopProductsCard data={TOP_PRODUCTS} />
        </div>
        <div className="col-12 col-md-4 mb-3">
            <SalesTrendsCard data={SALES_TRENDS} />
        </div>
      </div>
    </>
  );
}

export default CreatorDashboard;
