import React, { useContext } from "react";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import BackButton from "@components/shared/button/BackButton";
import { UserContext } from "@context/UserContext";
import useSWR from "swr";
import { genericFetch } from "@request/dashboard";
import SubscriptionCard from "@components/my-purchases/subscriptions/SubscriptionCard";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";

const myAccountApi = process.env.myAccount + "/subscription";

function Subscriptions({ id }) {
  const { user } = useContext(UserContext);
  const token = user?.token;
  const { data, error } = useSWR(
    token ? [`${myAccountApi}/${id}`, token] : null,
    genericFetch
  );
  const isLoading = !data && !error;
  
  return (
    <MainLayout title={"Subscriptions"} sidebar={<MainSidebar />}>
      <BackButton />
      <div className="container container-80 mt-4">
        {isLoading && <SpinnerLoader />}
        {data && data?.data.length > 0 ? <SubscriptionCard result={data?.data[0]} /> : null}
      </div>
    </MainLayout>
  );
}

export default Subscriptions;

export async function getServerSideProps({ query }) {
  const { id } = query;
  return {
    props: { id },
  };
}
