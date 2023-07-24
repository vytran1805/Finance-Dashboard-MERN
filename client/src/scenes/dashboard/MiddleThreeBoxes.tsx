import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import { useGetKpisQuery, useGetProductsQuery } from "@/state/api";
import { useTheme } from "@mui/material";
import React, { useMemo } from "react";
import {
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

const MiddleThreeBoxes = (props: Props) => {
  // Get Kpi data: used for the first chart
  const { data: operationalVsNonOpData } = useGetKpisQuery();

  const { palette } = useTheme();

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

  // Data for the first pie chart
  const expensesRatio = useMemo(() => {
    return (
      // Check if operationalVsNonOpData is truthy (not null or undefined)
      // and if it is, calculate the expenses ratio
      operationalVsNonOpData && {
        // Calculate the total operational expenses for all months
        // in the monthlyData array using the reduce method
        totalOperationalExpenses: operationalVsNonOpData[0].monthlyData.reduce(
          (acc, array) => acc + array.operationalExpenses,
          0
        ),
        // Calculate the total non-operational expenses for all months
        // in the monthlyData array using the reduce method
        totalNonOperationalExpenses:
          operationalVsNonOpData[0].monthlyData.reduce(
            (acc, array) => acc + array.nonOperationalExpenses,
            0
          ),
      }
    );
  }, [operationalVsNonOpData]);

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
      <DashboardBox gridArea="e"></DashboardBox>
      <DashboardBox gridArea="f"></DashboardBox>
    </>
  );
};

export default MiddleThreeBoxes;
