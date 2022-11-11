import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITagState, IDataTag } from './type';
import { RootState } from '@features/redux/store';
import { getAllTag, getOneTag, createTag, putTag, deleteTag } from './tag.service';

const prefixType = 'Tag';
const getAllTagAsyncThunk = createAsyncThunk(`${prefixType}/getAll`, async (_, thunkAPI) => {
  try {
    const dataResponse = await getAllTag();
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
const getOneTagAsyncThunk = createAsyncThunk(`${prefixType}/getOne`, async (id: number, thunkAPI) => {
  try {
    const dataResponse = await getOneTag(id);
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
const createTagAsyncThunk = createAsyncThunk(`${prefixType}/create`, async (data: IDataTag, thunkAPI) => {
  try {
    const dataResponse = await createTag(data);
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
const putTagAsyncThunk = createAsyncThunk(`${prefixType}/put`, async ({ data, id }: { data: IDataTag; id: number }, thunkAPI) => {
  try {
    const dataResponse = await putTag(data, id);
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
const deleteTagAsyncThunk = createAsyncThunk(`${prefixType}/delete`, async (id: number, thunkAPI) => {
  try {
    const dataResponse = await deleteTag(id);
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

const initialState: ITagState = {
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
};

const TagSlice = createSlice({
  name: 'TagSlice',
  initialState,
  reducers: {
    resetTagState: () => {
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
    builder.addCase(getAllTagAsyncThunk.pending, (state: ITagState) => {
      return {
        ...state,
        getAllLoading: 'pending',
      };
    });
    builder.addCase(getAllTagAsyncThunk.fulfilled, (state: ITagState, action: PayloadAction<IDataTag[] | any>) => {
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
    builder.addCase(getAllTagAsyncThunk.rejected, (state: ITagState, action: PayloadAction<any>) => {
      return {
        ...state,
        getAllLoading: 'failed',
        getAllError: action.payload.data.message,
      };
    });

    builder.addCase(getOneTagAsyncThunk.pending, (state: ITagState) => {
      return {
        ...state,
        getOneLoading: 'pending',
      };
    });
    builder.addCase(getOneTagAsyncThunk.fulfilled, (state: ITagState, action: PayloadAction<IDataTag | any>) => {
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
    builder.addCase(getOneTagAsyncThunk.rejected, (state: ITagState, action: PayloadAction<any>) => {
      return {
        ...state,
        getOneLoading: 'failed',
        getOneError: action.payload.data.message,
      };
    });

    builder.addCase(createTagAsyncThunk.pending, (state: ITagState) => {
      return {
        ...state,
        postLoading: 'pending',
      };
    });
    builder.addCase(createTagAsyncThunk.fulfilled, (state: ITagState, action: PayloadAction<IDataTag | any>) => {
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
    builder.addCase(createTagAsyncThunk.rejected, (state: ITagState, action: PayloadAction<any>) => {
      return {
        ...state,
        postLoading: 'failed',
        postError: action.payload.data.message,
      };
    });

    builder.addCase(putTagAsyncThunk.pending, (state: ITagState) => {
      return {
        ...state,
        putLoading: 'pending',
      };
    });
    builder.addCase(putTagAsyncThunk.fulfilled, (state: ITagState, action: PayloadAction<IDataTag | any>) => {
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
        dataGetAll: state.dataGetAll.map((element: IDataTag) => (element.id === id ? action.payload.data : element)),
      };
    });
    builder.addCase(putTagAsyncThunk.rejected, (state: ITagState, action: PayloadAction<any>) => {
      return {
        ...state,
        putLoading: 'failed',
        putError: action.payload.data.message,
      };
    });

    builder.addCase(deleteTagAsyncThunk.pending, (state: ITagState) => {
      return {
        ...state,
        deleteLoading: 'pending',
      };
    });
    builder.addCase(deleteTagAsyncThunk.fulfilled, (state: ITagState, action: PayloadAction<IDataTag | any>) => {
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
        dataGetAll: state.dataGetAll.filter((element: IDataTag) => {
          return Number(element.id) !== Number(id);
        }),
      };
    });
    builder.addCase(deleteTagAsyncThunk.rejected, (state: ITagState, action: PayloadAction<any>) => {
      return {
        ...state,
        deleteLoading: 'failed',
        deleteError: action.payload.data.message,
      };
    });
  },
});

export { getAllTagAsyncThunk, getOneTagAsyncThunk, createTagAsyncThunk, putTagAsyncThunk, deleteTagAsyncThunk };
export const getTagState = (state: RootState) => state.TagSlice;
export const { resetTagState, setTitle } = TagSlice.actions;
export default TagSlice;
