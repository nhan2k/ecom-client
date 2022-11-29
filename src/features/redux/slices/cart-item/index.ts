import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICartItemState, IDataCartItem } from './type'
import { RootState } from '@features/redux/store'
import { getAllCartItem, getOneCartItem, createCartItem, putCartItem, deleteCartItem } from './cart-item.service'

const prefixType = 'cartItem'
const getAllCartItemAsyncThunk = createAsyncThunk(`${prefixType}/getAll`, async (_, thunkAPI) => {
  try {
    const dataResponse = await getAllCartItem()
    return dataResponse
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})
const getOneCartItemAsyncThunk = createAsyncThunk(`${prefixType}/getOne`, async (id: number, thunkAPI) => {
  try {
    const dataResponse = await getOneCartItem(id)
    return dataResponse
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error)
  }
})
const createCartItemAsyncThunk = createAsyncThunk(`${prefixType}/create`, async (productId: number, thunkAPI) => {
  try {
    const dataResponse = await createCartItem(productId)
    return dataResponse
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error)
  }
})
const putCartItemAsyncThunk = createAsyncThunk(`${prefixType}/put`, async ({ data, id }: { data: IDataCartItem; id: number }, thunkAPI) => {
  try {
    const dataResponse = await putCartItem(data, id)
    return dataResponse
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error)
  }
})
const deleteCartItemAsyncThunk = createAsyncThunk(`${prefixType}/delete`, async (id: number, thunkAPI) => {
  try {
    const dataResponse = await deleteCartItem(id)
    return dataResponse
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error)
  }
})

const initialState: ICartItemState = {
  dataGetAll: [],
  getItemsForShop: {},
  dataGetOne: {},
  getAllLoading: 'idle',
  getOneLoading: 'idle',
  postLoading: 'idle',
  putLoading: 'idle',
  deleteLoading: 'idle',
  getAllError: '',
  getOneError: '',
  postError: '',
  putError: '',
  deleteError: '',
}

const cartItemSlice = createSlice({
  name: 'cartItemSlice',
  initialState,
  reducers: {
    resetCartItemState: () => {
      return initialState
    },
    setSessionId: (state, action) => {
      return {
        ...state,
        dataInput: {
          sessionId: action.payload,
        },
      }
    },
    setToken: (state, action) => {
      return {
        ...state,
        dataInput: {
          token: action.payload,
        },
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllCartItemAsyncThunk.pending, (state: ICartItemState) => {
      return {
        ...state,
        getAllLoading: 'pending',
      }
    })
    builder.addCase(getAllCartItemAsyncThunk.fulfilled, (state: ICartItemState, action: PayloadAction<IDataCartItem[] | any>) => {
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
        getItemsForShop: action.payload.data,
      }
    })
    builder.addCase(getAllCartItemAsyncThunk.rejected, (state: ICartItemState, action: PayloadAction<any>) => {
      return {
        ...state,
        getAllLoading: 'failed',
        getAllError: action.payload.data.message,
      }
    })

    builder.addCase(getOneCartItemAsyncThunk.pending, (state: ICartItemState) => {
      return {
        ...state,
        getOneLoading: 'pending',
      }
    })
    builder.addCase(getOneCartItemAsyncThunk.fulfilled, (state: ICartItemState, action: PayloadAction<IDataCartItem | any>) => {
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
    builder.addCase(getOneCartItemAsyncThunk.rejected, (state: ICartItemState, action: PayloadAction<any>) => {
      return {
        ...state,
        getOneLoading: 'failed',
        getOneError: action.payload.data.message,
      }
    })

    builder.addCase(createCartItemAsyncThunk.pending, (state: ICartItemState) => {
      return {
        ...state,
        postLoading: 'pending',
      }
    })
    builder.addCase(createCartItemAsyncThunk.fulfilled, (state: ICartItemState, action: PayloadAction<IDataCartItem | any>) => {
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
    builder.addCase(createCartItemAsyncThunk.rejected, (state: ICartItemState, action: PayloadAction<any>) => {
      return {
        ...state,
        postLoading: 'failed',
        postError: action.payload.data.message,
      }
    })

    builder.addCase(putCartItemAsyncThunk.pending, (state: ICartItemState) => {
      return {
        ...state,
        putLoading: 'pending',
      }
    })
    builder.addCase(putCartItemAsyncThunk.fulfilled, (state: ICartItemState, action: PayloadAction<IDataCartItem | any>) => {
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
        dataGetAll: state.dataGetAll.map((element: IDataCartItem) => (element.id === id ? action.payload.data : element)),
      }
    })
    builder.addCase(putCartItemAsyncThunk.rejected, (state: ICartItemState, action: PayloadAction<any>) => {
      return {
        ...state,
        putLoading: 'failed',
        putError: action.payload.data.message,
      }
    })

    builder.addCase(deleteCartItemAsyncThunk.pending, (state: ICartItemState) => {
      return {
        ...state,
        deleteLoading: 'pending',
      }
    })
    builder.addCase(deleteCartItemAsyncThunk.fulfilled, (state: ICartItemState, action: PayloadAction<IDataCartItem | any>) => {
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
        dataGetAll: state.dataGetAll.filter((element: IDataCartItem) => {
          return Number(element.id) !== Number(id)
        }),
      }
    })
    builder.addCase(deleteCartItemAsyncThunk.rejected, (state: ICartItemState, action: PayloadAction<any>) => {
      return {
        ...state,
        deleteLoading: 'failed',
        deleteError: action.payload.data.message,
      }
    })
  },
})

export { getAllCartItemAsyncThunk, getOneCartItemAsyncThunk, createCartItemAsyncThunk, putCartItemAsyncThunk, deleteCartItemAsyncThunk }
export const getCartItemState = (state: RootState) => state.cartItemSlice
export const { resetCartItemState, setSessionId, setToken } = cartItemSlice.actions
export default cartItemSlice
