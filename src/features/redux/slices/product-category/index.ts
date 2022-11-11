import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProductCategoryState, IDataProductCategory } from './type';
import { RootState } from '@features/redux/store';
import { getAllProductCategory, getOneProductCategory, createProductCategory, putProductCategory, deleteProductCategory } from './product.category.service';

const prefixType = 'productCategory';
const getAllProductCategoryAsyncThunk = createAsyncThunk(`${prefixType}/getAll`, async (_, thunkAPI) => {
  try {
    const dataResponse = await getAllProductCategory();
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
const getOneProductCategoryAsyncThunk = createAsyncThunk(`${prefixType}/getOne`, async (id: number, thunkAPI) => {
  try {
    const dataResponse = await getOneProductCategory(id);
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
const createProductCategoryAsyncThunk = createAsyncThunk(`${prefixType}/create`, async (data: IDataProductCategory, thunkAPI) => {
  try {
    const dataResponse = await createProductCategory(data);
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
const putProductCategoryAsyncThunk = createAsyncThunk(`${prefixType}/put`, async ({ data, id }: { data: IDataProductCategory; id: number }, thunkAPI) => {
  try {
    const dataResponse = await putProductCategory(data, id);
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
const deleteProductCategoryAsyncThunk = createAsyncThunk(`${prefixType}/delete`, async (id: number, thunkAPI) => {
  try {
    const dataResponse = await deleteProductCategory(id);
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

const initialState: IProductCategoryState = {
  dataInput: {
    productId: 1,
    categoryId: 1,
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

const productCategorySlice = createSlice({
  name: 'productCategorySlice',
  initialState,
  reducers: {
    resetProductCategoryState: () => {
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
    setCategoryId: (state, action) => {
      return {
        ...state,
        dataInput: {
          ...state.dataInput,
          categoryId: action.payload,
        },
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllProductCategoryAsyncThunk.pending, (state: IProductCategoryState) => {
      return {
        ...state,
        getAllLoading: 'pending',
      };
    });
    builder.addCase(getAllProductCategoryAsyncThunk.fulfilled, (state: IProductCategoryState, action: PayloadAction<IDataProductCategory[] | any>) => {
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
    builder.addCase(getAllProductCategoryAsyncThunk.rejected, (state: IProductCategoryState, action: PayloadAction<any>) => {
      return {
        ...state,
        getAllLoading: 'failed',
        getAllError: action.payload.data.message,
      };
    });

    builder.addCase(getOneProductCategoryAsyncThunk.pending, (state: IProductCategoryState) => {
      return {
        ...state,
        getOneLoading: 'pending',
      };
    });
    builder.addCase(getOneProductCategoryAsyncThunk.fulfilled, (state: IProductCategoryState, action: PayloadAction<IDataProductCategory | any>) => {
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
    builder.addCase(getOneProductCategoryAsyncThunk.rejected, (state: IProductCategoryState, action: PayloadAction<any>) => {
      return {
        ...state,
        getOneLoading: 'failed',
        getOneError: action.payload.data.message,
      };
    });

    builder.addCase(createProductCategoryAsyncThunk.pending, (state: IProductCategoryState) => {
      return {
        ...state,
        postLoading: 'pending',
      };
    });
    builder.addCase(createProductCategoryAsyncThunk.fulfilled, (state: IProductCategoryState, action: PayloadAction<IDataProductCategory | any>) => {
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
    builder.addCase(createProductCategoryAsyncThunk.rejected, (state: IProductCategoryState, action: PayloadAction<any>) => {
      return {
        ...state,
        postLoading: 'failed',
        postError: action.payload.data.message,
      };
    });

    builder.addCase(putProductCategoryAsyncThunk.pending, (state: IProductCategoryState) => {
      return {
        ...state,
        putLoading: 'pending',
      };
    });
    builder.addCase(putProductCategoryAsyncThunk.fulfilled, (state: IProductCategoryState, action: PayloadAction<IDataProductCategory | any>) => {
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
        dataGetAll: state.dataGetAll.map((element: IDataProductCategory) => (element.id === id ? action.payload.data : element)),
      };
    });
    builder.addCase(putProductCategoryAsyncThunk.rejected, (state: IProductCategoryState, action: PayloadAction<any>) => {
      return {
        ...state,
        putLoading: 'failed',
        putError: action.payload.data.message,
      };
    });

    builder.addCase(deleteProductCategoryAsyncThunk.pending, (state: IProductCategoryState) => {
      return {
        ...state,
        deleteLoading: 'pending',
      };
    });
    builder.addCase(deleteProductCategoryAsyncThunk.fulfilled, (state: IProductCategoryState, action: PayloadAction<IDataProductCategory | any>) => {
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
        dataGetAll: state.dataGetAll.filter((element: IDataProductCategory) => {
          return Number(element.id) !== Number(id);
        }),
      };
    });
    builder.addCase(deleteProductCategoryAsyncThunk.rejected, (state: IProductCategoryState, action: PayloadAction<any>) => {
      return {
        ...state,
        deleteLoading: 'failed',
        deleteError: action.payload.data.message,
      };
    });
  },
});

export { getAllProductCategoryAsyncThunk, getOneProductCategoryAsyncThunk, createProductCategoryAsyncThunk, putProductCategoryAsyncThunk, deleteProductCategoryAsyncThunk };
export const getProductCategoryState = (state: RootState) => state.productCategorySlice;
export const { resetProductCategoryState, setCategoryId, setProductId } = productCategorySlice.actions;
export default productCategorySlice;
