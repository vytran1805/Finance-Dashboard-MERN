import DashboardBox from "@/components/DashboardBox";
import { useGetKpisQuery } from "@/state/api";

type Props = {};

const TopThreeBoxes = (props: Props) => {
  // use api hook from api.ts to get data from the database
  const { data } = useGetKpisQuery(); //API only gets called ONCE HERE!
  console.log("data: ", data);
  return (
    <>
      <DashboardBox gridArea="a"></DashboardBox>
      <DashboardBox gridArea="b"></DashboardBox>
      <DashboardBox gridArea="c"></DashboardBox>
    </>
  );
};

export default TopThreeBoxes;
