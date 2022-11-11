interface IDataTransaction {
  id?: number;
  userId?: number;
  orderId?: number;
  code?: string;
  type?: number;
  mode?: number;
  status?: number;
  content?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

interface IDataInput {
  orderId: number;
  code: string;
}

type TLoading = 'idle' | 'pending' | 'succeeded' | 'failed';

interface ITransactionState {
  dataInput: IDataInput;
  dataTransactionGetAll: IDataTransaction[];
  count: number;
  dataTransactionGetOne: IDataTransaction;
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
  postModal: boolean;
  putModal: boolean;
  deleteModal: boolean;
}

export { IDataTransaction, IDataSignin, IAuth, TLoading, ITransactionState };
