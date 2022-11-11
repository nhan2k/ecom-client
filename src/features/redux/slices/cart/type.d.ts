interface IDataCart {
  id?: string;
  userId?: string;
  sessionId?: string;
  token?: string;
  status?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  mobile?: string;
  email?: string;
  line1?: string;
  line2?: string;
  city?: string;
  province?: string;
  country?: string;
  createdAt?: string;
  content?: string;
  updatedAt?: string;
  deletedAt?: string;
}

interface IDataInput {
  sessionId: string;
  token: string;
}

type TLoading = 'idle' | 'pending' | 'succeeded' | 'failed';

interface ICartState {
  dataInput: IDataInput;
  dataGetAll: IDataCart[];
  dataGetOne: IDataCart;
  getAllLoading: TLoading;
  getOneLoading: TLoading;
  postLoading: TLoading;
  putLoading: TLoading;
  deleteLoading: TLoading;
  getAllError: string;
  getOneError: string;
  postError: string;
  putError: string;
  deleteError: string;
}

export { IDataCart, IDataSignin, IAuth, TLoading, ICartState };
