import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '@features/hooks/reduxHooks'
import { getAuthState, setEmail, setPassword, signinAsyncThunk } from '@features/redux/slices/auth'
import { Alert, CircularProgress } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

const theme = createTheme()

interface IFormInput {
  email: string
  password: string
}

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>()
  const { auth } = useAppSelector(getAuthState)
  const navigate = useNavigate()
  React.useEffect(() => {
    if (auth) {
      return navigate('/')
    }
  }, [auth])

  const dispatch = useAppDispatch()
  const { email, password, loading } = useAppSelector(getAuthState)
  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmail(e.target.value))
  }
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPassword(e.target.value))
  }

  const onSubmit: SubmitHandler<IFormInput> = async () => {
    await dispatch(signinAsyncThunk({ email, password }))
    if (loading === 'succeeded') {
      return navigate('/')
    }
  }

  return (
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  {...register('email', {
                    required: true,
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: 'Entered value does not match email format',
                    },
                  })}
                  margin="normal"
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
                  {...register('password')}
                  id="password"
                  label="Password"
                  name="password"
                  margin="normal"
                  fullWidth
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={onPasswordChange}
                />
                {errors.password && (
                  <Typography variant="h6" color={'red'}>
                    {errors.password.message || 'Enter your password'}
                  </Typography>
                )}
              </Grid>
            </Grid>

            {loading === 'failed' ? <Alert severity="error">Signin fail, please check again!</Alert> : loading === 'succeeded' ? <Alert severity="success">Signin success</Alert> : <></>}
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />

            {loading === 'loading' ? (
              <Box sx={{ display: 'flex' }}>
                <CircularProgress />
              </Box>
            ) : (
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
            )}
            <Grid container>
              <Grid item xs>
                <Link to={'/reset'}>
                  <Typography variant={'body1'} color={'blue'}>
                    Forgot password?
                  </Typography>
                </Link>
              </Grid>
              <Grid item>
                <Link to={'/signup'}>
                  <Typography variant={'body1'} color={'blue'}>
                    Don't have an account? Sign Up
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
