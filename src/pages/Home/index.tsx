import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Box, CardActionArea, CircularProgress } from '@mui/material'
import { getAllProductAsyncThunk, getProductState } from '@features/redux/slices/product'
import { getAllCategoryAsyncThunk } from '@/features/redux/slices/category'
import { useAppDispatch, useAppSelector } from '@/features/hooks/reduxHooks'
import { experimentalStyled as styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Unstable_Grid2'
import notFoundImg from '@assets/images/not-found-img.jpg'
import { Link } from 'react-router-dom'
import ListCategory from './ListCategory'

interface IHome {}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow: 'none',
}))

const Home: React.FunctionComponent<IHome> = () => {
  const dispatch = useAppDispatch()

  const getAllHome = () => {
    dispatch(getAllCategoryAsyncThunk())
    dispatch(getAllProductAsyncThunk())
  }
  const { getAllLoading, dataGetAll, getAllError } = useAppSelector(getProductState)

  React.useEffect(() => {
    getAllHome()
  }, [])
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid xs={2}>
          <Item>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography gutterBottom variant="h3" component="h3" align="left">
                  Categories
                </Typography>
              </Grid>
              <ListCategory />
            </Grid>
          </Item>
        </Grid>
        <Grid xs={10}>
          <Item>
            <Box sx={{ width: '100%' }}>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {getAllLoading === 'pending' ? (
                  <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <React.Fragment />
                )}
                {getAllLoading === 'succeeded' ? (
                  dataGetAll.map((element: any, index: number) => {
                    return (
                      <Grid xs={3} sm={3} md={3} lg={3} xl={3} key={index}>
                        <Link to={`/product-detail?id=${element.id}`}>
                          <Item>
                            <Card sx={{ maxWidth: '100%', maxHeight: 345 }}>
                              <CardActionArea>
                                <CardMedia
                                  component="img"
                                  height="200px"
                                  width="100%"
                                  image={element.content ? `${process.env.REACT_APP_API_PUBLIC_IMAGE}/${element.content}` : `${notFoundImg}`}
                                  alt="green iguana"
                                />
                                <CardContent>
                                  <Typography gutterBottom variant="h5" component="div" style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                                    {element.title}
                                  </Typography>
                                  <Typography gutterBottom variant="h6" component="div">
                                    ${element.price}
                                  </Typography>
                                </CardContent>
                              </CardActionArea>
                            </Card>
                          </Item>
                        </Link>
                      </Grid>
                    )
                  })
                ) : (
                  <React.Fragment />
                )}
                {getAllLoading === 'failed' ? (
                  <Typography gutterBottom variant="h5" component="div">
                    {getAllError}
                  </Typography>
                ) : (
                  <React.Fragment />
                )}
              </Grid>
            </Box>
          </Item>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default Home
