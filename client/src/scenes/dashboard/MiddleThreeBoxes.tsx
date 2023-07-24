import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery, useGetProductsQuery } from "@/state/api";
import { useTheme } from "@mui/material";
import React, { useMemo } from "react";
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = {};

const MiddleThreeBoxes = (props: Props) => {
  // Get Kpi data: used for the first chart
  const { data: operationalVsNonOpData } = useGetKpisQuery();

  const { palette } = useTheme();
  const pieColorPalette = [palette.primary[400], palette.primary[300]];

  const operationalVsNonOpExpenses = useMemo(() => {
    return (
      operationalVsNonOpData &&
      operationalVsNonOpData[0].monthlyData.map(
        ({ month, operationalExpenses, nonOperationalExpenses }) => {
          return {
            Name:
              month.substring(0, 3)[0].toUpperCase() + month.substring(1, 3),
            "Operational Expenses": operationalExpenses,
            "NonOperational Expenses": nonOperationalExpenses,
          };
        }
      )
    );
  }, [operationalVsNonOpData]);

  /**
   * Data for the first pie chart (second Dashboard box)
   * Note: This will return an array of object
   * This can be combined with "operationalVsNonOpExpenses" variable
   * but I separate them for clarity and ease of understanding
   */
  const expensesRatio = useMemo(() => {
    return (
      // Check if operationalVsNonOpData is truthy (not null or undefined)
      // and if it is, calculate the expenses ratio
      operationalVsNonOpData && [
        {
          // Calculate the total operational expenses for all months
          // in the monthlyData array using the reduce method
          name: "Total Operational Expenses",
          value: operationalVsNonOpData[0].monthlyData.reduce(
            (acc, array) => acc + array.operationalExpenses,
            0
          ),
        },
        {
          // Calculate the total non-operational expenses for all months
          // in the monthlyData array using the reduce method
          name: "Total Non Operational Expenses",
          value: operationalVsNonOpData[0].monthlyData.reduce(
            (acc, array) => acc + array.nonOperationalExpenses,
            0
          ),
        },
      ]
    );
  }, [operationalVsNonOpData]);

  // const profitMargin = useMemo(()=>{
  //   return(
  //     operationalVsNonOpData&&[
  //       {
  //         name:
  //       }
  //     ]
  //   )
  // })

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="#1f2026"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize="11px"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <>
      {/* Operational vs Non operational line chart */}
      <DashboardBox gridArea="d">
        <BoxHeader
          title="Operational and Non-Operational Expenses"
          sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            style={{ fontSize: "10px" }}
            width={500}
            height={400}
            data={operationalVsNonOpExpenses}
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
              dataKey="NonOperational Expenses"
              stroke={palette.tertiary[500]}
              activeDot={{ r: 8 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="Operational Expenses"
              stroke={palette.primary.light}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>

      {/* Pie charts start here */}
      <DashboardBox gridArea="e">
        <FlexBetween width="100%" height="100%">
          <ResponsiveContainer>
            <PieChart
              width={110}
              height={100}

              // margin={{ top: 0, right: -10, left: 10, bottom: 55 }}
            >
              <Pie
                stroke="white"
                data={expensesRatio}
                // cx="50%"
                // cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={40}
                fill="#8884d8"
                dataKey="value"
              >
                {expensesRatio?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColorPalette[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <ResponsiveContainer>
            <PieChart
              width={110}
              height={100}
              // margin={{ top: 0, right: -10, left: 10, bottom: 55 }}
            >
              <Pie
                stroke="none"
                data={expensesRatio}
                // cx="50%"
                // cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={38}
                fill="#8884d8"
                dataKey="value"
              >
                {expensesRatio?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColorPalette[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </FlexBetween>
      </DashboardBox>
      <DashboardBox gridArea="f"></DashboardBox>
    </>
  );
};

export default MiddleThreeBoxes;
