import Home from '@pages/home'
import ProductDetail from '@pages/product-detail'
import NotFound from '@pages/not-found'
import Signin from '@pages/signin'
import Signup from '@pages/signup'
import { SignUpIn } from '@features/layout'
import { IRoutes } from './type'
import Cart from '@/pages/cart'
import Checkout from '@pages/checkout'
import Account from '@pages/account'

const publicRoutes: Array<IRoutes> = [
  { path: '/', component: Home, isPublic: true },
  { path: '/cart', component: Cart, isPublic: false },
  { path: '/product-detail', component: ProductDetail, isPublic: true },
  { path: '/signup', component: Signup, layout: SignUpIn, isPublic: true },
  { path: '/signin', component: Signin, layout: SignUpIn, isPublic: true },
  { path: '/checkout', component: Checkout, isPublic: false },
  { path: '/profile', component: Account, isPublic: false },
  { path: '/*', component: NotFound, isPublic: true },
]

const privateRoutes: Array<IRoutes> = []

export { publicRoutes, privateRoutes }
