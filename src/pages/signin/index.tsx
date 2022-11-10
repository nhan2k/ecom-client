import * as React from 'react'

import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Unstable_Grid2'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

interface ISignin {}
const Signin: React.FunctionComponent<ISignin> = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Item>logo</Item>
        </Grid>
        <Grid xs={12}>
          <Item>Sign In</Item>
        </Grid>
        <Grid xs={12}>
          <Item>input</Item>
        </Grid>
        <Grid xs={12}>
          <Item>input</Item>
        </Grid>
        <Grid xs={12}>
          <Item>description</Item>
        </Grid>
        <Grid xs={12}>
          <Item>button</Item>
        </Grid>
        <Grid xs={12}>
          <Item>description</Item>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Signin
