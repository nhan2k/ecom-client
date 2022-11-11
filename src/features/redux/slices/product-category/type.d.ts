interface IDataProductCategory {
  id?: number;
  productId?: number;
  categoryId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

interface IDataInput {
  productId: number;
  categoryId: number;
}

type TLoading = 'idle' | 'pending' | 'succeeded' | 'failed';

interface IProductCategoryState {
  dataInput: IDataInput;
  dataGetAll: IDataProductCategory[];
  dataGetOne: IDataProductCategory;
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

export { IDataProductCategory, IDataSignin, IAuth, TLoading, IProductCategoryState };
