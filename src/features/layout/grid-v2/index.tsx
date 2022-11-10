import * as React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Unstable_Grid2'
import Item from './Item'
import { Typography } from '@mui/material'

interface ResponsiveGridInterface {
  children: JSX.Element
  title: string
}

const ResponsiveGrid: React.FunctionComponent<ResponsiveGridInterface> = ({ children, title }) => {
  return (
    <Box sx={{ flexGrow: 1 }} style={{ marginTop: '5rem' }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography gutterBottom variant="h1" component="div" align="center">
            {title}
          </Typography>
        </Grid>
        {Array.from(Array(4)).map((_, index) => (
          <Grid xs={12} sm={12} md={6} lg={4} xl={3} key={index}>
            <Item>{children}</Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default ResponsiveGrid
