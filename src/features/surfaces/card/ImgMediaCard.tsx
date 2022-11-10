import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid' // Grid version 1
import { DashboardIcon } from '@assets/icons'

interface ImgMediaCardInterface {
  image: string
}

const ImgMediaCard: React.FunctionComponent<ImgMediaCardInterface> = ({ image }) => {
  return (
    <Card sx={{ minWidth: 345, padding: 30 }}>
      <CardMedia component="img" alt="green iguana" height={'100%'} image={image} />
      <Grid container direction="column" justifyContent="center" alignItems="center">
        <CardContent>
          <Typography gutterBottom variant="h1" component="div" align="center">
            404
          </Typography>
          <Typography variant="h4" color="text.secondary">
            Looks like something went wrong.
          </Typography>
        </CardContent>
        <CardActions>
          <Link to={'/'}>
            <Button variant="contained" startIcon={<DashboardIcon />} size="large">
              Home
            </Button>
          </Link>
        </CardActions>
      </Grid>
    </Card>
  )
}

export default ImgMediaCard
