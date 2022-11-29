import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICartState, IDataCart, CartItem } from './type'
import { RootState } from '@features/redux/store'
import { getAllCart, getOneCart, createCart, putCart, deleteCart, countCart, getPersonCart, updateCart, removeItemCart } from './cart.service'

const prefixType = 'cart'
const getAllCartAsyncThunk = createAsyncThunk(`${prefixType}/getAll`, async (_, thunkAPI) => {
  try {
    const dataResponse = await getAllCart()
    return dataResponse
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})
const getOneCartAsyncThunk = createAsyncThunk(`${prefixType}/getOne`, async (id: number, thunkAPI) => {
  try {
    const dataResponse = await getOneCart(id)
    return dataResponse
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error)
  }
})
const countCartAsyncThunk = createAsyncThunk(`${prefixType}/count`, async (_, thunkAPI) => {
  try {
    const dataResponse = await countCart()
    return dataResponse
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})
const createCartAsyncThunk = createAsyncThunk(`${prefixType}/create`, async (data: IDataCart, thunkAPI) => {
  try {
    const dataResponse = await createCart(data)
    return dataResponse
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error)
  }
})
const putCartAsyncThunk = createAsyncThunk(`${prefixType}/put`, async ({ data, id }: { data: IDataCart; id: number }, thunkAPI) => {
  try {
    const dataResponse = await putCart(data, id)
    return dataResponse
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error)
  }
})
const deleteCartAsyncThunk = createAsyncThunk(`${prefixType}/delete`, async (id: number, thunkAPI) => {
  try {
    const dataResponse = await deleteCart(id)
    return dataResponse
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error)
  }
})

const getPersonCartAsyncThunk = createAsyncThunk(`${prefixType}/personCart`, async (_, thunkAPI) => {
  try {
    const dataResponse = await getPersonCart()
    return dataResponse
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error)
  }
})
const updateCartAsyncThunk = createAsyncThunk(`${prefixType}/update/qty`, async ({ data, id }: { data: { quantity: number }; id: number }, thunkAPI) => {
  try {
    const dataResponse = await updateCart(data, id)
    return dataResponse
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error)
  }
})
const removeItemCartAsyncThunk = createAsyncThunk(`${prefixType}/remove/item`, async ({ data, id }: { data: CartItem; id: number }, thunkAPI) => {
  try {
    const dataResponse = await removeItemCart(id)
    return dataResponse
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error)
  }
})

