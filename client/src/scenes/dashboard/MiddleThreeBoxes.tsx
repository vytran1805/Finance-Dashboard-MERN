import DashboardBox from '@/components/DashboardBox'
import React from 'react'

type Props = {}

const MiddleThreeBoxes = (props: Props) => {
  return (
    <>
      <DashboardBox gridArea="d"></DashboardBox>
      <DashboardBox gridArea="e"></DashboardBox>
      <DashboardBox gridArea="f"></DashboardBox>
    </>
  )
}

export default MiddleThreeBoxes