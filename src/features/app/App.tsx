import * as React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { publicRoutes } from '@features/routes'
import { DefaultLayout } from '@features/layout'
import NotFound from '@pages/not-found'
import ProtectedRoute from '@features/routes/AuthRoutes'

interface AppInterface {}

const App: React.FunctionComponent<AppInterface> = () => {
  return (
    <Router>
      <Routes>
        {publicRoutes.map(({ component, path, layout, roleRoutes, isPublic }, index: number) => {
          let Page = component
          let Layout = DefaultLayout

          if (layout) {
            Layout = layout
          } else if (layout === null) {
            Layout = React.Fragment
          }

          if (isPublic) {
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
          }

          let newRoleRoutes = roleRoutes || ['USER']
          return (
            <Route
              key={index}
              path={path}
              element={
                <Layout>
                  <ProtectedRoute roleRoutes={newRoleRoutes}>
                    <Page />
                  </ProtectedRoute>
                </Layout>
              }
            />
          )
        })}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
