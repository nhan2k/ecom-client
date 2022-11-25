import { privateHTTP, IDataResponse, publicHTTP } from '@features/utils/axios'
import { getItem } from '@features/utils/local.storage'
import { IDataCategory } from './type'

const getAllCategory = async (): Promise<IDataResponse> => {
  try {
    const response = await publicHTTP.get('/category')
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

const getOneCategory = async (id: number): Promise<IDataResponse> => {
  try {
    const response = await publicHTTP.get(`/category/${id}`)
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

const createCategory = async (data: IDataCategory): Promise<IDataResponse> => {
  try {
    const user = getItem('client')
    const token = user !== null ? user.accessToken : ''
    const response = await privateHTTP.post('/category', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

const putCategory = async (data: IDataCategory, id: number): Promise<IDataResponse> => {
  try {
    const user = getItem('client')
    const token = user !== null ? user.accessToken : ''
    const response = await privateHTTP.put(`/category/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

const deleteCategory = async (id: number): Promise<IDataResponse> => {
  try {
    const user = getItem('client')
    const token = user !== null ? user.accessToken : ''
    const response = await privateHTTP.delete(`/category/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

export { getAllCategory, getOneCategory, createCategory, putCategory, deleteCategory }