const initialState: ICartState = {
  dataGetAll: [],
  count: 0,
  dataGetOne: {},
  personCart: {},
  getAllLoading: 'idle',
  getOneLoading: 'idle',
  countLoading: 'idle',
  postLoading: 'idle',
  putLoading: 'idle',
  deleteLoading: 'idle',
  personCartLoading: 'idle',
  getAllError: '',
  getOneError: '',
  postError: '',
  putError: '',
  countError: '',
  deleteError: '',
  personCartError: '',
}

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    resetCartState: () => {
      return initialState
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllCartAsyncThunk.pending, (state: ICartState) => {
      return {
        ...state,
        getAllLoading: 'pending',
      }
    })
    builder.addCase(getAllCartAsyncThunk.fulfilled, (state: ICartState, action: PayloadAction<IDataCart[] | any>) => {
      if (!action.payload.isSuccess) {
        return {
          ...state,
          getAllLoading: 'failed',
          getAllError: action.payload.data.message,
        }
      }

      return {
        ...state,
        getAllLoading: 'succeeded',
        dataGetAll: action.payload.data,
      }
    })
    builder.addCase(getAllCartAsyncThunk.rejected, (state: ICartState, action: PayloadAction<any>) => {
      return {
        ...state,
        getAllLoading: 'failed',
        getAllError: action.payload.data.message,
      }
    })

    builder.addCase(getOneCartAsyncThunk.pending, (state: ICartState) => {
      return {
        ...state,
        getOneLoading: 'pending',
      }
    })
    builder.addCase(getOneCartAsyncThunk.fulfilled, (state: ICartState, action: PayloadAction<IDataCart | any>) => {
      if (!action.payload.isSuccess) {
        return {
          ...state,
          getOneLoading: 'failed',
          getOneError: action.payload.data.message,
        }
      }

      return {
        ...state,
        getOneLoading: 'succeeded',
        dataGetAll: action.payload.data,
      }
    })
    builder.addCase(getOneCartAsyncThunk.rejected, (state: ICartState, action: PayloadAction<any>) => {
      return {
        ...state,
        getOneLoading: 'failed',
        getOneError: action.payload.data.message,
      }
    })

    builder.addCase(createCartAsyncThunk.pending, (state: ICartState) => {
      return {
        ...state,
        postLoading: 'pending',
      }
    })
    builder.addCase(createCartAsyncThunk.fulfilled, (state: ICartState, action: PayloadAction<IDataCart | any>) => {
      if (!action.payload.isSuccess) {
        return {
          ...state,
          postLoading: 'failed',
          postError: action.payload.data.message,
        }
      }

      return {
        ...state,
        postLoading: 'succeeded',
        dataGetAll: [...state.dataGetAll, action.payload.data],
      }
    })
    builder.addCase(createCartAsyncThunk.rejected, (state: ICartState, action: PayloadAction<any>) => {
      return {
        ...state,
        postLoading: 'failed',
        postError: action.payload.data.message,
      }
    })

    builder.addCase(putCartAsyncThunk.pending, (state: ICartState) => {
      return {
        ...state,
        putLoading: 'pending',
      }
    })
    builder.addCase(putCartAsyncThunk.fulfilled, (state: ICartState, action: PayloadAction<IDataCart | any>) => {
      if (!action.payload.isSuccess) {
        return {
          ...state,
          putLoading: 'failed',
          putError: action.payload.data.message,
        }
      }
      let id = action.payload.data.id

      return {
        ...state,
        putLoading: 'succeeded',
        dataGetAll: state.dataGetAll.map((element: IDataCart) => (element.id === id ? action.payload.data : element)),
      }
    })
    builder.addCase(putCartAsyncThunk.rejected, (state: ICartState, action: PayloadAction<any>) => {
      return {
        ...state,
        putLoading: 'failed',
        putError: action.payload.data.message,
      }
    })

    builder.addCase(deleteCartAsyncThunk.pending, (state: ICartState) => {
      return {
        ...state,
        deleteLoading: 'pending',
      }
    })
    builder.addCase(deleteCartAsyncThunk.fulfilled, (state: ICartState, action: PayloadAction<IDataCart | any>) => {
      if (!action.payload.isSuccess) {
        return {
          ...state,
          deleteLoading: 'failed',
          deleteError: action.payload.data.message,
        }
      }

      let id = action.payload.data.id
      return {
        ...state,
        deleteLoading: 'succeeded',
        dataGetAll: state.dataGetAll.filter((element: IDataCart) => {
          return Number(element.id) !== Number(id)
        }),
      }
    })
    builder.addCase(deleteCartAsyncThunk.rejected, (state: ICartState, action: PayloadAction<any>) => {
      return {
        ...state,
        deleteLoading: 'failed',
        deleteError: action.payload.data.message,
      }
    })

    builder.addCase(countCartAsyncThunk.fulfilled, (state: ICartState, action: PayloadAction<any>) => {
      return {
        ...state,
        countLoading: 'succeeded',
        count: action.payload.data,
      }
    })
    builder.addCase(countCartAsyncThunk.pending, (state: ICartState, action: PayloadAction<any>) => {
      return {
        ...state,
        countLoading: 'pending',
      }
    })
    builder.addCase(countCartAsyncThunk.rejected, (state: ICartState, action: PayloadAction<any>) => {
      return {
        ...state,
        countLoading: 'failed',
        countError: action.payload.data.message,
      }
    })

    builder.addCase(getPersonCartAsyncThunk.fulfilled, (state: ICartState, action: PayloadAction<any>) => {
      return {
        ...state,
        personCartLoading: 'succeeded',
        personCart: action.payload.data,
      }
    })
    builder.addCase(getPersonCartAsyncThunk.pending, (state: ICartState, action: PayloadAction<any>) => {
      return {
        ...state,
        personCartLoading: 'pending',
      }
    })
    builder.addCase(getPersonCartAsyncThunk.rejected, (state: ICartState, action: PayloadAction<any>) => {
      return {
        ...state,
        personCartLoading: 'failed',
        personCartError: action.payload.data.message,
      }
    })

    builder.addCase(updateCartAsyncThunk.fulfilled, (state: any, action: PayloadAction<any>) => {
      if (!action.payload.isSuccess) {
        return {
          ...state,
          personCartLoading: 'failed',
          putError: action.payload.data.message,
        }
      }
      let id = action.payload.data.id

      return {
        ...state,
        personCartLoading: 'succeeded',
        personCart: state.personCart.CartItemModels ? state.personCart.CartItemModels.map((element: any) => (element.id === id ? action.payload.data : element)) : {},
      }
    })
    builder.addCase(updateCartAsyncThunk.pending, (state: any, action: PayloadAction<any>) => {
      return {
        ...state,
        personCartLoading: 'pending',
      }
    })
    builder.addCase(updateCartAsyncThunk.rejected, (state: any, action: PayloadAction<any>) => {
      return {
        ...state,
        personCartLoading: 'failed',
        personCartError: action.payload.data.message,
      }
    })

    builder.addCase(removeItemCartAsyncThunk.fulfilled, (state: any, action: PayloadAction<any>) => {
      return {
        ...state,
        personCartLoading: 'succeeded',
        personCart: action.payload.data,
      }
    })
    builder.addCase(removeItemCartAsyncThunk.pending, (state: any, action: PayloadAction<any>) => {
      return {
        ...state,
        personCartLoading: 'pending',
      }
    })
    builder.addCase(removeItemCartAsyncThunk.rejected, (state: any, action: PayloadAction<any>) => {
      return {
        ...state,
        personCartLoading: 'failed',
        personCartError: action.payload.data.message,
      }
    })
  },
})

export {
  getAllCartAsyncThunk,
  getOneCartAsyncThunk,
  createCartAsyncThunk,
  putCartAsyncThunk,
  deleteCartAsyncThunk,
  countCartAsyncThunk,
  getPersonCartAsyncThunk,
  updateCartAsyncThunk,
  removeItemCartAsyncThunk,
  getPersonCart,
}
export const getCartState = (state: RootState) => state.cartSlice
export const { resetCartState } = cartSlice.actions
export default cartSlice
