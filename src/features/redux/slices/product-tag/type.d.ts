interface IDataProductTag {
  id?: number;
  productId?: number;
  tagId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

interface IDataInput {
  productId: number;
  tagId: number;
}

type TLoading = 'idle' | 'pending' | 'succeeded' | 'failed';

interface IProductTagState {
  dataInput: IDataInput;
  dataGetAll: IDataProductTag[];
  dataGetOne: IDataProductTag;
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

export { IDataProductTag, IDataSignin, IAuth, TLoading, IProductTagState };
