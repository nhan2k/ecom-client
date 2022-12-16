import { privateHTTP, IDataResponse } from '@features/utils/axios'
import { getItem } from '@features/utils/local.storage'
import { IDataCheckout } from './type'

const checkout = async (data: IDataCheckout): Promise<IDataResponse> => {
  try {
    const user = getItem('client')
    const token = user !== null ? user.accessToken : ''
    const response = await privateHTTP.post('/checkout', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

export { checkout }
