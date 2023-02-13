import React from "react";
import { useSession } from "next-auth/react";
import Discover from "@components/discover";
import Homepage from "@/elxr/pages/home";

export default function Home() {
  const { status } = useSession();
  return <>{status === "authenticated" ? <Homepage /> : <Discover />}</>;
}
