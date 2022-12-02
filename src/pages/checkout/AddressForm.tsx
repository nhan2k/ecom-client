import * as React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { useAppSelector } from '@/features/hooks/reduxHooks'
import { getUserState } from '@/features/redux/slices/user'

export default function AddressForm() {
  const { dataGetOne, getOneLoading } = useAppSelector(getUserState)

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      {getOneLoading === 'succeeded' ? (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField required id="firstName" name="firstName" label="First name" fullWidth autoComplete="given-name" variant="standard" value={dataGetOne.firstName || ''} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField required id="lastName" name="lastName" label="Last name" fullWidth autoComplete="family-name" variant="standard" value={dataGetOne.lastName || ''} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField required id="email" name="email" label="Email" fullWidth autoComplete="email" variant="standard" value={dataGetOne.email || ''} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField required id="mobile" name="mobile" label="Mobile" fullWidth autoComplete="shipping country" variant="standard" value={dataGetOne.mobile || ''} />
          </Grid>
          <Grid item xs={12}>
            <TextField required id="address" name="address" label="Address line " fullWidth autoComplete="shipping address-line" variant="standard" value={dataGetOne.profile || ''} />
          </Grid>
        </Grid>
      ) : (
        <></>
      )}
    </React.Fragment>
  )
}
