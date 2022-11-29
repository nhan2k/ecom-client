import * as React from 'react'
import style from './Items.module.scss'
import classname from 'classnames/bind'
import { Button, Checkbox, Stack, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '@/features/hooks/reduxHooks'
import { getAllCartItemAsyncThunk, getCartItemState } from '@/features/redux/slices/cart-item'
import ModalDelete from './ModalDelete'

const cx = classname.bind(style)

function Items() {
  const dispatch = useAppDispatch()
  const { getItemsForShop, getAllLoading, getAllError } = useAppSelector(getCartItemState)

  React.useMemo(async () => {
    await dispatch(getAllCartItemAsyncThunk())
  }, [])
  const keys = getAllLoading === 'succeeded' ? Object.keys(getItemsForShop) : []

  return (
    <React.Fragment>
      <div className={cx('header')}>
        <div>
          <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 28, margin: 'auto' } }} />
        </div>
        <div className={cx('product')}>
          <Typography component="div" variant="h4">
            Product
          </Typography>
        </div>
        <div className={cx('unit-price')}>
          <Typography component="div" variant="h4">
            Unit Price
          </Typography>
        </div>
        <div className={cx('qty')}>
          <Typography component="div" variant="h4">
            Quantity
          </Typography>
        </div>
        <div className={cx('price')}>
          <Typography component="div" variant="h4">
            Price
          </Typography>
        </div>
        <div className={cx('action')}>
          <Typography component="div" variant="h4">
            Action
          </Typography>
        </div>
      </div>

      {getAllLoading === 'succeeded' ? (
        <>
          {keys.map((element, index: number) => {
            return (
              <React.Fragment key={index}>
                <div className={cx('shop')}>
                  <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 28, margin: 'auto' } }} />
                  <Typography component="div" variant="h4">
                    {element}
                  </Typography>
                </div>
                {getItemsForShop[element].map((data: any, index: number) => {
                  return (
                    <div className={cx('header')} key={index}>
                      <div>
                        <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 28, margin: 'auto' } }} />
                      </div>
                      <div className={cx('product')}>
                        <Typography component="div" variant="h4">
                          {data.ProductModel.title}
                        </Typography>
                        <img src={`${process.env.REACT_APP_API_PUBLIC_IMAGE}/${data.ProductModel.content.img}`} alt="" style={{ maxWidth: '10rem', alignItems: 'center' }} />
                      </div>
                      <div className={cx('unit-price')}>
                        <Typography component="div" variant="h4">
                          {data.ProductModel.price}
                        </Typography>
                      </div>
                      <div className={cx('qty')}>
                        <Typography component="div" variant="h4">
                          {data.quantity}
                        </Typography>
                      </div>
                      <div className={cx('price')}>
                        <Typography component="div" variant="h4">
                          {data.ProductModel.price * data.quantity}
                        </Typography>
                      </div>
                      <div className={cx('action')}>
                        <ModalDelete id={data.id} />
                      </div>
                    </div>
                  )
                })}
              </React.Fragment>
            )
          })}
        </>
      ) : (
        <React.Fragment />
      )}
      <Stack spacing={2} direction="row" style={{ justifyContent: 'flex-end' }}>
        <Button variant="contained" size="large">
          Checkout
        </Button>
      </Stack>
    </React.Fragment>
  )
}

export default Items
