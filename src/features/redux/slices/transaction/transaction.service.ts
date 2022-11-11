import { privateHTTP, IDataResponse } from '@features/utils/axios';
import { getItem } from '@features/utils/local.storage';
import { IDataTransaction } from './type';

const getAllTransaction = async (): Promise<IDataResponse> => {
  try {
    const user = getItem('user');
    const token = user !== null ? user.accessToken : '';
    const response = await privateHTTP.get('/transaction', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

const countTransaction = async (): Promise<IDataResponse> => {
  try {
    const user = getItem('user');
    const token = user !== null ? user.accessToken : '';
    const response = await privateHTTP.get('/transaction/count', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

const getOneTransaction = async (id: number): Promise<IDataResponse> => {
  try {
    const user = getItem('user');
    const token = user !== null ? user.accessToken : '';
    const response = await privateHTTP.get(`/transaction/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

const createTransaction = async (data: IDataTransaction): Promise<IDataResponse> => {
  try {
    const user = getItem('user');
    const token = user !== null ? user.accessToken : '';
    const response = await privateHTTP.post('/transaction', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

const putTransaction = async (data: IDataTransaction, id: number): Promise<IDataResponse> => {
  try {
    const user = getItem('user');
    const token = user !== null ? user.accessToken : '';
    const response = await privateHTTP.put(`/transaction/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

const deleteTransaction = async (id: number): Promise<IDataResponse> => {
  try {
    const user = getItem('user');
    const token = user !== null ? user.accessToken : '';
    const response = await privateHTTP.delete(`/transaction/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export { getAllTransaction, getOneTransaction, createTransaction, putTransaction, deleteTransaction, countTransaction };
