import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategoryState, IDataCategory } from './type';
import { RootState } from '@features/redux/store';
import { getAllCategory, getOneCategory, createCategory, putCategory, deleteCategory } from './category.service';

const prefixType = 'category';
const getAllCategoryAsyncThunk = createAsyncThunk(`${prefixType}/getAll`, async (_, thunkAPI) => {
  try {
    const dataResponse = await getAllCategory();
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
const getOneCategoryAsyncThunk = createAsyncThunk(`${prefixType}/getOne`, async (id: number, thunkAPI) => {
  try {
    const dataResponse = await getOneCategory(id);
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
const createCategoryAsyncThunk = createAsyncThunk(`${prefixType}/create`, async (data: IDataCategory, thunkAPI) => {
  try {
    const dataResponse = await createCategory(data);
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
const putCategoryAsyncThunk = createAsyncThunk(`${prefixType}/put`, async ({ data, id }: { data: IDataCategory; id: number }, thunkAPI) => {
  try {
    const dataResponse = await putCategory(data, id);
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
const deleteCategoryAsyncThunk = createAsyncThunk(`${prefixType}/delete`, async (id: number, thunkAPI) => {
  try {
    const dataResponse = await deleteCategory(id);
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

const initialState: ICategoryState = {
  dataInput: {
    title: '',
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
  postModal: false,
  putModal: false,
  deleteModal: false,
};

const categorySlice = createSlice({
  name: 'categorySlice',
  initialState,
  reducers: {
    resetCategoryState: () => {
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
    builder.addCase(getAllCategoryAsyncThunk.pending, (state: ICategoryState) => {
      return {
        ...state,
        getAllLoading: 'pending',
      };
    });
    builder.addCase(getAllCategoryAsyncThunk.fulfilled, (state: ICategoryState, action: PayloadAction<IDataCategory[] | any>) => {
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
    builder.addCase(getAllCategoryAsyncThunk.rejected, (state: ICategoryState, action: PayloadAction<any>) => {
      return {
        ...state,
        getAllLoading: 'failed',
        getAllError: action.payload.data.message,
      };
    });

    builder.addCase(getOneCategoryAsyncThunk.pending, (state: ICategoryState) => {
      return {
        ...state,
        getOneLoading: 'pending',
      };
    });
    builder.addCase(getOneCategoryAsyncThunk.fulfilled, (state: ICategoryState, action: PayloadAction<IDataCategory | any>) => {
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
    builder.addCase(getOneCategoryAsyncThunk.rejected, (state: ICategoryState, action: PayloadAction<any>) => {
      return {
        ...state,
        getOneLoading: 'failed',
        getOneError: action.payload.data.message,
      };
    });

    builder.addCase(createCategoryAsyncThunk.pending, (state: ICategoryState) => {
      return {
        ...state,
        postLoading: 'pending',
      };
    });
    builder.addCase(createCategoryAsyncThunk.fulfilled, (state: ICategoryState, action: PayloadAction<IDataCategory | any>) => {
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
    builder.addCase(createCategoryAsyncThunk.rejected, (state: ICategoryState, action: PayloadAction<any>) => {
      return {
        ...state,
        postLoading: 'failed',
        postError: action.payload.data.message,
      };
    });

    builder.addCase(putCategoryAsyncThunk.pending, (state: ICategoryState) => {
      return {
        ...state,
        putLoading: 'pending',
      };
    });
    builder.addCase(putCategoryAsyncThunk.fulfilled, (state: ICategoryState, action: PayloadAction<IDataCategory | any>) => {
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
        dataGetAll: state.dataGetAll.map((element: IDataCategory) => (element.id === id ? action.payload.data : element)),
      };
    });
    builder.addCase(putCategoryAsyncThunk.rejected, (state: ICategoryState, action: PayloadAction<any>) => {
      return {
        ...state,
        putLoading: 'failed',
        putError: action.payload.data.message,
      };
    });

    builder.addCase(deleteCategoryAsyncThunk.pending, (state: ICategoryState) => {
      return {
        ...state,
        deleteLoading: 'pending',
      };
    });
    builder.addCase(deleteCategoryAsyncThunk.fulfilled, (state: ICategoryState, action: PayloadAction<IDataCategory | any>) => {
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
        dataGetAll: state.dataGetAll.filter((element: IDataCategory) => {
          return Number(element.id) !== Number(id);
        }),
      };
    });
    builder.addCase(deleteCategoryAsyncThunk.rejected, (state: ICategoryState, action: PayloadAction<any>) => {
      return {
        ...state,
        deleteLoading: 'failed',
        deleteError: action.payload.data.message,
      };
    });
  },
});

export { getAllCategoryAsyncThunk, getOneCategoryAsyncThunk, createCategoryAsyncThunk, putCategoryAsyncThunk, deleteCategoryAsyncThunk };
export const getCategoryState = (state: RootState) => state.categorySlice;
export const { resetCategoryState, setTitle, setDeleteModal, setPostModal, setPutModal } = categorySlice.actions;
export default categorySlice;
