import * as React from 'react'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Box, CircularProgress, Container } from '@mui/material'
import { getProductState, getOneProductAsyncThunk } from '@features/redux/slices/product'
import { useAppDispatch, useAppSelector } from '@/features/hooks/reduxHooks'
import { experimentalStyled as styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Unstable_Grid2'
import TextRating from './Rating'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'
import notFoundImg from '@assets/images/not-found-img.jpg'
import { useSearchParams } from 'react-router-dom'
import { setCountIncrement } from '@/features/redux/slices/cart'

interface IProductDetail {}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow: 'none',
}))

const ProductDetail: React.FunctionComponent<IProductDetail> = () => {
  const dispatch = useAppDispatch()
  let [searchParams, setSearchParams] = useSearchParams()

  let id = Number(searchParams.get('id')) || 0

  React.useMemo(() => {
    dispatch(getOneProductAsyncThunk(id))
  }, [])

  const { dataGetOne, getOneLoading, getOneError } = useAppSelector(getProductState)

  const handleAddToCart = () => {
    dispatch(setCountIncrement())
  }

  return (
    <>
      {id === 0 ? (
        <Typography gutterBottom variant="h1" component="div" align="center">
          Product not found!
        </Typography>
      ) : (
        <Box sx={{ width: '100%' }}>
          {getOneLoading === 'pending' ? (
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
          ) : (
            <React.Fragment />
          )}
          {getOneLoading === 'failed' ? (
            <Typography gutterBottom variant="h1" component="div" align="center">
              {getOneError}
            </Typography>
          ) : (
            <React.Fragment />
          )}
          <Container>
            {getOneLoading === 'succeeded' ? (
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid xs={5} sm={5} md={5} lg={5} xl={5}>
                  <Item>
                    <CardMedia
                      component="img"
                      width="100%"
                      height="400px"
                      image={dataGetOne.findProduct.content.img ? `${process.env.REACT_APP_API_PUBLIC_IMAGE}/${dataGetOne.findProduct.content.img}` : `${notFoundImg}`}
                      crossOrigin="anonymous"
                      alt="green iguana"
                    />
                  </Item>
                </Grid>
                <Grid xs={7} sm={7} md={7} lg={7} xl={7}>
                  <Item>
                    <FormControl>
                      <Typography gutterBottom variant="h1" component="div" align="left">
                        {dataGetOne.findProduct.title}
                      </Typography>

                      <Typography gutterBottom variant="h3" component="div" align="left">
                        <TextRating value={dataGetOne.rating} />
                      </Typography>

                      <Typography gutterBottom variant="h2" component="div" align="left">
                        {dataGetOne.findProduct.price} VND
                      </Typography>

                      <Box style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <FormLabel style={{ fontSize: '4rem' }}>Meta key :</FormLabel>
                        <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" style={{ marginLeft: '2rem' }}>
                          {dataGetOne.findProduct.ProductMetaModels.map((element: any, index: number) => {
                            return (
                              <FormControlLabel
                                value={element.key}
                                control={
                                  <Radio
                                    sx={{
                                      '& .MuiSvgIcon-root': {
                                        fontSize: '3rem',
                                      },
                                    }}
                                  />
                                }
                                label={
                                  <Typography gutterBottom variant="h4" component="div" align="left" alignItems="center">
                                    {element.key}
                                  </Typography>
                                }
                                key={index}
                                style={{ fontSize: '4rem' }}
                              />
                            )
                          })}
                        </RadioGroup>
                      </Box>

                      <Typography gutterBottom variant="h3" component="div" align="left">
                        Tag title :
                        {dataGetOne.findProduct.TagModels.map((element: any, index: number) => {
                          return <React.Fragment key={index}>{element.title}</React.Fragment>
                        })}
                      </Typography>
                      <Stack direction="row" spacing={2}>
                        <Button variant="outlined" startIcon={<ShoppingCartCheckoutIcon />} size="large" onClick={handleAddToCart}>
                          Add to cart
                        </Button>
                        <Button variant="contained" size="large">
                          Buy now
                        </Button>
                      </Stack>
                    </FormControl>
                  </Item>
                </Grid>
              </Grid>
            ) : (
              <React.Fragment />
            )}
          </Container>
        </Box>
      )}
    </>
  )
}

export default ProductDetail
