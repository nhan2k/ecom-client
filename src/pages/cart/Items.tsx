import * as React from 'react'
import { useAppDispatch, useAppSelector } from '@/features/hooks/reduxHooks'
import { getAllCartItemAsyncThunk, getCartItemState } from '@/features/redux/slices/cart-item'
import ModalDelete from './ModalDelete'
import DataTable from 'react-data-table-component'
import Quantity from './Quantity'

const columns = [
  {
    name: 'Name',
    cell: (row: any) => (
      <>
        <img src={`${process.env.REACT_APP_API_PUBLIC_IMAGE}/${row.ProductModel.content}`} alt="" style={{ width: '10rem', alignItems: 'center' }} />
        <p>
          {row.ProductModel.title} {row.content}
        </p>
      </>
    ),
  },
  {
    name: 'Unit Price',
    selector: (row: any) => '$' + row.ProductModel.price,
    maxWidth: '30px',
  },
  {
    name: 'Quantity',
    cell: (row: any) => <Quantity quantity={row.quantity} id={row.id} />,
    maxWidth: '30px',
  },
  {
    name: 'Price',
    cell: (row: any) => '$' + row.ProductModel.price * row.quantity,
    maxWidth: '30px',
  },
  {
    name: 'Action',
    cell: (row: any) => <ModalDelete id={row.id} />,
    maxWidth: '30px',
  },
]

function Items() {
  const dispatch = useAppDispatch()
  const { getItemsForShop, getAllLoading } = useAppSelector(getCartItemState)

  React.useEffect(() => {
    dispatch(getAllCartItemAsyncThunk())
  }, [])

  return <React.Fragment>{getAllLoading === 'succeeded' ? <DataTable columns={columns} data={getItemsForShop} selectableRows pagination /> : <React.Fragment />}</React.Fragment>
}

export default Items
