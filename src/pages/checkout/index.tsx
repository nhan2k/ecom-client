import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import AddressForm from './AddressForm'
import PaymentForm from './PaymentForm'
import Review from './Review'
import { useAppDispatch, useAppSelector } from '@/features/hooks/reduxHooks'
import { getCartState, getOneCartAsyncThunk, resetCount } from '@/features/redux/slices/cart'
import { checkoutAsyncThunk, getCheckoutState } from '@/features/redux/slices/checkout'
import ModalCheckout from './ModalCheckout'
import { Link } from 'react-router-dom'

const steps = ['Shipping address', 'Payment details', 'Review your order']

const theme = createTheme()

export default function Checkout() {
  const dispatch = useAppDispatch()
  const { dataCheckout, orderId, checkoutError, checkoutLoading } = useAppSelector(getCheckoutState)
  const cartState = useAppSelector(getCartState)

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  React.useMemo(async () => {
    if (cartState.getOneLoading === 'idle') {
      await dispatch(getOneCartAsyncThunk())
    }
  }, [])

  const [activeStep, setActiveStep] = React.useState(0)

  const handleNext = async () => {
    setActiveStep(activeStep + 1)
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  const handlePlaceOrder = async () => {
    await dispatch(checkoutAsyncThunk({ ...dataCheckout }))
    await dispatch(resetCount())
    setActiveStep(activeStep + 1)
  }

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <AddressForm />
      case 1:
        return <PaymentForm />
      case 2:
        return <Review />
      default:
        throw new Error('Unknown step')
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              {checkoutLoading === 'failed' ? (
                <Typography variant="subtitle1">{checkoutError}</Typography>
              ) : (
                <Typography variant="subtitle1">
                  Your order number is <strong>{orderId}</strong>. We have emailed your order confirmation, and will send you an update when your order has shipped.
                </Typography>
              )}
              <Button variant="contained">
                <Link to="/">Back Home</Link>
              </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                {activeStep === steps.length - 1 ? (
                  <ModalCheckout handlePlaceOrder={handlePlaceOrder} open={open} handleOpen={handleOpen} handleClose={handleClose} />
                ) : (
                  <Button variant="contained" onClick={handleNext} sx={{ mt: 3, ml: 1 }}>
                    Next
                  </Button>
                )}
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  )
}
