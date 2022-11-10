import * as React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { publicRoutes } from '@features/routes'
import { DefaultLayout } from '@features/layout'

interface AppInterface {}

const App: React.FunctionComponent<AppInterface> = () => {
  return (
    <Router>
      <Routes>
        {publicRoutes.map(({ component, path, layout }, index: number) => {
          const Page = component

          let Layout = DefaultLayout

          if (layout) {
            Layout = layout
          } else if (layout === null) {
            Layout = React.Fragment
          }

          return (
            <Route
              key={index}
              path={path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          )
        })}
      </Routes>
    </Router>
  )
}

export default App
