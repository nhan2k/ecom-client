import * as React from 'react'
import { defaultLayout } from './type'
import Header from './Header'
import Footer from './Footer'
import style from './Layout.module.scss'
import classNames from 'classnames/bind'
import { Container } from '@mui/material'

const cx = classNames.bind(style)

const DefaultLayout: React.FunctionComponent<defaultLayout> = ({ children }) => {
  return (
    <div className={cx('body-layout')}>
      <Header />
      <Container maxWidth="xl">{children}</Container>
      <Footer />
    </div>
  )
}

export default DefaultLayout
