import { privateHTTP, publicHTTP, IDataResponse } from '@features/utils/axios'
import { getItem } from '@features/utils/local.storage'
import { CartItem, IDataCart } from './type'

const getAllCart = async (): Promise<IDataResponse> => {
  try {
    const user = getItem('client')
    const token = user !== null ? user.accessToken : ''
    const response = await privateHTTP.get('/cart', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

const getOneCart = async (id: number): Promise<IDataResponse> => {
  try {
    const user = getItem('client')
    const token = user !== null ? user.accessToken : ''
    const response = await privateHTTP.get(`/cart/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

const countCart = async (): Promise<IDataResponse> => {
  try {
    const user = getItem('client')
    const token = user !== null ? user.accessToken : ''
    const response = await privateHTTP.get(`/cart/count`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

const createCart = async (data: IDataCart): Promise<IDataResponse> => {
  try {
    const user = getItem('client')
    const token = user !== null ? user.accessToken : ''
    const response = await privateHTTP.post('/cart', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

const putCart = async (data: IDataCart, id: number): Promise<IDataResponse> => {
  try {
    const user = getItem('client')
    const token = user !== null ? user.accessToken : ''
    const response = await privateHTTP.put(`/cart/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

const deleteCart = async (id: number): Promise<IDataResponse> => {
  try {
    const user = getItem('client')
    const token = user !== null ? user.accessToken : ''
    const response = await privateHTTP.delete(`/cart/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

const getPersonCart = async (): Promise<IDataResponse> => {
  try {
    const user = getItem('client')
    const token = user !== null ? user.accessToken : ''
    const response = await privateHTTP.get(`/cart/personCart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

const updateCart = async (data: { quantity: number }, id: number): Promise<IDataResponse> => {
  try {
    const user = getItem('client')
    const token = user !== null ? user.accessToken : ''
    const response = await privateHTTP.put(`/cart-item/update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

const removeItemCart = async (id: number): Promise<IDataResponse> => {
  try {
    const user = getItem('client')
    const token = user !== null ? user.accessToken : ''
    const response = await privateHTTP.delete(`/cart-item/item/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

export { getAllCart, getOneCart, createCart, putCart, deleteCart, countCart, getPersonCart, updateCart, removeItemCart }
