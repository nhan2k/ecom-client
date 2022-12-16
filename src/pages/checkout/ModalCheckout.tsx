import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { Stack } from '@mui/material'

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

interface IModalCheckout {
  handlePlaceOrder: any
  open: boolean
  handleOpen: any
  handleClose: any
}

const ModalCheckout: React.FC<IModalCheckout> = ({ handlePlaceOrder, open, handleOpen, handleClose }) => {
  return (
    <div>
      <Button variant="contained" onClick={handleOpen} sx={{ mt: 3, ml: 1 }}>
        Place order
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h3" component="h3">
            Are you sure checkout?
          </Typography>
          <Stack spacing={2} direction="row" style={{ justifyContent: 'center', marginTop: '1rem' }}>
            <Button variant="contained" onClick={handlePlaceOrder}>
              Yes
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              No
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  )
}

export default ModalCheckout
