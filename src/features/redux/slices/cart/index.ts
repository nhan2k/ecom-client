import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartState, IDataCart } from './type';
import { RootState } from '@features/redux/store';
import { getAllCart, getOneCart, createCart, putCart, deleteCart } from './cart.service';

const prefixType = 'cart';
const getAllCartAsyncThunk = createAsyncThunk(`${prefixType}/getAll`, async (_, thunkAPI) => {
  try {
    const dataResponse = await getAllCart();
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
const getOneCartAsyncThunk = createAsyncThunk(`${prefixType}/getOne`, async (id: number, thunkAPI) => {
  try {
    const dataResponse = await getOneCart(id);
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
const createCartAsyncThunk = createAsyncThunk(`${prefixType}/create`, async (data: IDataCart, thunkAPI) => {
  try {
    const dataResponse = await createCart(data);
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
const putCartAsyncThunk = createAsyncThunk(`${prefixType}/put`, async ({ data, id }: { data: IDataCart; id: number }, thunkAPI) => {
  try {
    const dataResponse = await putCart(data, id);
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
const deleteCartAsyncThunk = createAsyncThunk(`${prefixType}/delete`, async (id: number, thunkAPI) => {
  try {
    const dataResponse = await deleteCart(id);
    console.log('🚀 ~ file: index.ts ~ line 43 ~ deleteCartAsyncThunk ~ dataResponse', dataResponse);
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

const initialState: ICartState = {
  dataInput: {
    sessionId: '',
    token: '',
  },
  dataGetAll: [],
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
};

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    resetCartState: () => {
      return initialState;
    },
    setSessionId: (state, action) => {
      return {
        ...state,
        dataInput: {
          ...state.dataInput,
          sessionId: action.payload,
        },
      };
    },
    setToken: (state, action) => {
      return {
        ...state,
        dataInput: {
          ...state.dataInput,
          token: action.payload,
        },
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllCartAsyncThunk.pending, (state: ICartState) => {
      return {
        ...state,
        getAllLoading: 'pending',
      };
    });
    builder.addCase(getAllCartAsyncThunk.fulfilled, (state: ICartState, action: PayloadAction<IDataCart[] | any>) => {
      if (!action.payload.isSuccess) {
        return {
          ...state,
          getAllLoading: 'failed',
          getAllError: action.payload.data.message,
        };
      }

      return {
        ...state,
        getAllLoading: 'succeeded',
        dataGetAll: action.payload.data,
      };
    });
    builder.addCase(getAllCartAsyncThunk.rejected, (state: ICartState, action: PayloadAction<any>) => {
      return {
        ...state,
        getAllLoading: 'failed',
        getAllError: action.payload.data.message,
      };
    });

    builder.addCase(getOneCartAsyncThunk.pending, (state: ICartState) => {
      return {
        ...state,
        getOneLoading: 'pending',
      };
    });
    builder.addCase(getOneCartAsyncThunk.fulfilled, (state: ICartState, action: PayloadAction<IDataCart | any>) => {
      if (!action.payload.isSuccess) {
        return {
          ...state,
          getOneLoading: 'failed',
          getOneError: action.payload.data.message,
        };
      }

      return {
        ...state,
        getOneLoading: 'succeeded',
        dataGetAll: action.payload.data,
      };
    });
    builder.addCase(getOneCartAsyncThunk.rejected, (state: ICartState, action: PayloadAction<any>) => {
      return {
        ...state,
        getOneLoading: 'failed',
        getOneError: action.payload.data.message,
      };
    });

    builder.addCase(createCartAsyncThunk.pending, (state: ICartState) => {
      return {
        ...state,
        postLoading: 'pending',
      };
    });
    builder.addCase(createCartAsyncThunk.fulfilled, (state: ICartState, action: PayloadAction<IDataCart | any>) => {
      if (!action.payload.isSuccess) {
        return {
          ...state,
          postLoading: 'failed',
          postError: action.payload.data.message,
        };
      }

      return {
        ...state,
        postLoading: 'succeeded',
        dataGetAll: [...state.dataGetAll, action.payload.data],
      };
    });
    builder.addCase(createCartAsyncThunk.rejected, (state: ICartState, action: PayloadAction<any>) => {
      return {
        ...state,
        postLoading: 'failed',
        postError: action.payload.data.message,
      };
    });

    builder.addCase(putCartAsyncThunk.pending, (state: ICartState) => {
      return {
        ...state,
        putLoading: 'pending',
      };
    });
    builder.addCase(putCartAsyncThunk.fulfilled, (state: ICartState, action: PayloadAction<IDataCart | any>) => {
      if (!action.payload.isSuccess) {
        return {
          ...state,
          putLoading: 'failed',
          putError: action.payload.data.message,
        };
      }
      let id = action.payload.data.id;

      return {
        ...state,
        putLoading: 'succeeded',
        dataGetAll: state.dataGetAll.map((element: IDataCart) => (element.id === id ? action.payload.data : element)),
      };
    });
    builder.addCase(putCartAsyncThunk.rejected, (state: ICartState, action: PayloadAction<any>) => {
      return {
        ...state,
        putLoading: 'failed',
        putError: action.payload.data.message,
      };
    });

    builder.addCase(deleteCartAsyncThunk.pending, (state: ICartState) => {
      return {
        ...state,
        deleteLoading: 'pending',
      };
    });
    builder.addCase(deleteCartAsyncThunk.fulfilled, (state: ICartState, action: PayloadAction<IDataCart | any>) => {
      if (!action.payload.isSuccess) {
        return {
          ...state,
          deleteLoading: 'failed',
          deleteError: action.payload.data.message,
        };
      }

      let id = action.payload.data.id;
      return {
        ...state,
        deleteLoading: 'succeeded',
        dataGetAll: state.dataGetAll.filter((element: IDataCart) => {
          return Number(element.id) !== Number(id);
        }),
      };
    });
    builder.addCase(deleteCartAsyncThunk.rejected, (state: ICartState, action: PayloadAction<any>) => {
      return {
        ...state,
        deleteLoading: 'failed',
        deleteError: action.payload.data.message,
      };
    });
  },
});

export { getAllCartAsyncThunk, getOneCartAsyncThunk, createCartAsyncThunk, putCartAsyncThunk, deleteCartAsyncThunk };
export const getCartState = (state: RootState) => state.cartSlice;
export const { resetCartState, setSessionId, setToken } = cartSlice.actions;
export default cartSlice;
