import DashboardBox from "@/components/DashboardBox";
import { useGetKpisQuery } from "@/state/api";

type Props = {};

const TopThreeBoxes = (props: Props) => {
  // use api hook from api.ts
  const {data} = useGetKpisQuery();
  return (
    <>
      <DashboardBox gridArea="a"></DashboardBox>
      <DashboardBox gridArea="b"></DashboardBox>
      <DashboardBox gridArea="c"></DashboardBox>
    </>
  );
};

export default TopThreeBoxes;
