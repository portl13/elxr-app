import React from "react";
import Card from "@/elxr/components/bits/Card";
import SpinnerLoader from "@/components/shared/loader/SpinnerLoader";
import useEvent from "@/elxr/hooks/useEvent";

import LiveBeatRate from "@/elxr/components/assets/svg/icons/LiveBeatRate";
import ButtonLink from "@/elxr/components/bits/buttons/ButtonLink";
import { useActivitiesInfinite } from "@/elxr/hooks/api/activities";

import {
  Header,
  HeaderLive,
  HeaderSection,
  NavigationSection,
  cardCSS,
  List,
} from "./styles";
import FeedItem from "./FeedItem";

const PAGE_SIZE = 6;

const Live = () => {
  const [loading, setLoading] = React.useState(false);
  const listInnerRef = React.useRef();
  const { data, error, size, setSize } = useActivitiesInfinite({
    per_page: PAGE_SIZE,
  });

  React.useEffect(() => {
    if (loading) {
      setSize((prevSize) => prevSize + 1);
      setLoading(false);
    }
  }, [loading, setSize]);

  const activities = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

  const onScroll = useEvent(() => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 400) {
        if (!isLoadingMore && !isReachingEnd) {
          setLoading(true);
        }
      }
    }
  });

  return (
    <Card css={cardCSS}>
      <HeaderSection>
        <Header sub="RECENT ACTIVITY">Your Community</Header>
      </HeaderSection>
      <NavigationSection>
        <ButtonLink href="/livefeed" variant="gradient" disabled>
          Feeds
        </ButtonLink>
      </NavigationSection>

      {isLoadingInitialData && <SpinnerLoader />}

      {!isLoadingInitialData && (
        <List onScroll={onScroll} ref={listInnerRef}>
          {activities.map((a) => (
            <FeedItem key={a.id} item={a} />
          ))}
          {isLoadingMore && <SpinnerLoader />}
        </List>
      )}
    </Card>
  );
};

export default Live;
