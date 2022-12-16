interface IDataCheckout {
  isPaid?: boolean
  subTotal?: number
  itemDiscount?: number
  tax?: number
  shipping?: number
  total?: number
  promo?: string
  discount?: number
  grandTotal?: number
  paymentId?: number
}

type TLoading = 'idle' | 'pending' | 'succeeded' | 'failed'

interface ICheckoutState {
  dataCheckout: IDataCheckout
  checkoutLoading: TLoading
  checkoutError: string
  orderId: string
}

export { IDataCheckout, ICheckoutState }
