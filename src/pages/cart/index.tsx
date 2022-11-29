import * as React from 'react'
import classNames from 'classnames/bind'
import style from './Cart.module.scss'
import { Container, Typography } from '@mui/material'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import Items from './Items'

interface ICartProps {}

const cx = classNames.bind(style)

const Cart: React.FunctionComponent<ICartProps> = (props) => {
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
      </Container>
    </>
  )
}

export default Cart
