import * as React from 'react'
import ResponsiveGrid from '@features/layout/grid-v2'
import MediaControlCard from '@features/surfaces/card'

interface IHome {}

const Home: React.FunctionComponent<IHome> = () => {
  return (
    <>
      <ResponsiveGrid title={'Category'}>
        <MediaControlCard />
      </ResponsiveGrid>
      <ResponsiveGrid title={'Flash Sale'}>
        <MediaControlCard />
      </ResponsiveGrid>
      <ResponsiveGrid title={'Product'}>
        <MediaControlCard />
      </ResponsiveGrid>
    </>
  )
}

export default Home
