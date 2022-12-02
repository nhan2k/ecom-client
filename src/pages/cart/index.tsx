import * as React from 'react'
import classNames from 'classnames/bind'
import style from './Cart.module.scss'
import { Container, Typography } from '@mui/material'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import Items from './Items'
import { Button, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'

interface ICartProps {}

const cx = classNames.bind(style)

const Cart: React.FunctionComponent<ICartProps> = (props) => {
  const navigate = useNavigate()

  const handleCheckout = () => {
    navigate('/checkout')
  }

  return (
    <>
      <Container maxWidth="lg">
        <div className={cx('header')}>
          <div className={cx('icon')}>
            <LocalMallIcon color="primary" sx={{ fontSize: 50 }} />
          </div>
          <div className={cx('title')}>
            <Typography variant="h4" component={'p'}>
              Giỏ Hàng
            </Typography>
          </div>
        </div>
        <Items />
        <Stack spacing={2} direction="row" style={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" size="large" onClick={handleCheckout}>
            Checkout
          </Button>
        </Stack>
      </Container>
    </>
  )
}

export default Cart
