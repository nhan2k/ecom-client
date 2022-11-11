interface IDataTag {
  id?: number;
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

interface ITagState {
  dataInput: IDataInput;
  dataGetAll: IDataTag[];
  dataGetOne: IDataTag;
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

export { IDataTag, IDataSignin, IAuth, TLoading, ITagState };
