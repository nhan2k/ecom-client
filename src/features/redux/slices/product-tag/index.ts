import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProductTagState, IDataProductTag } from './type';
import { RootState } from '@features/redux/store';
import { getAllProductTag, getOneProductTag, createProductTag, putProductTag, deleteProductTag } from './product.tag.service';

const prefixType = 'ProductTag';
const getAllProductTagAsyncThunk = createAsyncThunk(`${prefixType}/getAll`, async (_, thunkAPI) => {
  try {
    const dataResponse = await getAllProductTag();
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
const getOneProductTagAsyncThunk = createAsyncThunk(`${prefixType}/getOne`, async (id: number, thunkAPI) => {
  try {
    const dataResponse = await getOneProductTag(id);
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
const createProductTagAsyncThunk = createAsyncThunk(`${prefixType}/create`, async (data: IDataProductTag, thunkAPI) => {
  try {
    const dataResponse = await createProductTag(data);
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
const putProductTagAsyncThunk = createAsyncThunk(`${prefixType}/put`, async ({ data, id }: { data: IDataProductTag; id: number }, thunkAPI) => {
  try {
    const dataResponse = await putProductTag(data, id);
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
const deleteProductTagAsyncThunk = createAsyncThunk(`${prefixType}/delete`, async (id: number, thunkAPI) => {
  try {
    const dataResponse = await deleteProductTag(id);
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

const initialState: IProductTagState = {
  dataInput: {
    productId: 1,
    tagId: 1,
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

const ProductTagSlice = createSlice({
  name: 'ProductTagSlice',
  initialState,
  reducers: {
    resetProductTagState: () => {
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
    setTagId: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        dataInput: {
          ...state.dataInput,
          tagId: action.payload,
        },
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllProductTagAsyncThunk.pending, (state: IProductTagState) => {
      return {
        ...state,
        getAllLoading: 'pending',
      };
    });
    builder.addCase(getAllProductTagAsyncThunk.fulfilled, (state: IProductTagState, action: PayloadAction<IDataProductTag[] | any>) => {
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
    builder.addCase(getAllProductTagAsyncThunk.rejected, (state: IProductTagState, action: PayloadAction<any>) => {
      return {
        ...state,
        getAllLoading: 'failed',
        getAllError: action.payload.data.message,
      };
    });

    builder.addCase(getOneProductTagAsyncThunk.pending, (state: IProductTagState) => {
      return {
        ...state,
        getOneLoading: 'pending',
      };
    });
    builder.addCase(getOneProductTagAsyncThunk.fulfilled, (state: IProductTagState, action: PayloadAction<IDataProductTag | any>) => {
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
    builder.addCase(getOneProductTagAsyncThunk.rejected, (state: IProductTagState, action: PayloadAction<any>) => {
      return {
        ...state,
        getOneLoading: 'failed',
        getOneError: action.payload.data.message,
      };
    });

    builder.addCase(createProductTagAsyncThunk.pending, (state: IProductTagState) => {
      return {
        ...state,
        postLoading: 'pending',
      };
    });
    builder.addCase(createProductTagAsyncThunk.fulfilled, (state: IProductTagState, action: PayloadAction<IDataProductTag | any>) => {
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
    builder.addCase(createProductTagAsyncThunk.rejected, (state: IProductTagState, action: PayloadAction<any>) => {
      return {
        ...state,
        postLoading: 'failed',
        postError: action.payload.data.message,
      };
    });

    builder.addCase(putProductTagAsyncThunk.pending, (state: IProductTagState) => {
      return {
        ...state,
        putLoading: 'pending',
      };
    });
    builder.addCase(putProductTagAsyncThunk.fulfilled, (state: IProductTagState, action: PayloadAction<IDataProductTag | any>) => {
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
        dataGetAll: state.dataGetAll.map((element: IDataProductTag) => (element.id === id ? action.payload.data : element)),
      };
    });
    builder.addCase(putProductTagAsyncThunk.rejected, (state: IProductTagState, action: PayloadAction<any>) => {
      return {
        ...state,
        putLoading: 'failed',
        putError: action.payload.data.message,
      };
    });

    builder.addCase(deleteProductTagAsyncThunk.pending, (state: IProductTagState) => {
      return {
        ...state,
        deleteLoading: 'pending',
      };
    });
    builder.addCase(deleteProductTagAsyncThunk.fulfilled, (state: IProductTagState, action: PayloadAction<IDataProductTag | any>) => {
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
        dataGetAll: state.dataGetAll.filter((element: IDataProductTag) => {
          return Number(element.id) !== Number(id);
        }),
      };
    });
    builder.addCase(deleteProductTagAsyncThunk.rejected, (state: IProductTagState, action: PayloadAction<any>) => {
      return {
        ...state,
        deleteLoading: 'failed',
        deleteError: action.payload.data.message,
      };
    });
  },
});

export { getAllProductTagAsyncThunk, getOneProductTagAsyncThunk, createProductTagAsyncThunk, putProductTagAsyncThunk, deleteProductTagAsyncThunk };
export const getProductTagState = (state: RootState) => state.ProductTagSlice;
export const { resetProductTagState, setProductId, setTagId } = ProductTagSlice.actions;
export default ProductTagSlice;
