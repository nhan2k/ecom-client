interface IDataUser {
  id?: number;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  mobile?: string;
  email?: string;
  passwordHash?: string;
  admin?: number;
  vendor?: number;
  registeredAt?: Date;
  lastLogin?: Date;
  intro?: string;
  profile?: string;
  updatedAt?: Date;
  deletedAt?: Date;
}

interface IDataInput {
  email: string;
  password: string;
}

type TLoading = 'idle' | 'pending' | 'succeeded' | 'failed';

interface IUserState {
  dataInput: IDataInput;
  dataGetAll: IDataUser[];
  dataGetOne: IDataUser;
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

export { IDataUser, IDataSignin, IAuth, TLoading, IUserState };
