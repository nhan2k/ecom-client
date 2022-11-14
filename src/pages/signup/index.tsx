import * as React from 'react'
import { SignUpIn } from '@/features/layout'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useAppSelector, useAppDispatch } from '@features/hooks/reduxHooks'
import { setFirstName, setLastName, setEmail, setPassword, signupAsyncThunk } from '@features/redux/slices/auth'
import { CircularProgress } from '@mui/material'

const theme = createTheme()
interface IFormInput {
  firstName: string
  lastName: string
  email: string
  password: string
}
interface ISignup {}
const Signup: React.FunctionComponent<ISignup> = () => {
  const { email, firstName, lastName, password, loadingSignup, errorSignup } = useAppSelector((state) => state.authSlice)
  const dispatch = useAppDispatch()
  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmail(e.target.value))
  }
  const onFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFirstName(e.target.value))
  }
  const onLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setLastName(e.target.value))
  }
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPassword(e.target.value))
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>()
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await dispatch(signupAsyncThunk(data))
  }
  return (
    <SignUpIn>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...register('firstName', { required: true, maxLength: 20 })}
                    autoComplete="given-name"
                    name="firstName"
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={firstName}
                    onChange={onFirstNameChange}
                  />
                  {errors.firstName && (
                    <Typography variant="h6" color={'red'}>
                      {errors.firstName.message || 'Enter your first name'}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...register('lastName', { required: true, maxLength: 20 })}
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    value={lastName}
                    onChange={onLastNameChange}
                  />
                  {errors.lastName && (
                    <Typography variant="h6" color={'red'}>
                      {errors.lastName.message || 'Enter your first name'}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    {...register('email', {
                      required: true,
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: 'Entered value does not match email format',
                      },
                    })}
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={onEmailChange}
                  />
                  {errors.email && (
                    <Typography variant="h6" color={'red'}>
                      {errors.email.message || 'Enter your email'}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    {...register('password', {
                      required: true,
                      minLength: {
                        value: 5,
                        message: 'min length is 5',
                      },
                    })}
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={onPasswordChange}
                  />
                  {errors.password && (
                    <Typography variant="h6" color={'red'}>
                      {errors.password.message || 'Enter your password'}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel control={<Checkbox value="allowExtraEmails" color="primary" />} label="I want to receive inspiration, marketing promotions and updates via email." />
                </Grid>
              </Grid>

              {loadingSignup === 'failed' ? (
                <Typography variant={'body1'} color={'red'}>
                  {errorSignup}
                </Typography>
              ) : (
                <React.Fragment />
              )}
              {loadingSignup === 'pending' ? (
                <Box sx={{ display: 'flex' }}>
                  <CircularProgress />
                </Box>
              ) : (
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Sign Up
                </Button>
              )}
              {loadingSignup === 'succeeded' ? (
                <Link to={'/signin'}>
                  <Button variant="contained" color="success" fullWidth>
                    Signup success Back to Signin
                  </Button>
                </Link>
              ) : (
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link to={'/signin'}>
                      <Typography variant={'body1'} color={'blue'}>
                        Already have an account? Sign in
                      </Typography>
                    </Link>
                  </Grid>
                </Grid>
              )}
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </SignUpIn>
  )
}

export default Signup
