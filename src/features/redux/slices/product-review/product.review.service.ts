import { privateHTTP, IDataResponse } from '@features/utils/axios';
import { getItem } from '@features/utils/local.storage';
import { IDataProductReview } from './type';

const getAllProductReview = async (): Promise<IDataResponse> => {
  try {
    const ProductReview = getItem('user');
    const token = ProductReview !== null ? ProductReview.accessToken : '';
    const response = await privateHTTP.get('/product-review', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

const getOneProductReview = async (id: number): Promise<IDataResponse> => {
  try {
    const ProductReview = getItem('user');
    const token = ProductReview !== null ? ProductReview.accessToken : '';
    const response = await privateHTTP.get(`/product-review/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

const createProductReview = async (data: IDataProductReview): Promise<IDataResponse> => {
  try {
    const ProductReview = getItem('user');
    const token = ProductReview !== null ? ProductReview.accessToken : '';
    const response = await privateHTTP.post('/product-review', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

const putProductReview = async (data: IDataProductReview, id: number): Promise<IDataResponse> => {
  try {
    const ProductReview = getItem('user');
    const token = ProductReview !== null ? ProductReview.accessToken : '';
    const response = await privateHTTP.put(`/product-review/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

const deleteProductReview = async (id: number): Promise<IDataResponse> => {
  try {
    const ProductReview = getItem('user');
    const token = ProductReview !== null ? ProductReview.accessToken : '';
    const response = await privateHTTP.delete(`/product-review/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export { getAllProductReview, getOneProductReview, createProductReview, putProductReview, deleteProductReview };
