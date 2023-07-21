import DashboardBox from "@/components/DashboardBox";
import { useGetKpisQuery } from "@/state/api";
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
  // use api hook from api.ts to get data from the database
  const { data } = useGetKpisQuery(); //API only gets called ONCE HERE!
  console.log("data: ", data);

  /**
   * useMemo() hook makes sure the function only runs as needed
   * the value returned by the memoized function will be stored in 'revenueExpenses' variable.
   * @FirstParam call back function
   * @SecondParam a dependency array [data], whenever 'data' changes, the function will be recomputed
   */
  const revenueExpenses = useMemo(()=>{
    return(
      // make sure the data exists, then grab the obj (we have only one in this data), get 'monthlyData'
      data && data[0].monthlyData.map(({month, revenue, expenses})=>{
        return {
          // Grab the first 3 letter of the month. E.g., Jan, Feb, Mar,..
          name: month.substring(0,3),
          revenue: revenue,
          expenses: expenses,
        }
      })
    )
  },[data])
  return (
    <>
      <DashboardBox gridArea="a">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="uv"
              stroke="#8884d8"
              fill="#8884d8"
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
