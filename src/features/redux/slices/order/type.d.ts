interface IDataOrder {
  id?: number;
  userId?: number;
  sessionId?: string;
  token?: string;
  status?: number;
  subTotal?: number;
  itemDiscount?: number;
  tax?: number;
  shipping?: number;
  total?: number;
  promo?: string;
  discount?: number;
  grandTotal?: number;
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
  content?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

interface IDataInput {
  sessionId: number;
  token: string;
}

type TLoading = 'idle' | 'pending' | 'succeeded' | 'failed';

interface IOrderState {
  dataInput: IDataInput;
  dataGetAll: IDataOrder[];
  count: number;
  dataGetOne: IDataOrder;
  getAllLoading: TLoading;
  countLoading: TLoading;
  getOneLoading: TLoading;
  postLoading: TLoading;
  putLoading: TLoading;
  deleteLoading: TLoading;
  getAllError: string;
  countError: string;
  getOneError: string;
  postError: string;
  putError: string;
  deleteError: string;
}

export { IDataOrder, IDataSignin, IAuth, TLoading, IOrderState };
