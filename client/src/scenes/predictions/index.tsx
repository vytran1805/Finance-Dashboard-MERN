import { useGetKpisQuery } from "@/state/api";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useMemo, useState } from "react";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import  { DataPoint } from "regression";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = {};

const Predictions = (props: Props) => {
  const { palette } = useTheme();
  // set prediction state to show the prediction line
  const [isPredictions, setIsPredictions] = useState(false);
  const { data: kpidata } = useGetKpisQuery();

  const revenueData = useMemo(() => {
    // if kpiData doesn't exist, return an empty array
    if (!kpidata) return [];
    const monthData = kpidata[0].monthlyData;
    // formattedData is an array of array
    const formattedData: Array<DataPoint> = monthData.map(
      ({ month, revenue, expenses }, index: number) => {
        return [index, revenue]; //return an array of index and revenue of the month
      }
    );
  }, [kpidata]);
  return (
    <DashboardBox width="100%" height="100%" p="1rem" overflow="hidden">
      <FlexBetween m="1rem 2.5rem" gap="0.5rem">
        <Box>
          <Typography variant="h3">Revenue and Predictions</Typography>
          <Typography variant="h6">
            Charted revenue and predicted revenue based on a simple linear
            regression model
          </Typography>
        </Box>
        <Button
          onClick={() => setIsPredictions(!isPredictions)}
          sx={{
            color: palette.grey[900],
            bgcolor: palette.grey[700],
            boxShadow: "0.1rem 0.1rem 0.1rem 0.1rem rgba(0,0,0,.4",
          }}
        >
          Show predicted Revenue for Next Year
        </Button>
      </FlexBetween>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          style={{ fontSize: "10px" }}
          width={500}
          height={400}
          data={revenueData}
          margin={{
            top: 20,
            right: 75,
            left: 20,
            bottom: 80,
          }}
        >
          <CartesianGrid
            strokeDasharray="4 4"
            vertical={false}
            stroke={palette.grey[800]}
          />
          <XAxis dataKey="Name" tickLine={false}>
            <Label value="Month" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis
            domain={[12000, 26000]}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `$${v}`}
            // style={{ fontSize: "10px" }}
          >
            <Label
              value="Revenue in USD"
              angle={-90}
              offset={-5}
              position="insideLeft"
            />
          </YAxis>

          <Tooltip />
          <Legend verticalAlign="top" />
          <Line
            type="monotone"
            dataKey="Revenue"
            stroke={palette.primary.light}
            strokeWidth={0} //clear the line
            dot={{ strokeWidth: 6 }}
          />
          <Line
            type="monotone"
            dataKey="Regression Line"
            stroke={palette.tertiary[500]}
            dot={false}
          />
          {/* If isPredictions === true, display Predicted Revenue line */}
          {isPredictions && (
            <Line
              type="monotone"
              dataKey="Predicted Revenue"
              stroke={palette.secondary[500]}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </DashboardBox>
  );
};

export default Predictions;
