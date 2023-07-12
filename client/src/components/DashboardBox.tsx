import { Box, styled } from "@mui/material";

/**
 * Style each of the card
 */
const DashboardBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.light,
  borderRadius: "1rem",
  boxShadow: "0.15rem 0.2rem 0.15rem 0.1rem rgba(0,0,0,.8)",
}));

export default DashboardBox;
