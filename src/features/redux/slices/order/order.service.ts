import { privateHTTP, IDataResponse } from '@features/utils/axios';
import { getItem } from '@features/utils/local.storage';
import { IDataOrder } from './type';

const getAllOrder = async (): Promise<IDataResponse> => {
  try {
    const user = getItem('user');
    const token = user !== null ? user.accessToken : '';
    const response = await privateHTTP.get('/order', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

const countOrder = async (): Promise<IDataResponse> => {
  try {
    const user = getItem('user');
    const token = user !== null ? user.accessToken : '';
    const response = await privateHTTP.get('/order/count', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

const getOneOrder = async (id: number): Promise<IDataResponse> => {
  try {
    const user = getItem('user');
    const token = user !== null ? user.accessToken : '';
    const response = await privateHTTP.get(`/order/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

const createOrder = async (data: IDataOrder): Promise<IDataResponse> => {
  try {
    const user = getItem('user');
    const token = user !== null ? user.accessToken : '';
    const response = await privateHTTP.post('/order', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

const putOrder = async (data: IDataOrder, id: number): Promise<IDataResponse> => {
  try {
    const user = getItem('user');
    const token = user !== null ? user.accessToken : '';
    const response = await privateHTTP.put(`/order/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

const deleteOrder = async (id: number): Promise<IDataResponse> => {
  try {
    const user = getItem('user');
    const token = user !== null ? user.accessToken : '';
    const response = await privateHTTP.delete(`/order/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export { getAllOrder, getOneOrder, createOrder, putOrder, deleteOrder, countOrder };
