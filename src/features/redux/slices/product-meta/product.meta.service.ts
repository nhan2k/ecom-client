import { privateHTTP, IDataResponse } from '@features/utils/axios';
import { getItem } from '@features/utils/local.storage';
import { IDataProductMeta } from './type';

const getAllProductMeta = async (): Promise<IDataResponse> => {
  try {
    const ProductMeta = getItem('user');
    const token = ProductMeta !== null ? ProductMeta.accessToken : '';
    const response = await privateHTTP.get('/product-meta', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

const getOneProductMeta = async (id: number): Promise<IDataResponse> => {
  try {
    const ProductMeta = getItem('user');
    const token = ProductMeta !== null ? ProductMeta.accessToken : '';
    const response = await privateHTTP.get(`/product-meta/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

const createProductMeta = async (data: IDataProductMeta): Promise<IDataResponse> => {
  try {
    const ProductMeta = getItem('user');
    const token = ProductMeta !== null ? ProductMeta.accessToken : '';
    const response = await privateHTTP.post('/product-meta', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

const putProductMeta = async (data: IDataProductMeta, id: number): Promise<IDataResponse> => {
  try {
    const ProductMeta = getItem('user');
    const token = ProductMeta !== null ? ProductMeta.accessToken : '';
    const response = await privateHTTP.put(`/product-meta/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

const deleteProductMeta = async (id: number): Promise<IDataResponse> => {
  try {
    const ProductMeta = getItem('user');
    const token = ProductMeta !== null ? ProductMeta.accessToken : '';
    const response = await privateHTTP.delete(`/product-meta/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export { getAllProductMeta, getOneProductMeta, createProductMeta, putProductMeta, deleteProductMeta };
