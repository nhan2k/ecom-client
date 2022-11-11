interface IDataCategory {
  id?: string;
  parentId?: number;
  title?: string;
  metaTitle?: string;
  slug?: string;
  content?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

interface IDataInput {
  title: string;
}

type TLoading = 'idle' | 'pending' | 'succeeded' | 'failed';

interface ICategoryState {
  dataInput: IDataInput;
  dataGetAll: IDataCategory[];
  dataGetOne: IDataCategory;
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
  postModal: boolean;
  putModal: boolean;
  deleteModal: boolean;
}

export { IDataCategory, IDataSignin, IAuth, TLoading, ICategoryState };
