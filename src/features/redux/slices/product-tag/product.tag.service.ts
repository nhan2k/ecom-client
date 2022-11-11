import { privateHTTP, IDataResponse } from '@features/utils/axios';
import { getItem } from '@features/utils/local.storage';
import { IDataProductTag } from './type';

const getAllProductTag = async (): Promise<IDataResponse> => {
  try {
    const ProductTag = getItem('user');
    const token = ProductTag !== null ? ProductTag.accessToken : '';
    const response = await privateHTTP.get('/product-tag', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

const getOneProductTag = async (id: number): Promise<IDataResponse> => {
  try {
    const ProductTag = getItem('user');
    const token = ProductTag !== null ? ProductTag.accessToken : '';
    const response = await privateHTTP.get(`/product-tag/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

const createProductTag = async (data: IDataProductTag): Promise<IDataResponse> => {
  try {
    const ProductTag = getItem('user');
    const token = ProductTag !== null ? ProductTag.accessToken : '';
    const response = await privateHTTP.post('/product-tag', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

const putProductTag = async (data: IDataProductTag, id: number): Promise<IDataResponse> => {
  try {
    const ProductTag = getItem('user');
    const token = ProductTag !== null ? ProductTag.accessToken : '';
    const response = await privateHTTP.put(`/product-tag/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

const deleteProductTag = async (id: number): Promise<IDataResponse> => {
  try {
    const ProductTag = getItem('user');
    const token = ProductTag !== null ? ProductTag.accessToken : '';
    const response = await privateHTTP.delete(`/product-tag/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export { getAllProductTag, getOneProductTag, createProductTag, putProductTag, deleteProductTag };
