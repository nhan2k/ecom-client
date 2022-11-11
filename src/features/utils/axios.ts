import axios from 'axios';

export interface IDataResponse {
  data: any;
  isSuccess: boolean;
}

const { REACT_APP_API, REACT_APP_API_PUBLIC } = process.env;

const publicHTTP = axios.create({ baseURL: String(REACT_APP_API) });
const privateHTTP = axios.create({
  baseURL: String(REACT_APP_API_PUBLIC),
});

export { publicHTTP, privateHTTP };
