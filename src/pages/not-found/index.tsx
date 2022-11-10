import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import ImgMediaCard from '@features/surfaces/card/ImgMediaCard'
import Grid from '@mui/material/Grid' // Grid version 1
import pageNotFoundImage from './assets/404.png'

interface INotFound {}

const NotFound: React.FunctionComponent<INotFound> = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Box sx={{ height: '85vh' }}>
          <Grid container direction="column" justifyContent="center" alignItems="center" sx={{ height: '100%' }}>
            <ImgMediaCard image={pageNotFoundImage} />
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  )
}

export default NotFound
