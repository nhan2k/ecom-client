import * as React from 'react'
import { Box, Button, Card, CardContent, CardHeader, Divider, FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import { useAppSelector } from '@/features/hooks/reduxHooks'
import { getUserState } from '@/features/redux/slices/user'
import { getCartState } from '@/features/redux/slices/cart'

interface IAccountProfileDetails {}
const AccountProfileDetails: React.FC<IAccountProfileDetails> = () => {
  const { dataGetOne, getOneLoading } = useAppSelector(getUserState)
  const cartState = useAppSelector(getCartState)

  const handleChange = (event: React.BaseSyntheticEvent) => {}

  return (
    <form autoComplete="off" noValidate style={{ flexGrow: '1' }}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        {getOneLoading === 'succeeded' ? (
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  helperText="Please specify the first name"
                  label="First name"
                  name="firstName"
                  onChange={handleChange}
                  required
                  value={dataGetOne.firstName || ''}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField fullWidth label="Last name" name="lastName" onChange={handleChange} required value={dataGetOne.lastName || ''} variant="outlined" />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField fullWidth label="Email Address" name="email" onChange={handleChange} required value={dataGetOne.email || ''} variant="outlined" />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField fullWidth label="Phone Number" name="phone" onChange={handleChange} type="number" value={dataGetOne.mobile || ''} variant="outlined" />
              </Grid>
            </Grid>
          </CardContent>
        ) : (
          <React.Fragment />
        )}
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2,
          }}
        >
          <Button color="primary" variant="contained">
            Save details
          </Button>
        </Box>
        <Divider />
        <CardHeader subheader="The information can be edited" title="Address to received" />
        <CardContent>
          {cartState.getOneLoading === 'succeeded' ? (
            <Grid container spacing={3}>
              <Grid item md={12} xs={12}>
                <Typography variant="h4" component="h4">
                  <FormControlLabel value="address" control={<Radio />} label={<span style={{ fontSize: '2rem' }}>Default address</span>} checked disabled />
                  {`${cartState.dataGetOne.address}`}
                </Typography>
              </Grid>
            </Grid>
          ) : (
            <React.Fragment />
          )}
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2,
          }}
        >
          <Button color="primary" variant="contained">
            Edit Address
          </Button>
        </Box>
      </Card>
    </form>
  )
}

export default AccountProfileDetails
