import React from "react";
import Discover from "@components/discover";
import Homepage from "@/elxr/pages/home";
import { getToken } from "next-auth/jwt";

export default function Home({ home }) {
  return <>{home ? <Homepage /> : <Discover />}</>;
}

export const getServerSideProps = async ({ req }) => {
  const session = await getToken({ req });
  return {
    props: { home: !!session },
  };
};
