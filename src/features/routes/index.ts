import Home from '@pages/home'
import ProductDetail from '@pages/product-detail'
import NotFound from '@pages/not-found'
import Signin from '@pages/signin'
import Signup from '@pages/signup'
import { SignUpIn } from '@features/layout'
import { routes } from './type'

const publicRoutes: Array<routes> = [
  { path: '/', component: Home },
  { path: '/product-detail', component: ProductDetail },
  { path: '/signup', component: Signup, layout: SignUpIn },
  { path: '/signin', component: Signin, layout: SignUpIn },
  { path: '/*', component: NotFound },
]

const privateRoutes: Array<routes> = []

export { publicRoutes, privateRoutes }
