import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import CloseIcon from '@mui/icons-material/Close'
import { IconButton, Stack } from '@mui/material'
import { useAppDispatch } from '@/features/hooks/reduxHooks'
import { deleteCartItemAsyncThunk, getAllCartItemAsyncThunk } from '@/features/redux/slices/cart-item'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}
interface IModalDelete {
  id: number
}
const ModalDelete: React.FC<IModalDelete> = ({ id }) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const dispatch = useAppDispatch()

  const handleDelete = async () => {
    await dispatch(deleteCartItemAsyncThunk(id))
    await dispatch(getAllCartItemAsyncThunk())
  }

  return (
    <div>
      <IconButton color="error" aria-label="Delete" size="large" onClick={handleOpen}>
        <CloseIcon fontSize="inherit" />
      </IconButton>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" align="center">
            Are you sure you want to delete?
          </Typography>
          <Stack spacing={2} direction="row" style={{ justifyContent: 'center', marginTop: '1rem' }}>
            <Button variant="contained" onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  )
}

export default ModalDelete
