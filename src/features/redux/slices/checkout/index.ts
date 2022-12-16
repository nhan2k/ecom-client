import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICheckoutState, IDataCheckout } from './type'
import { RootState } from '@features/redux/store'
import { checkout } from './checkout.service'

const prefixType = 'Checkout'
const checkoutAsyncThunk = createAsyncThunk(`${prefixType}/checkout`, async (data: IDataCheckout, thunkAPI) => {
  try {
    const dataResponse = await checkout(data)
    return dataResponse
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

const initialState: ICheckoutState = {
  dataCheckout: {},
  checkoutLoading: 'idle',
  checkoutError: '',
  orderId: '',
}

const checkoutSlice = createSlice({
  name: 'checkoutSlice',
  initialState,
  reducers: {
    resetCheckoutState: () => {
      return initialState
    },
    setIsPaid: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        dataCheckout: {
          ...state.dataCheckout,
          isPaid: action.payload,
        },
      }
    },
    setPaymentId: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        dataCheckout: {
          ...state.dataCheckout,
          paymentId: action.payload,
        },
      }
    },
    setDataItem: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        dataCheckout: {
          ...state.dataCheckout,
          subTotal: action.payload.subTotal,
          itemDiscount: action.payload.itemDiscount,
          tax: action.payload.tax,
          shipping: action.payload.shipping,
          total: action.payload.total,
          promo: action.payload.promo,
          discount: action.payload.discount,
          grandTotal: action.payload.grandTotal,
        },
      }
    },
    resetCheckoutLoading: (state) => {
      return {
        ...state,
        checkoutLoading: 'idle',
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(checkoutAsyncThunk.pending, (state: ICheckoutState) => {
      return {
        ...state,
        checkoutLoading: 'pending',
      }
    })
    builder.addCase(checkoutAsyncThunk.fulfilled, (state: ICheckoutState, action: PayloadAction<IDataCheckout[] | any>) => {
      if (!action.payload.isSuccess) {
        return {
          ...state,
          checkoutLoading: 'failed',
          checkoutError: action.payload.data.message,
        }
      }

      return {
        ...state,
        checkoutLoading: 'succeeded',
        orderId: action.payload.data.orderId,
      }
    })
    builder.addCase(checkoutAsyncThunk.rejected, (state: ICheckoutState, action: PayloadAction<any>) => {
      return {
        ...state,
        checkoutLoading: 'failed',
        checkoutError: action.payload.data.message,
      }
    })
  },
})

export { checkoutAsyncThunk }
export const getCheckoutState = (state: RootState) => state.checkoutSlice
export const { resetCheckoutState, setDataItem, setIsPaid, setPaymentId, resetCheckoutLoading } = checkoutSlice.actions
export default checkoutSlice
