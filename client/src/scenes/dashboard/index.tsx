import { Box, useMediaQuery } from "@mui/material";
// @ts-ignore
import React from "react";
import "./index.scss";
import TopThreeBoxes from "./TopThreeBoxes";
import MiddleThreeBoxes from "./MiddleThreeBoxes";
import LastFourBoxes from "./LastFourBoxes";

// @ts-ignore
const Dashboard = () => {
  // MUI built-in hook: If the viewport width is equal to or greater than 1200 pixels, return true, otherwise return false
  const isAboveMediumScreens = useMediaQuery("(min-width:1200px)");
  return (
    <Box
      className={`container ${
        isAboveMediumScreens ? "large-screen" : "small-screen"
      }`}
    >
      <TopThreeBoxes />

      <MiddleThreeBoxes />

      <LastFourBoxes />
    </Box>
  );
};

export default Dashboard;
