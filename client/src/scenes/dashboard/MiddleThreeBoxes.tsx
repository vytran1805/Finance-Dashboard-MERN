import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery } from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import { useMemo } from "react";
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
      (operationalVsNonOpData &&
        operationalVsNonOpData[0].monthlyData.map(
          ({ month, operationalExpenses, nonOperationalExpenses }) => {
            return {
              Name:
                month.substring(0, 3)[0].toUpperCase() + month.substring(1, 3),
              "Operational Expenses": operationalExpenses,
              "NonOperational Expenses": nonOperationalExpenses,
            };
          }
        )) || [{ name: "Pro" }]
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
          name: "Operational",
          value: operationalVsNonOpData[0].monthlyData.reduce(
            (acc, array) => acc + array.operationalExpenses,
            0
          ),
        },
        {
          // Calculate the total non-operational expenses for all months
          // in the monthlyData array using the reduce method
          name: "Non Operational",
          value: operationalVsNonOpData[0].monthlyData.reduce(
            (acc, array) => acc + array.nonOperationalExpenses,
            0
          ),
        },
      ]
    );
  }, [operationalVsNonOpData]);

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
    const x = cx + 0.75 * radius * Math.cos(-midAngle * RADIAN);
    const y = cy + 4 * radius * Math.sin(-midAngle * RADIAN);
    return (
      <>
        {/* Display name of the field */}
        <text
          x={x}
          y={y}
          fill={pieColorPalette[index]}
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
          fontSize="11px"
        >
          {expensesRatio?.[index].name}
        </text>

        {/* Display percentage of the expenses */}
        <text
          x={x}
          y={y - 3 * radius * Math.sin(-midAngle * RADIAN)}
          fill={palette.grey[800]}
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
          fontSize="10px"
          fontWeight="bold"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      </>
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
        <BoxHeader title="Expenses Ratio" sideText="+4%" />
        <FlexBetween width="100%" height="73%" gap="50px" paddingRight="10px">
          <ResponsiveContainer width={250}>
            <PieChart margin={{ top: 55, left: 10 }}>
              <Pie
                stroke="none"
                endAngle={180}
                data={expensesRatio}
                label={renderCustomizedLabel}
                outerRadius={45}
                dataKey="value"
              >
                {expensesRatio?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColorPalette[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <Box flexBasis="80%" textAlign="center">
            <Typography variant="h5">Total Expenses</Typography>
            <Typography m="0.3rem 0" variant="h3" color={palette.primary[400]}>
              {operationalVsNonOpData?.[0].totalExpenses}
            </Typography>
            <Typography variant="h6">
              The pie chart visualizes expense distribution across categories
            </Typography>
          </Box>
        </FlexBetween>
      </DashboardBox>
      <DashboardBox gridArea="f"></DashboardBox>
    </>
  );
};

export default MiddleThreeBoxes;
