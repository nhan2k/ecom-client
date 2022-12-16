import * as React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { useAppDispatch, useAppSelector } from '@/features/hooks/reduxHooks'
import { Button, CardContent, FormControlLabel, Radio } from '@mui/material'
import { getCartState } from '@/features/redux/slices/cart'
import {} from '@/features/redux/slices/checkout'

export default function AddressForm() {
  const dispatch = useAppDispatch()
  const { getOneLoading, dataGetOne } = useAppSelector(getCartState)

  React.useMemo(() => {}, [])

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <CardContent>
        {getOneLoading === 'succeeded' ? (
          <Grid container spacing={1}>
            <Grid item md={12} xs={12}>
              <Typography variant="h4" component="h4">
                <FormControlLabel value="address" control={<Radio />} label={<span style={{ fontSize: '2rem' }}>Default address</span>} checked disabled />
                {`${dataGetOne.address}`}
              </Typography>
            </Grid>
          </Grid>
        ) : (
          <React.Fragment />
        )}
        <Button>Choose another address</Button>
      </CardContent>
    </React.Fragment>
  )
}
