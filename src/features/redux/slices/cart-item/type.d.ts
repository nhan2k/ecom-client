interface IDataCartItem {
  id?: number
  productId?: number
  cartId?: number
  sku?: string
  price?: number
  discount?: number
  quantity?: number
  active?: number
  createdAt?: Date
  content?: string
  updatedAt?: Date
  deletedAt?: Date
}

type TLoading = 'idle' | 'pending' | 'succeeded' | 'failed'

interface ICartItemState {
  dataGetAll: IDataCartItem[]
  getItemsForShop?: []
  dataGetForReviews: IDataCartItem[]
  getAllLoading: TLoading
  getForReviewsLoading: TLoading
  postLoading: TLoading
  putLoading: TLoading
  deleteLoading: TLoading
  getAllError: string
  getForReviewsError: string
  postError: string
  putError: string
  deleteError: string
}

export { IDataCartItem, IDataSignin, IAuth, TLoading, ICartItemState }
