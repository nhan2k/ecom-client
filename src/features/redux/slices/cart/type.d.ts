import { IDataProduct } from '@features/redux/slices/product/type'

export interface CartItem {
  id?: number
  productId?: number
  cartId?: number
  sku?: string
  price?: number
  discount?: number
  quantity?: number
  active?: number
  createdAt?: Date
  content?: { img?: string }
  updatedAt?: Date
  deletedAt?: Date
  ProductModel: IDataProduct
}

export interface IDataCart {
  id?: string
  userId?: string
  sessionId?: string
  token?: string
  status?: string
  firstName?: string
  middleName?: string
  lastName?: string
  mobile?: string
  email?: string
  line1?: string
  line2?: string
  city?: string
  province?: string
  country?: string
  createdAt?: string
  content?: string
  updatedAt?: string
  deletedAt?: string
  CartItemModels?: CartItem[]
}

type TLoading = 'idle' | 'pending' | 'succeeded' | 'failed'

interface ICartState {
  dataGetAll: IDataCart[]
  personCart: IDataCart
  count: number
  countLoading: TLoading
  dataGetOne: IDataCart
  getAllLoading: TLoading
  getOneLoading: TLoading
  postLoading: TLoading
  putLoading: TLoading
  deleteLoading: TLoading
  personCartLoading: TLoading
  getAllError: string
  getOneError: string
  postError: string
  putError: string
  countError: string
  deleteError: string
  personCartError: string
  payment: string
}

export { IDataCart, IDataSignin, IAuth, TLoading, ICartState }
