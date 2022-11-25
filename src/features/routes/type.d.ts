import { TType } from '@features/navigation/drawer/mini-drawer/type'

interface IRoutes {
  path: string
  component: FC<any>
  layout?: FC<any>
  isPublic: boolean
  roleRoutes?: Array<TRole>
}

export { IRoutes }
