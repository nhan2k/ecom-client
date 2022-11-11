import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Box, CardActionArea, CircularProgress } from '@mui/material'
import { getAllProductAsyncThunk, getProductState } from '@features/redux/slices/product'
import { getAllCategoryAsyncThunk, getCategoryState } from '@/features/redux/slices/category'
import { useAppDispatch, useAppSelector } from '@/features/hooks/reduxHooks'
import { experimentalStyled as styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Unstable_Grid2'

interface IHome {}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

const Home: React.FunctionComponent<IHome> = () => {
  const dispatch = useAppDispatch()

  const getAllHome = () => {
    dispatch(getAllCategoryAsyncThunk())
    dispatch(getAllProductAsyncThunk())
  }
  const productState = useAppSelector(getProductState)
  const categoryState = useAppSelector(getCategoryState)
  console.log('🚀 ~ file: index.tsx ~ line 24 ~ categoryState', categoryState)
  React.useEffect(() => {
    let flag = true
    if (flag) {
      getAllHome()
    }
    return () => {
      flag = false
    }
  }, [])
  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography gutterBottom variant="h1" component="div" align="center">
              Category
            </Typography>
          </Grid>
          {categoryState.getAllLoading === 'succeeded' ? (
            categoryState.dataGetAll.map((element: any, index: number) => {
              return (
                <Grid xs={12} sm={12} md={6} lg={4} xl={3} key={index}>
                  <Item>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardActionArea>
                        <CardMedia component="img" height="140" image="/static/images/cards/contemplative-reptile.jpg" alt="green iguana" />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {element.title}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Item>
                </Grid>
              )
            })
          ) : (
            <React.Fragment />
          )}
        </Grid>
      </Box>
    </>
  )
}

export default Home
