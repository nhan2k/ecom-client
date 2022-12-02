import * as React from 'react'
import AccountProfileDetails from './account-profile-details'
import AccountProfile from './account-profile'
import { Typography } from '@mui/material'
import { useAppDispatch } from '@/features/hooks/reduxHooks'
import { getOneUserAsyncThunk } from '@features/redux/slices/user'

interface IAccountProps {}

const Account: React.FunctionComponent<IAccountProps> = () => {
  const dispatch = useAppDispatch()
  React.useMemo(async () => {
    await dispatch(getOneUserAsyncThunk())
  }, [])

  return (
    <>
      <Typography variant="h2">Account</Typography>
      <div style={{ display: 'flex' }}>
        <AccountProfile />
        <AccountProfileDetails />
      </div>
    </>
  )
}

export default Account
