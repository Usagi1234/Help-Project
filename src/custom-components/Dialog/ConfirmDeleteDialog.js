import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'
import Paper from '@mui/material/Paper'

function PaperComponent(props) {
  return <Paper {...props} />
}

function ConfirmDeleteDialog({
  open, // use for open state true = displayed , false = closed
  handleClose, // call when close button is clicked and when click background dialog
  value, // display row value in dialog
  handleDelete // call when delete button is clicked
}) {
  return (
    <div>
      <Dialog
        fullWidth
        maxWidth='sm'
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby='draggable-dialog-title'
      >
        <DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
          Delete Confirmation
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this {value}?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => handleClose()}>
            Cancel
          </Button>
          <Button variant='contained' color='error' onClick={() => handleDelete()}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ConfirmDeleteDialog
