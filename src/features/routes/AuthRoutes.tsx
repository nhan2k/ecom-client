import * as React from 'react'
import { useAppSelector } from '../hooks/reduxHooks'
import { getAuthState } from '@features/redux/slices/auth'
import { Navigate } from 'react-router-dom'

type TRole = 'VENDOR' | 'ADMIN'

interface IProtectedRouteProps {
  children: JSX.Element
  roleRoutes: TRole[]
}

const ProtectedRoute: React.FunctionComponent<IProtectedRouteProps> = ({ children, roleRoutes }) => {
  const { auth, role } = useAppSelector(getAuthState)

  if (!auth) {
    return <Navigate to="/signin" />
  }
  if (!roleRoutes.includes(role)) {
    return <Navigate to="/404" />
  }

  return children
}

export default ProtectedRoute
