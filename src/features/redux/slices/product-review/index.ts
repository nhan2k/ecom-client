import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProductReviewState, IDataProductReview } from './type';
import { RootState } from '@features/redux/store';
import { getAllProductReview, getOneProductReview, createProductReview, putProductReview, deleteProductReview } from './product.review.service';

const prefixType = 'ProductReview';
const getAllProductReviewAsyncThunk = createAsyncThunk(`${prefixType}/getAll`, async (_, thunkAPI) => {
  try {
    const dataResponse = await getAllProductReview();
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
const getOneProductReviewAsyncThunk = createAsyncThunk(`${prefixType}/getOne`, async (id: number, thunkAPI) => {
  try {
    const dataResponse = await getOneProductReview(id);
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
const createProductReviewAsyncThunk = createAsyncThunk(`${prefixType}/create`, async (data: IDataProductReview, thunkAPI) => {
  try {
    const dataResponse = await createProductReview(data);
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
const putProductReviewAsyncThunk = createAsyncThunk(`${prefixType}/put`, async ({ data, id }: { data: IDataProductReview; id: number }, thunkAPI) => {
  try {
    const dataResponse = await putProductReview(data, id);
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
const deleteProductReviewAsyncThunk = createAsyncThunk(`${prefixType}/delete`, async (id: number, thunkAPI) => {
  try {
    const dataResponse = await deleteProductReview(id);
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

const initialState: IProductReviewState = {
  dataInput: {
    productId: 1,
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

const ProductReviewSlice = createSlice({
  name: 'ProductReviewSlice',
  initialState,
  reducers: {
    resetProductReviewState: () => {
      return initialState;
    },
    setProductId: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        dataInput: {
          ...state.dataInput,
          productId: action.payload,
        },
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllProductReviewAsyncThunk.pending, (state: IProductReviewState) => {
      return {
        ...state,
        getAllLoading: 'pending',
      };
    });
    builder.addCase(getAllProductReviewAsyncThunk.fulfilled, (state: IProductReviewState, action: PayloadAction<IDataProductReview[] | any>) => {
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
    builder.addCase(getAllProductReviewAsyncThunk.rejected, (state: IProductReviewState, action: PayloadAction<any>) => {
      return {
        ...state,
        getAllLoading: 'failed',
        getAllError: action.payload.data.message,
      };
    });

    builder.addCase(getOneProductReviewAsyncThunk.pending, (state: IProductReviewState) => {
      return {
        ...state,
        getOneLoading: 'pending',
      };
    });
    builder.addCase(getOneProductReviewAsyncThunk.fulfilled, (state: IProductReviewState, action: PayloadAction<IDataProductReview | any>) => {
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
    builder.addCase(getOneProductReviewAsyncThunk.rejected, (state: IProductReviewState, action: PayloadAction<any>) => {
      return {
        ...state,
        getOneLoading: 'failed',
        getOneError: action.payload.data.message,
      };
    });

    builder.addCase(createProductReviewAsyncThunk.pending, (state: IProductReviewState) => {
      return {
        ...state,
        postLoading: 'pending',
      };
    });
    builder.addCase(createProductReviewAsyncThunk.fulfilled, (state: IProductReviewState, action: PayloadAction<IDataProductReview | any>) => {
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
    builder.addCase(createProductReviewAsyncThunk.rejected, (state: IProductReviewState, action: PayloadAction<any>) => {
      return {
        ...state,
        postLoading: 'failed',
        postError: action.payload.data.message,
      };
    });

    builder.addCase(putProductReviewAsyncThunk.pending, (state: IProductReviewState) => {
      return {
        ...state,
        putLoading: 'pending',
      };
    });
    builder.addCase(putProductReviewAsyncThunk.fulfilled, (state: IProductReviewState, action: PayloadAction<IDataProductReview | any>) => {
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
        dataGetAll: state.dataGetAll.map((element: IDataProductReview) => (element.id === id ? action.payload.data : element)),
      };
    });
    builder.addCase(putProductReviewAsyncThunk.rejected, (state: IProductReviewState, action: PayloadAction<any>) => {
      return {
        ...state,
        putLoading: 'failed',
        putError: action.payload.data.message,
      };
    });

    builder.addCase(deleteProductReviewAsyncThunk.pending, (state: IProductReviewState) => {
      return {
        ...state,
        deleteLoading: 'pending',
      };
    });
    builder.addCase(deleteProductReviewAsyncThunk.fulfilled, (state: IProductReviewState, action: PayloadAction<IDataProductReview | any>) => {
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
        dataGetAll: state.dataGetAll.filter((element: IDataProductReview) => {
          return Number(element.id) !== Number(id);
        }),
      };
    });
    builder.addCase(deleteProductReviewAsyncThunk.rejected, (state: IProductReviewState, action: PayloadAction<any>) => {
      return {
        ...state,
        deleteLoading: 'failed',
        deleteError: action.payload.data.message,
      };
    });
  },
});

export { getAllProductReviewAsyncThunk, getOneProductReviewAsyncThunk, createProductReviewAsyncThunk, putProductReviewAsyncThunk, deleteProductReviewAsyncThunk };
export const getProductReviewState = (state: RootState) => state.ProductReviewSlice;
export const { resetProductReviewState, setProductId } = ProductReviewSlice.actions;
export default ProductReviewSlice;
