import { privateHTTP, publicHTTP, IDataResponse } from '@features/utils/axios'
import { getItem } from '@features/utils/local.storage'
import { IDataCartItem } from './type'

const getAllCartItem = async (): Promise<IDataResponse> => {
  try {
    const user = getItem('client')
    const token = user !== null ? user.accessToken : ''
    const response = await privateHTTP.get('/cart-item', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

const getOneCartItem = async (id: number): Promise<IDataResponse> => {
  try {
    const user = getItem('client')
    const token = user !== null ? user.accessToken : ''
    const response = await privateHTTP.get(`/cart-item/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

const createCartItem = async (productId: number): Promise<IDataResponse> => {
  try {
    const user = getItem('client')
    const token = user !== null ? user.accessToken : ''
    const response = await privateHTTP.post(
      '/cart-item',
      { productId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

const putCartItem = async (data: IDataCartItem, id: number): Promise<IDataResponse> => {
  try {
    const user = getItem('client')
    const token = user !== null ? user.accessToken : ''
    const response = await privateHTTP.put(`/cart-item/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

const deleteCartItem = async (id: number): Promise<IDataResponse> => {
  try {
    const user = getItem('client')
    const token = user !== null ? user.accessToken : ''
    const response = await privateHTTP.delete(`/cart-item/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

export { getAllCartItem, getOneCartItem, createCartItem, putCartItem, deleteCartItem }
