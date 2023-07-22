import DashboardBox from "@/components/DashboardBox";
import { useGetKpisQuery } from "@/state/api";
import { useTheme } from "@mui/material";
import { useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = {};

const TopThreeBoxes = (props: Props) => {
  // use palette from useThem() @mui/material
  const { palette } = useTheme();
  // use api hook from api.ts to get data from the database
  const { data } = useGetKpisQuery(); //API only gets called ONCE HERE!
  console.log("data: ", data);

  /**
   * useMemo() hook makes sure the function only runs as needed
   * the value returned by the memoized function will be stored in 'revenueExpenses' variable.
   * @FirstParam call back function
   * @SecondParam a dependency array [data], whenever 'data' changes, the function will be recomputed
   */
  const revenueExpenses = useMemo(() => {
    return (
      // make sure the data exists, then grab the obj (we have only one in this data), get 'monthlyData'
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          // Grab the first 3 letter of the month. E.g., Jan, Feb, Mar,..
          name: month.substring(0, 3)[0].toUpperCase() + month.substring(1, 3), //capital the first letter of the name
          revenue: revenue,
          expenses: expenses,
        };
      })
    );
  }, [data]);
  return (
    <>
      <DashboardBox gridArea="a">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={revenueExpenses}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            {/* Set up the Gradient color for the chart: https://recharts.org/en-US/api/AreaChart */}
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[600]}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[600]}
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[700]}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[700]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              tickLine={false}
              axisLine={{ strokeWidth: "0" }}
              style={{ fontSize: "10px" }}
              domain={[8000, 23000]} //set a range of YAxis
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="expenses"
              dot={true}
              stroke={palette.primary.main} //line
              fillOpacity={1}
              fill="url(#colorRevenue)" //this will navigate to linearGradient above
            />
            <Area
              type="monotone"
              dataKey="revenue"
              dot={true}
              stroke={palette.primary.light} //line
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="b"></DashboardBox>
      <DashboardBox gridArea="c"></DashboardBox>
    </>
  );
};

export default TopThreeBoxes;
