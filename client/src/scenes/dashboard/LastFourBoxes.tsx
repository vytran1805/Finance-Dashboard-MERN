import DashboardBox from "@/components/DashboardBox";
// @ts-ignore
import React from "react";

type Props = {};

// @ts-ignore
const LastFourBoxes = (props: Props) => {
  return (
    <>
      <DashboardBox gridArea="g"></DashboardBox>
      <DashboardBox gridArea="h"></DashboardBox>
      <DashboardBox gridArea="i"></DashboardBox>
      <DashboardBox gridArea="j"></DashboardBox>
    </>
  );
};

export default LastFourBoxes;
