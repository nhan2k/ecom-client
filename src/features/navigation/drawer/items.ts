import { NavItemsInterface } from './type'
import { MoveToInbox as InboxIcon } from '@mui/icons-material'
import { DashboardIcon } from '@assets/icons'
import {
  PeopleAlt as PeopleAltIcon,
  PeopleOutline as PeopleOutlineIcon,
  Category as CategoryIcon,
  DonutSmall as DonutSmallIcon,
  ShoppingCartCheckout as ShoppingCartCheckoutIcon,
  StarHalf as StarHalfIcon,
} from '@mui/icons-material'

const navMainItems: Array<NavItemsInterface> = [
  { Icon: DashboardIcon, label: 'dashboard', divider: true, link: '/' },
  { Icon: PeopleAltIcon, label: 'vendors', divider: true, link: '/vendors' },
  { Icon: PeopleOutlineIcon, label: 'users', link: '/users' },
  { Icon: CategoryIcon, label: 'categories', divider: true, link: '/categories' },
  { Icon: DonutSmallIcon, label: 'products', link: '/products' },
  { Icon: ShoppingCartCheckoutIcon, label: 'orders', link: '/orders' },
  { Icon: StarHalfIcon, label: 'reviews', link: '/reviews' },
]
const menuId: string = 'primary-search-account-menu'
const mobileMenuId: string = 'primary-search-account-menu-mobile'
const drawerWidth: number = 240
const mails: number = 4
const notifications: number = 17

export { navMainItems, menuId, mobileMenuId, drawerWidth, mails, notifications }
