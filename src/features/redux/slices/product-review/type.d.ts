interface IDataProductReview {
  id?: number;
  productId?: number;
  parentId?: number;
  title?: string;
  rating?: number;
  published?: number;
  publishedAt?: Date;
  content?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

interface IDataInput {
  productId: number;
}

type TLoading = 'idle' | 'pending' | 'succeeded' | 'failed';

interface IProductReviewState {
  dataInput: IDataInput;
  dataGetAll: IDataProductReview[];
  dataGetOne: IDataProductReview;
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

export { IDataProductReview, IDataSignin, IAuth, TLoading, IProductReviewState };
