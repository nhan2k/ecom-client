import { useAppDispatch } from '@/features/hooks/reduxHooks'
import { getAllCartItemAsyncThunk, putCartItemAsyncThunk } from '@/features/redux/slices/cart-item'
import { TextField } from '@mui/material'
import * as React from 'react'

interface IQuantityProps {
  quantity: number
  id: number
}

const Quantity: React.FunctionComponent<IQuantityProps> = ({ quantity, id }) => {
  const dispatch = useAppDispatch()

  const handleOnChange = async (e: React.BaseSyntheticEvent) => {
    if (quantity >= 1) {
      await dispatch(
        putCartItemAsyncThunk({
          data: {
            quantity: e.target.value,
          },
          id: id,
        })
      )
      await dispatch(getAllCartItemAsyncThunk())
    }
  }

  return (
    <TextField
      defaultValue={quantity}
      onChange={handleOnChange}
      id="standard-number"
      type="number"
      inputProps={{ style: { fontSize: '1.8rem' } }}
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{ inputProps: { min: 1 } }}
      variant="standard"
    />
  )
}

export default Quantity
