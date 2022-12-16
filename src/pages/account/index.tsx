import * as React from 'react'
import AccountProfileDetails from './account-profile-details'
import AccountProfile from './account-profile'
import { Typography } from '@mui/material'
import { useAppDispatch } from '@/features/hooks/reduxHooks'
import { getOneUserAsyncThunk } from '@features/redux/slices/user'
import { getOneCartAsyncThunk } from '@/features/redux/slices/cart'

interface IAccountProps {}

const Account: React.FunctionComponent<IAccountProps> = () => {
  const dispatch = useAppDispatch()
  React.useMemo(async () => {
    await dispatch(getOneUserAsyncThunk())
    await dispatch(getOneCartAsyncThunk())
  }, [])

  return (
    <>
      <Typography variant="h2" style={{ margin: '-25px 0px 25px 6px' }}>
        Account
      </Typography>
      <div style={{ display: 'flex' }}>
        <AccountProfile />
        <AccountProfileDetails />
      </div>
    </>
  )
}

export default Account
