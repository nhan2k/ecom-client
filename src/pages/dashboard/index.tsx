import * as React from 'react'
import ResponsiveGrid from '@features/layout/grid-v2'
import MediaControlCard from '@features/surfaces/card'

interface IDashboard {}

const Dashboard: React.FunctionComponent<IDashboard> = () => {
  return (
    <ResponsiveGrid>
      <MediaControlCard />
    </ResponsiveGrid>
  )
}

export default Dashboard
