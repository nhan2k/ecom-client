import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserState, IDataUser } from './type';
import { RootState } from '@features/redux/store';
import { getAllUser, getOneUser, createUser, putUser, deleteUser } from './user.service';

const prefixType = 'user';
const getAllUserAsyncThunk = createAsyncThunk(`${prefixType}/getAll`, async (_, thunkAPI) => {
  try {
    const dataResponse = await getAllUser();
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
const getOneUserAsyncThunk = createAsyncThunk(`${prefixType}/getOne`, async (id: number, thunkAPI) => {
  try {
    const dataResponse = await getOneUser(id);
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
const createUserAsyncThunk = createAsyncThunk(`${prefixType}/create`, async (data: IDataUser, thunkAPI) => {
  try {
    const dataResponse = await createUser(data);
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
const putUserAsyncThunk = createAsyncThunk(`${prefixType}/put`, async ({ data, id }: { data: IDataUser; id: number }, thunkAPI) => {
  try {
    const dataResponse = await putUser(data, id);
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
const deleteUserAsyncThunk = createAsyncThunk(`${prefixType}/delete`, async (id: number, thunkAPI) => {
  try {
    const dataResponse = await deleteUser(id);
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

const initialState: IUserState = {
  dataInput: {
    email: '',
    password: '',
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

const UserSlice = createSlice({
  name: 'UserSlice',
  initialState,
  reducers: {
    resetUserState: () => {
      return initialState;
    },
    setEmail: (state, action) => {
      return {
        ...state,
        dataInput: {
          ...state.dataInput,
          email: action.payload,
        },
      };
    },
    setPassword: (state, action) => {
      return {
        ...state,
        dataInput: {
          ...state.dataInput,
          password: action.payload,
        },
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllUserAsyncThunk.pending, (state: IUserState) => {
      return {
        ...state,
        getAllLoading: 'pending',
      };
    });
    builder.addCase(getAllUserAsyncThunk.fulfilled, (state: IUserState, action: PayloadAction<IDataUser[] | any>) => {
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
    builder.addCase(getAllUserAsyncThunk.rejected, (state: IUserState, action: PayloadAction<any>) => {
      return {
        ...state,
        getAllLoading: 'failed',
        getAllError: action.payload.data.message,
      };
    });

    builder.addCase(getOneUserAsyncThunk.pending, (state: IUserState) => {
      return {
        ...state,
        getOneLoading: 'pending',
      };
    });
    builder.addCase(getOneUserAsyncThunk.fulfilled, (state: IUserState, action: PayloadAction<IDataUser | any>) => {
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
    builder.addCase(getOneUserAsyncThunk.rejected, (state: IUserState, action: PayloadAction<any>) => {
      return {
        ...state,
        getOneLoading: 'failed',
        getOneError: action.payload.data.message,
      };
    });

    builder.addCase(createUserAsyncThunk.pending, (state: IUserState) => {
      return {
        ...state,
        postLoading: 'pending',
      };
    });
    builder.addCase(createUserAsyncThunk.fulfilled, (state: IUserState, action: PayloadAction<IDataUser | any>) => {
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
    builder.addCase(createUserAsyncThunk.rejected, (state: IUserState, action: PayloadAction<any>) => {
      return {
        ...state,
        postLoading: 'failed',
        postError: action.payload.data.message,
      };
    });

    builder.addCase(putUserAsyncThunk.pending, (state: IUserState) => {
      return {
        ...state,
        putLoading: 'pending',
      };
    });
    builder.addCase(putUserAsyncThunk.fulfilled, (state: IUserState, action: PayloadAction<IDataUser | any>) => {
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
        dataGetAll: state.dataGetAll.map((element: IDataUser) => (element.id === id ? action.payload.data : element)),
      };
    });
    builder.addCase(putUserAsyncThunk.rejected, (state: IUserState, action: PayloadAction<any>) => {
      return {
        ...state,
        putLoading: 'failed',
        putError: action.payload.data.message,
      };
    });

    builder.addCase(deleteUserAsyncThunk.pending, (state: IUserState) => {
      return {
        ...state,
        deleteLoading: 'pending',
      };
    });
    builder.addCase(deleteUserAsyncThunk.fulfilled, (state: IUserState, action: PayloadAction<IDataUser | any>) => {
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
        dataGetAll: state.dataGetAll.filter((element: IDataUser) => {
          return Number(element.id) !== Number(id);
        }),
      };
    });
    builder.addCase(deleteUserAsyncThunk.rejected, (state: IUserState, action: PayloadAction<any>) => {
      return {
        ...state,
        deleteLoading: 'failed',
        deleteError: action.payload.data.message,
      };
    });
  },
});

export { getAllUserAsyncThunk, getOneUserAsyncThunk, createUserAsyncThunk, putUserAsyncThunk, deleteUserAsyncThunk };
export const getUserState = (state: RootState) => state.UserSlice;
export const { resetUserState, setEmail, setPassword } = UserSlice.actions;
export default UserSlice;
