import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

interface ISignUpInProps {
  children: JSX.Element
}

const SignUpIn: React.FunctionComponent<ISignUpInProps> = ({ children }) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ height: '80vh', marginTop: '10rem', border: '1px solid #000' }}>{children}</Box>
      </Container>
    </React.Fragment>
  )
}

export default SignUpIn
