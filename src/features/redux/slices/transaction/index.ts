import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITransactionState, IDataTransaction } from './type';
import { RootState } from '@features/redux/store';
import { getAllTransaction, getOneTransaction, createTransaction, putTransaction, deleteTransaction, countTransaction } from './transaction.service';

const prefixType = 'Transaction';
const getAllTransactionAsyncThunk = createAsyncThunk(`${prefixType}/getAll`, async (_, thunkAPI) => {
  try {
    const dataResponse = await getAllTransaction();
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
const countTransactionAsyncThunk = createAsyncThunk(`${prefixType}/count`, async (_, thunkAPI) => {
  try {
    const dataResponse = await countTransaction();
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
const getOneTransactionAsyncThunk = createAsyncThunk(`${prefixType}/getOne`, async (id: number, thunkAPI) => {
  try {
    const dataResponse = await getOneTransaction(id);
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
const createTransactionAsyncThunk = createAsyncThunk(`${prefixType}/create`, async (data: IDataTransaction, thunkAPI) => {
  try {
    const dataResponse = await createTransaction(data);
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
const putTransactionAsyncThunk = createAsyncThunk(`${prefixType}/put`, async ({ data, id }: { data: IDataTransaction; id: number }, thunkAPI) => {
  try {
    const dataResponse = await putTransaction(data, id);
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
const deleteTransactionAsyncThunk = createAsyncThunk(`${prefixType}/delete`, async (id: number, thunkAPI) => {
  try {
    const dataResponse = await deleteTransaction(id);
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

const initialState: ITransactionState = {
  dataInput: {
    orderId: 1,
    code: '',
  },
  dataTransactionGetAll: [],
  count: 0,
  dataTransactionGetOne: {},
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
  postModal: false,
  putModal: false,
  deleteModal: false,
};

const TransactionSlice = createSlice({
  name: 'TransactionSlice',
  initialState,
  reducers: {
    resetTransactionState: () => {
      return initialState;
    },
    setOrderId: (state, action) => {
      return {
        ...state,
        dataInput: {
          ...state.dataInput,
          orderId: action.payload,
        },
      };
    },
    setCode: (state, action) => {
      return {
        ...state,
        dataInput: {
          ...state.dataInput,
          code: action.payload,
        },
      };
    },
    setPostModal: (state, action) => {
      return {
        ...state,
        postModal: action.payload,
      };
    },
    setPutModal: (state, action) => {
      return {
        ...state,
        putModal: action.payload,
      };
    },
    setDeleteModal: (state, action) => {
      return {
        ...state,
        deleteModal: action.payload,
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllTransactionAsyncThunk.pending, (state: ITransactionState) => {
      return {
        ...state,
        getAllLoading: 'pending',
      };
    });
    builder.addCase(getAllTransactionAsyncThunk.fulfilled, (state: ITransactionState, action: PayloadAction<IDataTransaction[] | any>) => {
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
        dataTransactionGetAll: action.payload.data,
      };
    });
    builder.addCase(getAllTransactionAsyncThunk.rejected, (state: ITransactionState, action: PayloadAction<any>) => {
      return {
        ...state,
        getAllLoading: 'failed',
        getAllError: action.payload.data.message,
      };
    });

    builder.addCase(countTransactionAsyncThunk.pending, (state: ITransactionState) => {
      return {
        ...state,
        countLoading: 'pending',
      };
    });
    builder.addCase(countTransactionAsyncThunk.fulfilled, (state: ITransactionState, action: PayloadAction<IDataTransaction | any>) => {
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
    builder.addCase(countTransactionAsyncThunk.rejected, (state: ITransactionState, action: PayloadAction<any>) => {
      return {
        ...state,
        countLoading: 'failed',
        countError: action.payload.data.message,
      };
    });

    builder.addCase(getOneTransactionAsyncThunk.pending, (state: ITransactionState) => {
      return {
        ...state,
        getOneLoading: 'pending',
      };
    });
    builder.addCase(getOneTransactionAsyncThunk.fulfilled, (state: ITransactionState, action: PayloadAction<IDataTransaction | any>) => {
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
        dataTransactionGetOne: action.payload.data,
      };
    });
    builder.addCase(getOneTransactionAsyncThunk.rejected, (state: ITransactionState, action: PayloadAction<any>) => {
      return {
        ...state,
        getOneLoading: 'failed',
        getOneError: action.payload.data.message,
      };
    });

    builder.addCase(createTransactionAsyncThunk.pending, (state: ITransactionState) => {
      return {
        ...state,
        postLoading: 'pending',
      };
    });
    builder.addCase(createTransactionAsyncThunk.fulfilled, (state: ITransactionState, action: PayloadAction<IDataTransaction | any>) => {
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
        dataTransactionGetAll: [...state.dataTransactionGetAll, action.payload.data],
      };
    });
    builder.addCase(createTransactionAsyncThunk.rejected, (state: ITransactionState, action: PayloadAction<any>) => {
      return {
        ...state,
        postLoading: 'failed',
        postError: action.payload.data.message,
      };
    });

    builder.addCase(putTransactionAsyncThunk.pending, (state: ITransactionState) => {
      return {
        ...state,
        putLoading: 'pending',
      };
    });
    builder.addCase(putTransactionAsyncThunk.fulfilled, (state: ITransactionState, action: PayloadAction<IDataTransaction | any>) => {
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
        dataTransactionGetAll: state.dataTransactionGetAll.map((element: IDataTransaction) => (element.id === id ? action.payload.data : element)),
      };
    });
    builder.addCase(putTransactionAsyncThunk.rejected, (state: ITransactionState, action: PayloadAction<any>) => {
      return {
        ...state,
        putLoading: 'failed',
        putError: action.payload.data.message,
      };
    });

    builder.addCase(deleteTransactionAsyncThunk.pending, (state: ITransactionState) => {
      return {
        ...state,
        deleteLoading: 'pending',
      };
    });
    builder.addCase(deleteTransactionAsyncThunk.fulfilled, (state: ITransactionState, action: PayloadAction<IDataTransaction | any>) => {
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
        dataTransactionGetAll: state.dataTransactionGetAll.filter((element: IDataTransaction) => {
          return Number(element.id) !== Number(id);
        }),
      };
    });
    builder.addCase(deleteTransactionAsyncThunk.rejected, (state: ITransactionState, action: PayloadAction<any>) => {
      return {
        ...state,
        deleteLoading: 'failed',
        deleteError: action.payload.data.message,
      };
    });
  },
});

export { getAllTransactionAsyncThunk, getOneTransactionAsyncThunk, createTransactionAsyncThunk, putTransactionAsyncThunk, deleteTransactionAsyncThunk, countTransactionAsyncThunk };
export const getTransactionState = (state: RootState) => state.TransactionSlice;
export const { resetTransactionState, setCode, setOrderId, setDeleteModal, setPostModal, setPutModal } = TransactionSlice.actions;
export default TransactionSlice;
