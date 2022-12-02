import * as React from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { Autocomplete } from '@mui/material'

export default function PaymentForm() {
  const methods = [
    { label: 'Cash', value: 1 },
    { label: 'Credit cards', value: 2 },
  ]

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container>
        <Grid item xs={12} md={12} xl={12}>
          <Autocomplete fullWidth disablePortal id="combo-box-demo" options={methods} renderInput={(params) => <TextField {...params} label="Choose payment method" />} />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
