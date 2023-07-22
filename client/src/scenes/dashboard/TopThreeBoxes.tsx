import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import { useGetKpisQuery } from "@/state/api";
import { useTheme } from "@mui/material";
import { useMemo } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
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
   * Prepare data for the charts/graphs using useMemo()
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
          Name: month.substring(0, 3)[0].toUpperCase() + month.substring(1, 3), //capital the first letter of the name
          Revenue: revenue,
          Expenses: expenses,
          Profit: (revenue - expenses).toFixed(2), //get 2 decimal numbers
        };
      })
    );
  }, [data]);

  // const profitRevenue = useMemo(() => {
  //   return (
  //     data &&
  //     data[0].monthlyData.map(({ month, revenue, expenses }) => {
  //       return {
  //         // Grab the first 3 letter of the month. E.g., Jan, Feb, Mar,..
  //         Name: month.substring(0, 3)[0].toUpperCase() + month.substring(1, 3), //capital the first letter of the name
  //         Profit: revenue - expenses,
  //         Revenue: revenue,
  //       };
  //     })
  //   );
  // }, [data]);
  return (
    <>
      {/* Revenue and Expenses area chart starts here */}
      <DashboardBox gridArea="a">
        <BoxHeader
          title="Revenue and Expenses"
          subtitle="Top line represents revenue, bottom line represents expenses"
          sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={revenueExpenses}
            margin={{
              top: 15,
              right: 25,
              left: -10,
              bottom: 60,
            }}
          >
            {/* Set up the Gradient color for the charts. This will be used for both AreaChart and BarChar: https://recharts.org/en-US/api/AreaChart */}
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[400]}
                  stopOpacity={0.9}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[400]}
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[400]}
                  stopOpacity={0.9}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="colorBarRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="10%"
                  stopColor={palette.primary[400]}
                  stopOpacity={0.9}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[400]}
                  stopOpacity={0.05}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="Name"
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
              dataKey="Expenses"
              dot={true}
              stroke={palette.primary.light} //line
              fillOpacity={1}
              fill="url(#colorRevenue)" //this will navigate to linearGradient above
            />
            <Area
              type="monotone"
              dataKey="Revenue"
              dot={true}
              stroke={palette.primary.light} //line
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>

      {/* Profit and Revenue line chart starts here */}
      <DashboardBox gridArea="b">
        <BoxHeader
          title="Profit and Revenue"
          subtitle="Top line represents revenue, bottom line represents profit"
          sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            style={{ fontSize: "10px" }}
            width={500}
            height={400}
            data={revenueExpenses}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 60,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis dataKey="Name" tickLine={false} />
            <YAxis yAxisId="left" tickLine={false} axisLine={false} />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
            />
            <Tooltip />
            <Legend height={20} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="Profit"
              stroke={palette.tertiary[500]}
              activeDot={{ r: 8 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="Revenue"
              stroke={palette.primary.light}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>

      {/* Monthly Revenue bar chart starts here */}
      <DashboardBox gridArea="c">
        <BoxHeader
          title="Monthly Revenue"
          subtitle="Each bar illustrates the monthly revenue data"
          sideText="+4%"
        />
        {/* Set up the Gradient color for the chart: https://recharts.org/en-US/api/AreaChart */}
        <defs>
          <linearGradient id="barRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={palette.primary[400]}
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor={palette.primary[400]}
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            style={{ fontSize: "10px" }}
            width={500}
            height={400}
            data={revenueExpenses}
            margin={{
              top: 20,
              right: 20,
              left: -10,
              bottom: 60,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis dataKey="Name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip />
            <Bar dataKey="Revenue" fill="url(#colorBarRevenue)" />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default TopThreeBoxes;
