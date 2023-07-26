import { useGetKpisQuery } from "@/state/api";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useMemo, useState } from "react";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import regression, { DataPoint } from "regression";
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

const Predictions = () => {
  const { palette } = useTheme();
  // set prediction state to show the prediction line
  const [isPredictions, setIsPredictions] = useState(false);
  const { data: kpidata } = useGetKpisQuery();

  /**
   * Prepare data for the chart, implement regression-js
   * @see https://tom-alexander.github.io/regression-js/
   */
  const revenueData = useMemo(() => {
    // if kpiData doesn't exist, return an empty array
    if (!kpidata) return [];
    const monthData = kpidata[0].monthlyData;
    // formattedData is an array of array
    const formattedData: Array<DataPoint> = monthData.map(
      ({ revenue }, index: number) => {
        return [index, revenue]; //return an array of index and revenue of the month
      }
    );
    const regressionLine = regression.linear(formattedData); //return an array of arrays of month and revenue
    return monthData.map(({ month, revenue }, i: number) => {
      return {
        Name: month,
        "Actual Revenue": revenue, //creating the line
        "Regression Line": regressionLine.points[i][1], //points is an array of array (return value of regressionLine) => grab an array at index i then grab the second value which is revenue
        "Predicted Revenue": regressionLine.predict(i + 12)[1], //predict the regression line in the next 12 months (next year)
      };
    });
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
            "&:hover": { bgcolor: palette.grey[600] },
            "&:active": { bgcolor: palette.grey[200] },
            color: palette.grey[900],
            bgcolor: palette.grey[500],
            boxShadow: "0.1rem 0.1rem 0.1rem 0.1rem rgba(0,0,0,0.4)",
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
            bottom: 100,
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
            dataKey="Actual Revenue"
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
              strokeDasharray="5 5"
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
