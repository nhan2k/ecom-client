import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrderState, IDataOrder } from './type';
import { RootState } from '@features/redux/store';
import { getAllOrder, getOneOrder, createOrder, putOrder, deleteOrder, countOrder } from './order.service';

const prefixType = 'Order';
const getAllOrderAsyncThunk = createAsyncThunk(`${prefixType}/getAll`, async (_, thunkAPI) => {
  try {
    const dataResponse = await getAllOrder();
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
const countOrderAsyncThunk = createAsyncThunk(`${prefixType}/count`, async (_, thunkAPI) => {
  try {
    const dataResponse = await countOrder();
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
const getOneOrderAsyncThunk = createAsyncThunk(`${prefixType}/getOne`, async (id: number, thunkAPI) => {
  try {
    const dataResponse = await getOneOrder(id);
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
const createOrderAsyncThunk = createAsyncThunk(`${prefixType}/create`, async (data: IDataOrder, thunkAPI) => {
  try {
    const dataResponse = await createOrder(data);
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
const putOrderAsyncThunk = createAsyncThunk(`${prefixType}/put`, async ({ data, id }: { data: IDataOrder; id: number }, thunkAPI) => {
  try {
    const dataResponse = await putOrder(data, id);
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
const deleteOrderAsyncThunk = createAsyncThunk(`${prefixType}/delete`, async (id: number, thunkAPI) => {
  try {
    const dataResponse = await deleteOrder(id);
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

const initialState: IOrderState = {
  dataInput: {
    sessionId: 1,
    token: '',
  },
  dataGetAll: [],
  count: 0,
  dataGetOne: {},
  getAllLoading: 'idle',
  countLoading: 'idle',
  getOneLoading: 'idle',
  postLoading: 'idle',
  putLoading: 'idle',
  deleteLoading: 'idle',
  getAllError: '',
  countError: '',
  getOneError: '',
  postError: '',
  putError: '',
  deleteError: '',
};

const OrderSlice = createSlice({
  name: 'OrderSlice',
  initialState,
  reducers: {
    resetOrderState: () => {
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
    builder.addCase(getAllOrderAsyncThunk.pending, (state: IOrderState) => {
      return {
        ...state,
        getAllLoading: 'pending',
      };
    });
    builder.addCase(getAllOrderAsyncThunk.fulfilled, (state: IOrderState, action: PayloadAction<IDataOrder[] | any>) => {
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
    builder.addCase(getAllOrderAsyncThunk.rejected, (state: IOrderState, action: PayloadAction<any>) => {
      return {
        ...state,
        getAllLoading: 'failed',
        getAllError: action.payload.data.message,
      };
    });

    builder.addCase(countOrderAsyncThunk.pending, (state: IOrderState) => {
      return {
        ...state,
        countLoading: 'pending',
      };
    });
    builder.addCase(countOrderAsyncThunk.fulfilled, (state: IOrderState, action: PayloadAction<IDataOrder | any>) => {
      if (!action.payload.isSuccess) {
        return {
          ...state,
          countLoading: 'failed',
          countError: action.payload.data.message,
        };
      }

      return {
        ...state,
        countLoading: 'succeeded',
        count: action.payload.data,
      };
    });
    builder.addCase(countOrderAsyncThunk.rejected, (state: IOrderState, action: PayloadAction<any>) => {
      return {
        ...state,
        countLoading: 'failed',
        countError: action.payload.data.message,
      };
    });

    builder.addCase(getOneOrderAsyncThunk.pending, (state: IOrderState) => {
      return {
        ...state,
        getOneLoading: 'pending',
      };
    });
    builder.addCase(getOneOrderAsyncThunk.fulfilled, (state: IOrderState, action: PayloadAction<IDataOrder | any>) => {
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
    builder.addCase(getOneOrderAsyncThunk.rejected, (state: IOrderState, action: PayloadAction<any>) => {
      return {
        ...state,
        getOneLoading: 'failed',
        getOneError: action.payload.data.message,
      };
    });

    builder.addCase(createOrderAsyncThunk.pending, (state: IOrderState) => {
      return {
        ...state,
        postLoading: 'pending',
      };
    });
    builder.addCase(createOrderAsyncThunk.fulfilled, (state: IOrderState, action: PayloadAction<IDataOrder | any>) => {
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
    builder.addCase(createOrderAsyncThunk.rejected, (state: IOrderState, action: PayloadAction<any>) => {
      return {
        ...state,
        postLoading: 'failed',
        postError: action.payload.data.message,
      };
    });

    builder.addCase(putOrderAsyncThunk.pending, (state: IOrderState) => {
      return {
        ...state,
        putLoading: 'pending',
      };
    });
    builder.addCase(putOrderAsyncThunk.fulfilled, (state: IOrderState, action: PayloadAction<IDataOrder | any>) => {
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
        dataGetAll: state.dataGetAll.map((element: IDataOrder) => (element.id === id ? action.payload.data : element)),
      };
    });
    builder.addCase(putOrderAsyncThunk.rejected, (state: IOrderState, action: PayloadAction<any>) => {
      return {
        ...state,
        putLoading: 'failed',
        putError: action.payload.data.message,
      };
    });

    builder.addCase(deleteOrderAsyncThunk.pending, (state: IOrderState) => {
      return {
        ...state,
        deleteLoading: 'pending',
      };
    });
    builder.addCase(deleteOrderAsyncThunk.fulfilled, (state: IOrderState, action: PayloadAction<IDataOrder | any>) => {
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
        dataGetAll: state.dataGetAll.filter((element: IDataOrder) => {
          return Number(element.id) !== Number(id);
        }),
      };
    });
    builder.addCase(deleteOrderAsyncThunk.rejected, (state: IOrderState, action: PayloadAction<any>) => {
      return {
        ...state,
        deleteLoading: 'failed',
        deleteError: action.payload.data.message,
      };
    });
  },
});

export { getAllOrderAsyncThunk, getOneOrderAsyncThunk, createOrderAsyncThunk, putOrderAsyncThunk, deleteOrderAsyncThunk, countOrderAsyncThunk };
export const getOrderState = (state: RootState) => state.OrderSlice;
export const { resetOrderState, setSessionId, setToken } = OrderSlice.actions;
export default OrderSlice;
