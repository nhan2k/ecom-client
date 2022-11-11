interface IDataProductMeta {
  id?: number;
  productId?: number;
  key?: string;
  content?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

interface IDataInput {
  productId: number;
  key: string;
}

type TLoading = 'idle' | 'pending' | 'succeeded' | 'failed';

interface IProductMetaState {
  dataInput: IDataInput;
  dataGetAll: IDataProductMeta[];
  dataGetOne: IDataProductMeta;
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

export { IDataProductMeta, IDataSignin, IAuth, TLoading, IProductMetaState };
