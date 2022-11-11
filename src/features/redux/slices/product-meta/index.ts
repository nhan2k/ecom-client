import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProductMetaState, IDataProductMeta } from './type';
import { RootState } from '@features/redux/store';
import { getAllProductMeta, getOneProductMeta, createProductMeta, putProductMeta, deleteProductMeta } from './product.meta.service';

const prefixType = 'ProductMeta';
const getAllProductMetaAsyncThunk = createAsyncThunk(`${prefixType}/getAll`, async (_, thunkAPI) => {
  try {
    const dataResponse = await getAllProductMeta();
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
const getOneProductMetaAsyncThunk = createAsyncThunk(`${prefixType}/getOne`, async (id: number, thunkAPI) => {
  try {
    const dataResponse = await getOneProductMeta(id);
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
const createProductMetaAsyncThunk = createAsyncThunk(`${prefixType}/create`, async (data: IDataProductMeta, thunkAPI) => {
  try {
    const dataResponse = await createProductMeta(data);
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
const putProductMetaAsyncThunk = createAsyncThunk(`${prefixType}/put`, async ({ data, id }: { data: IDataProductMeta; id: number }, thunkAPI) => {
  try {
    const dataResponse = await putProductMeta(data, id);
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
const deleteProductMetaAsyncThunk = createAsyncThunk(`${prefixType}/delete`, async (id: number, thunkAPI) => {
  try {
    const dataResponse = await deleteProductMeta(id);
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

const initialState: IProductMetaState = {
  dataInput: {
    productId: 1,
    key: '',
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

const ProductMetaSlice = createSlice({
  name: 'ProductMetaSlice',
  initialState,
  reducers: {
    resetProductMetaState: () => {
      return initialState;
    },
    setProductId: (state, action) => {
      return {
        ...state,
        dataInput: {
          ...state.dataInput,
          productId: action.payload,
        },
      };
    },
    setKey: (state, action) => {
      return {
        ...state,
        dataInput: {
          ...state.dataInput,
          key: action.payload,
        },
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllProductMetaAsyncThunk.pending, (state: IProductMetaState) => {
      return {
        ...state,
        getAllLoading: 'pending',
      };
    });
    builder.addCase(getAllProductMetaAsyncThunk.fulfilled, (state: IProductMetaState, action: PayloadAction<IDataProductMeta[] | any>) => {
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
    builder.addCase(getAllProductMetaAsyncThunk.rejected, (state: IProductMetaState, action: PayloadAction<any>) => {
      return {
        ...state,
        getAllLoading: 'failed',
        getAllError: action.payload.data.message,
      };
    });

    builder.addCase(getOneProductMetaAsyncThunk.pending, (state: IProductMetaState) => {
      return {
        ...state,
        getOneLoading: 'pending',
      };
    });
    builder.addCase(getOneProductMetaAsyncThunk.fulfilled, (state: IProductMetaState, action: PayloadAction<IDataProductMeta | any>) => {
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
    builder.addCase(getOneProductMetaAsyncThunk.rejected, (state: IProductMetaState, action: PayloadAction<any>) => {
      return {
        ...state,
        getOneLoading: 'failed',
        getOneError: action.payload.data.message,
      };
    });

    builder.addCase(createProductMetaAsyncThunk.pending, (state: IProductMetaState) => {
      return {
        ...state,
        postLoading: 'pending',
      };
    });
    builder.addCase(createProductMetaAsyncThunk.fulfilled, (state: IProductMetaState, action: PayloadAction<IDataProductMeta | any>) => {
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
    builder.addCase(createProductMetaAsyncThunk.rejected, (state: IProductMetaState, action: PayloadAction<any>) => {
      return {
        ...state,
        postLoading: 'failed',
        postError: action.payload.data.message,
      };
    });

    builder.addCase(putProductMetaAsyncThunk.pending, (state: IProductMetaState) => {
      return {
        ...state,
        putLoading: 'pending',
      };
    });
    builder.addCase(putProductMetaAsyncThunk.fulfilled, (state: IProductMetaState, action: PayloadAction<IDataProductMeta | any>) => {
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
        dataGetAll: state.dataGetAll.map((element: IDataProductMeta) => (element.id === id ? action.payload.data : element)),
      };
    });
    builder.addCase(putProductMetaAsyncThunk.rejected, (state: IProductMetaState, action: PayloadAction<any>) => {
      return {
        ...state,
        putLoading: 'failed',
        putError: action.payload.data.message,
      };
    });

    builder.addCase(deleteProductMetaAsyncThunk.pending, (state: IProductMetaState) => {
      return {
        ...state,
        deleteLoading: 'pending',
      };
    });
    builder.addCase(deleteProductMetaAsyncThunk.fulfilled, (state: IProductMetaState, action: PayloadAction<IDataProductMeta | any>) => {
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
        dataGetAll: state.dataGetAll.filter((element: IDataProductMeta) => {
          return Number(element.id) !== Number(id);
        }),
      };
    });
    builder.addCase(deleteProductMetaAsyncThunk.rejected, (state: IProductMetaState, action: PayloadAction<any>) => {
      return {
        ...state,
        deleteLoading: 'failed',
        deleteError: action.payload.data.message,
      };
    });
  },
});

export { getAllProductMetaAsyncThunk, getOneProductMetaAsyncThunk, createProductMetaAsyncThunk, putProductMetaAsyncThunk, deleteProductMetaAsyncThunk };
export const getProductMetaState = (state: RootState) => state.ProductMetaSlice;
export const { resetProductMetaState, setKey, setProductId } = ProductMetaSlice.actions;
export default ProductMetaSlice;
