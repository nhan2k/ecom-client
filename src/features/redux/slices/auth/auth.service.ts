import { privateHTTP, publicHTTP } from '@features/utils/axios';
import { IDataSignup, IDataSignin } from './type';
import { IDataResponse } from '@features/utils/axios';

const signup = async (data: IDataSignup): Promise<IDataResponse> => {
  try {
    const response = await publicHTTP.post('/signup/vendor', data);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

const signin = async (data: IDataSignin): Promise<IDataResponse> => {
  try {
    const response = await publicHTTP.post('/api/v1', data);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

const signout = async (): Promise<IDataResponse> => {
  try {
    const response = await privateHTTP.get('/auth/logout');
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};
export { signin, signout, signup };
