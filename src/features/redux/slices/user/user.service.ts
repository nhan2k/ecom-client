import { privateHTTP, IDataResponse } from '@features/utils/axios';
import { getItem } from '@features/utils/local.storage';
import { IDataUser } from './type';

const getAllUser = async (): Promise<IDataResponse> => {
  try {
    const user = getItem('user');
    const token = user !== null ? user.accessToken : '';
    const response = await privateHTTP.get('/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

const getOneUser = async (id: number): Promise<IDataResponse> => {
  try {
    const user = getItem('user');
    const token = user !== null ? user.accessToken : '';
    const response = await privateHTTP.get(`/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

const createUser = async (data: IDataUser): Promise<IDataResponse> => {
  try {
    const user = getItem('user');
    const token = user !== null ? user.accessToken : '';
    const response = await privateHTTP.post('/user', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

const putUser = async (data: IDataUser, id: number): Promise<IDataResponse> => {
  try {
    const user = getItem('user');
    const token = user !== null ? user.accessToken : '';
    const response = await privateHTTP.put(`/user/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

const deleteUser = async (id: number): Promise<IDataResponse> => {
  try {
    const user = getItem('user');
    const token = user !== null ? user.accessToken : '';
    const response = await privateHTTP.delete(`/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export { getAllUser, getOneUser, createUser, putUser, deleteUser };
