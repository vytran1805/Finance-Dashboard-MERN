import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
} from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
// @ts-ignore
import React, { useMemo } from "react";
import { Cell, Pie, PieChart } from "recharts";

const LastFourBoxes = () => {
  const { palette } = useTheme();
  const pieColorPalette = [palette.primary[200], palette.primary[400]];
  // Get kpis data
  const { data: kpidata } = useGetKpisQuery();
  // Get products data
  const { data: productData } = useGetProductsQuery();
  // Get transactions data
  const { data: transactionData } = useGetTransactionsQuery();

  /**
   * Prepare product columns for List of Product table
   */
  const productColumns = [
    { field: "_id", headerName: "id", flex: 1 },
    {
      field: "expense",
      headerName: "Expense",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
  ];

  const transactionColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "buyer",
      headerName: "Buyer",
      flex: 0.5,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "productIds",
      headerName: "Count",
      flex: 0.15,
      renderCell: (params: GridCellParams) =>
        (params.value as Array<String>).length,
    },
  ];

  const expensesByCategory = useMemo(() => {
    if (kpidata) {
      const totalExpenses = kpidata[0].totalExpenses;
      return Object.entries(kpidata[0].expensesByCategory).map(
        //get both the key and value from obj 'kpidata[0].expensesByCategory'
        ([key, value]) => {
          return [
            {
              name: key,
              value: value,
            },
            {
              name: `${key} of Total`,
              value: totalExpenses - value,
            },
          ];
        }
      );
    }
  }, [kpidata]);
  console.log(expensesByCategory);

  return (
    <>
      <DashboardBox gridArea="g">
        <BoxHeader
          title="List of Products"
          sideText={`${productData?.length} products`}
        />
        <Box
          mt="0.5rem"
          p="0 0.7rem"
          height="75%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
              fontSize: "10px",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": { visibility: "hidden" },
          }}
        >
          <DataGrid
            rows={productData || []}
            columns={productColumns}
            hideFooter={true}
            rowHeight={30}
            columnHeaderHeight={25}
          />
        </Box>
      </DashboardBox>
      <DashboardBox gridArea="h">
        <BoxHeader
          title="Recent Orders"
          sideText={`${transactionData?.length} orders`}
        />
        <Box
          mt="0.5rem"
          p="0 0.7rem"
          height="75%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
              fontSize: "10px",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": { visibility: "hidden" },
          }}
        >
          <DataGrid
            rows={transactionData || []}
            columns={transactionColumns}
            hideFooter={true}
            rowHeight={30}
            columnHeaderHeight={25}
          />
        </Box>
      </DashboardBox>
      <DashboardBox gridArea="i">
        <BoxHeader title="Expense Breakdown By Category" sideText="+4%" />
        <FlexBetween mt="-0.1rem" gap="0.5rem" p="0 1rem" textAlign="center">
          {expensesByCategory?.map((data, i) => (
            <Box key={`${data[0].name}-${i}`}>
              <PieChart width={110} height={100}>
                <Pie
                  stroke="none"
                  data={data}
                  innerRadius={13}
                  outerRadius={31}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColorPalette[index]} />
                  ))}
                </Pie>
              </PieChart>
              {/* name of each chart */}
              <Typography mt="-0.9rem" variant="h5">
                {data[0].name}
              </Typography>
            </Box>
          ))}
        </FlexBetween>
      </DashboardBox>
      <DashboardBox gridArea="j">
        <BoxHeader
          title="Overall Summary and Explanation Data"
          sideText="+15%"
        />
        <Box
          height="15px"
          margin="1rem 1rem 0.4rem 1rem"
          bgcolor={palette.primary[600]}
          borderRadius="1rem"
        >
          <Box
            height="15px"
            bgcolor={palette.primary[300]}
            borderRadius="1rem"
            width="40%"
          ></Box>
        </Box>
        <Typography
          margin="0 1rem"
          textAlign="justify"
          variant="h6"
          color={palette.grey[500]}
        >
          In 2022, XYZ Restaurant thrived with a 15% revenue increase, totaling
          $1.2 million. Cost management strategies maintained a healthy gross
          profit margin of 70% as operating expenses reduced by 10%. The
          restaurant achieved positive net profit and EBITDA, indicating a
          successful financial year.
        </Typography>
      </DashboardBox>
    </>
  );
};

export default LastFourBoxes;
