interface IDataSignup {
  firstName?: string
  lastName?: string
  email: string
  password: string
}

interface IDataSignin {
  email: string
  password: string
}

interface IAuth {
  accessToken: string
  refreshToken: string
}
type TLoading = 'idle' | 'pending' | 'succeeded' | 'failed'
type TRole = 'USER'
interface IAuthState {
  firstName: string
  lastName: string
  email: string
  password: string
  mobile: string
  auth: boolean
  loading: TLoading
  token?: string
  role?: TRole
  loadingSignup: TLoading
  errorSignup: string
}

export { IDataSignup, IDataSignin, IAuth, TLoading, IAuthState }
