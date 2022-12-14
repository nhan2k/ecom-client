import { privateHTTP, IDataResponse, publicHTTP } from '@features/utils/axios'
import { getItem } from '@features/utils/local.storage'
import { IDataProduct } from './type'

const getAllProduct = async (): Promise<IDataResponse> => {
  try {
    const response = await publicHTTP.get('/client/product')
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}
const countProduct = async (): Promise<IDataResponse> => {
  try {
    const user = getItem('client')
    const token = user !== null ? user.accessToken : ''
    const response = await privateHTTP.get('/product/count', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

const getOneProduct = async (id: number): Promise<IDataResponse> => {
  try {
    const user = getItem('client')
    const token = user !== null ? user.accessToken : ''
    const response = await publicHTTP.get(`/client/product/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

const createProduct = async (data: IDataProduct): Promise<IDataResponse> => {
  try {
    const user = getItem('client')
    const token = user !== null ? user.accessToken : ''
    const response = await privateHTTP.post('/product', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

const putProduct = async (data: IDataProduct, id: number): Promise<IDataResponse> => {
  try {
    const user = getItem('client')
    const token = user !== null ? user.accessToken : ''
    const response = await privateHTTP.put(`/product/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

const deleteProduct = async (id: number): Promise<IDataResponse> => {
  try {
    const user = getItem('client')
    const token = user !== null ? user.accessToken : ''
    const response = await privateHTTP.delete(`/product/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

export { getAllProduct, getOneProduct, createProduct, putProduct, deleteProduct, countProduct }
