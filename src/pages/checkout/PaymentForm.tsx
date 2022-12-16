import * as React from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { Autocomplete } from '@mui/material'
import { useAppDispatch } from '@/features/hooks/reduxHooks'
import { setPayment } from '@/features/redux/slices/cart'
import { setPaymentId } from '@/features/redux/slices/checkout'

export default function PaymentForm() {
  const dispatch = useAppDispatch()

  const methods = [
    { label: 'Cash', value: 0 },
    { label: 'Credit cards', value: 1 },
  ]

  React.useMemo(() => {
    dispatch(setPaymentId(0))
  }, [])

  const handleOnchange = async (value: any) => {
    await dispatch(setPayment(value.label))
    await dispatch(setPaymentId(value.value))
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container>
        <Grid item xs={12} md={12} xl={12}>
          <Autocomplete
            fullWidth
            disablePortal
            id="combo-box-demo"
            options={methods}
            onChange={(e, value) => handleOnchange(value)}
            defaultValue={methods[0]}
            renderInput={(params) => <TextField {...params} />}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
