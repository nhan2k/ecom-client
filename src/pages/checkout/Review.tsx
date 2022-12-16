import * as React from 'react'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Grid from '@mui/material/Grid'
import { useSelector } from 'react-redux'
import { getCartItemsForReviews, getCartItemState } from '@/features/redux/slices/cart-item'
import { useAppDispatch, useAppSelector } from '@/features/hooks/reduxHooks'
import _ from 'lodash'
import { getCartState } from '@/features/redux/slices/cart'
import { setDataItem, setIsPaid } from '@/features/redux/slices/checkout'

export default function Review() {
  const dispatch = useAppDispatch()
  const { dataGetForReviews, getForReviewsLoading, getForReviewsError } = useSelector(getCartItemState)
  const cartState = useAppSelector(getCartState)

  React.useEffect(() => {
    dispatch(getCartItemsForReviews())
    dispatch(setIsPaid(false))
    dispatch(
      setDataItem({
        subTotal: totalAmount,
        itemDiscount: 0,
        tax: 0,
        shipping: 0,
        total: totalAmount,
        promo: '',
        discount: 0,
        grandTotal: 0,
      })
    )
  }, [])

  const initialValue = 0
  const totalAmount =
    getForReviewsLoading === 'succeeded'
      ? _.reduce(
          dataGetForReviews,
          (sum: any, n: any) => {
            return sum + n.price * n.quantity
          },
          initialValue
        )
      : initialValue

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>

      {getForReviewsLoading === 'succeeded' ? (
        <List disablePadding>
          {dataGetForReviews.map((product: any, index: number) => (
            <ListItem key={index} sx={{ py: 1, px: 0 }}>
              <ListItemText primary={product.ProductModel.title} secondary={`Quantity: ${product.quantity}`} />
              <Typography variant="body2">{`$${product.price * product.quantity}`}</Typography>
            </ListItem>
          ))}
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Total" />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              ${totalAmount}
            </Typography>
          </ListItem>
        </List>
      ) : (
        <></>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          {/* <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography> */}
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {/* {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))} */}
            <Grid item xs={6}>
              <Typography gutterBottom>{cartState.payment}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
