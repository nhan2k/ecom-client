import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProductState, IDataProduct } from './type';
import { RootState } from '@features/redux/store';
import { getAllProduct, getOneProduct, createProduct, putProduct, deleteProduct, countProduct } from './product.service';

const prefixType = 'product';
const getAllProductAsyncThunk = createAsyncThunk(`${prefixType}/getAll`, async (_, thunkAPI) => {
  try {
    const dataResponse = await getAllProduct();
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
const countProductAsyncThunk = createAsyncThunk(`${prefixType}/count`, async (_, thunkAPI) => {
  try {
    const dataResponse = await countProduct();
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
const getOneProductAsyncThunk = createAsyncThunk(`${prefixType}/getOne`, async (id: number, thunkAPI) => {
  try {
    const dataResponse = await getOneProduct(id);
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
const createProductAsyncThunk = createAsyncThunk(`${prefixType}/create`, async (data: IDataProduct, thunkAPI) => {
  try {
    const dataResponse = await createProduct(data);
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
const putProductAsyncThunk = createAsyncThunk(`${prefixType}/put`, async ({ data, id }: { data: IDataProduct; id: number }, thunkAPI) => {
  try {
    const dataResponse = await putProduct(data, id);
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
const deleteProductAsyncThunk = createAsyncThunk(`${prefixType}/delete`, async (id: number, thunkAPI) => {
  try {
    const dataResponse = await deleteProduct(id);
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

const initialState: IProductState = {
  dataInput: {
    title: '',
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

const productSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {
    resetProductState: () => {
      return initialState;
    },
    setTitle: (state, action) => {
      return {
        ...state,
        dataInput: {
          ...state.dataInput,
          title: action.payload,
        },
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllProductAsyncThunk.pending, (state: IProductState) => {
      return {
        ...state,
        getAllLoading: 'pending',
      };
    });
    builder.addCase(getAllProductAsyncThunk.fulfilled, (state: IProductState, action: PayloadAction<IDataProduct[] | any>) => {
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
    builder.addCase(getAllProductAsyncThunk.rejected, (state: IProductState, action: PayloadAction<any>) => {
      return {
        ...state,
        getAllLoading: 'failed',
        getAllError: action.payload.data.message,
      };
    });

    builder.addCase(countProductAsyncThunk.pending, (state: IProductState) => {
      return {
        ...state,
        countLoading: 'pending',
      };
    });
    builder.addCase(countProductAsyncThunk.fulfilled, (state: IProductState, action: PayloadAction<IDataProduct | any>) => {
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
    builder.addCase(countProductAsyncThunk.rejected, (state: IProductState, action: PayloadAction<any>) => {
      return {
        ...state,
        countLoading: 'failed',
        countError: action.payload.data.message,
      };
    });

    builder.addCase(getOneProductAsyncThunk.pending, (state: IProductState) => {
      return {
        ...state,
        getOneLoading: 'pending',
      };
    });
    builder.addCase(getOneProductAsyncThunk.fulfilled, (state: IProductState, action: PayloadAction<IDataProduct | any>) => {
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
    builder.addCase(getOneProductAsyncThunk.rejected, (state: IProductState, action: PayloadAction<any>) => {
      return {
        ...state,
        getOneLoading: 'failed',
        getOneError: action.payload.data.message,
      };
    });

    builder.addCase(createProductAsyncThunk.pending, (state: IProductState) => {
      return {
        ...state,
        postLoading: 'pending',
      };
    });
    builder.addCase(createProductAsyncThunk.fulfilled, (state: IProductState, action: PayloadAction<IDataProduct | any>) => {
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
    builder.addCase(createProductAsyncThunk.rejected, (state: IProductState, action: PayloadAction<any>) => {
      return {
        ...state,
        postLoading: 'failed',
        postError: action.payload.data.message,
      };
    });

    builder.addCase(putProductAsyncThunk.pending, (state: IProductState) => {
      return {
        ...state,
        putLoading: 'pending',
      };
    });
    builder.addCase(putProductAsyncThunk.fulfilled, (state: IProductState, action: PayloadAction<IDataProduct | any>) => {
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
        dataGetAll: state.dataGetAll.map((element: IDataProduct) => (element.id === id ? action.payload.data : element)),
      };
    });
    builder.addCase(putProductAsyncThunk.rejected, (state: IProductState, action: PayloadAction<any>) => {
      return {
        ...state,
        putLoading: 'failed',
        putError: action.payload.data.message,
      };
    });

    builder.addCase(deleteProductAsyncThunk.pending, (state: IProductState) => {
      return {
        ...state,
        deleteLoading: 'pending',
      };
    });
    builder.addCase(deleteProductAsyncThunk.fulfilled, (state: IProductState, action: PayloadAction<IDataProduct | any>) => {
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
        dataGetAll: state.dataGetAll.filter((element: IDataProduct) => {
          return Number(element.id) !== Number(id);
        }),
      };
    });
    builder.addCase(deleteProductAsyncThunk.rejected, (state: IProductState, action: PayloadAction<any>) => {
      return {
        ...state,
        deleteLoading: 'failed',
        deleteError: action.payload.data.message,
      };
    });
  },
});

export { getAllProductAsyncThunk, getOneProductAsyncThunk, createProductAsyncThunk, putProductAsyncThunk, deleteProductAsyncThunk, countProductAsyncThunk };
export const getProductState = (state: RootState) => state.productSlice;
export const { resetProductState, setTitle } = productSlice.actions;
export default productSlice;
