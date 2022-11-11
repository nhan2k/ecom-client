import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IAuthState, TLoading } from './type';
import { signin, signout, signup } from './auth.service';
import { setItem, getItem } from '@features/utils/local.storage';
import { RootState } from '../../store';

const prefixType = 'auth';
const signupAsyncThunk = createAsyncThunk(`${prefixType}/signup`, async (data: { firstName: string; lastName: string; email: string; password: string }, thunkAPI) => {
  try {
    const dataResponse = await signup(data);
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const signinAsyncThunk = createAsyncThunk(`${prefixType}/signin`, async (data: { email: string; password: string }, thunkAPI) => {
  try {
    const dataResponse = await signin(data);
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const signoutAsyncThunk = createAsyncThunk(`${prefixType}/signout`, async (_, thunkAPI) => {
  try {
    const dataResponse = await signout();
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const initialState: IAuthState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  loading: 'idle',
  loadingSignup: 'idle',
  errorSignup: '',
  auth: getItem('user') !== null ? true : false,
  role: getItem('user') !== null ? getItem('user').role : 'VENDOR',
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setFirstName: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        firstName: action.payload,
      };
    },
    setLastName: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        lastName: action.payload,
      };
    },
    setEmail: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        email: action.payload,
      };
    },
    setPassword: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        password: action.payload,
      };
    },
    setAuth: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        auth: action.payload,
      };
    },
    setLoading: (state, action: PayloadAction<TLoading>) => {
      return {
        ...state,
        loading: action.payload,
      };
    },
    setDecoded: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        decoded: action.payload,
      };
    },
    resetAuthState: (state) => {
      return {
        ...state,
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        loading: 'idle',
        token: '',
        auth: false,
        role: undefined,
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(signinAsyncThunk.pending, (state, action) => {
      return {
        ...state,
        loading: 'pending',
      };
    });
    builder.addCase(signinAsyncThunk.fulfilled, (state, action) => {
      if (!action.payload.isSuccess || action.payload.data.role === 'USER') {
        return {
          ...state,
          loading: 'failed',
        };
      }
      const token: string = action.payload.data.accessToken;

      setItem('user', action.payload.data);
      return {
        ...state,
        loading: 'succeeded',
        auth: true,
        token: token,
        role: action.payload.data.role,
      };
    });
    builder.addCase(signinAsyncThunk.rejected, (state, action) => {
      return {
        ...state,
        loading: 'failed',
      };
    });
    builder.addCase(signupAsyncThunk.pending, (state, action) => {
      return {
        ...state,
        loadingSignup: 'pending',
      };
    });
    builder.addCase(signupAsyncThunk.fulfilled, (state, action) => {
      if (!action.payload.isSuccess) {
        return {
          ...state,
          loadingSignup: 'failed',
        };
      }

      return {
        ...state,
        loadingSignup: 'succeeded',
      };
    });
    builder.addCase(signupAsyncThunk.rejected, (state, action: any) => {
      return {
        ...state,
        loading: 'failed',
        errorSignup: action.payload.data,
      };
    });
  },
});

export { signinAsyncThunk, signoutAsyncThunk, signupAsyncThunk };
export const getAuthState = (state: RootState) => state.authSlice;
export const { setFirstName, setLastName, setEmail, setPassword, resetAuthState, setLoading, setDecoded } = authSlice.actions;
export default authSlice;
