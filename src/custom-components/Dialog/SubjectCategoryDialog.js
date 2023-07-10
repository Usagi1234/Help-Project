import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

const SubjectCategoryDialog = ({ open, handleClose, header }) => {
  return (
    <Dialog fullWidth maxWidth={'md'} open={open} onClose={handleClose} sx={{ minWidth: 400 }}>
      <DialogTitle>{header}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {/* //////////////////////////////////////////////////////////////////////////////// */}
          <Card>
            <CardHeader title='Add New Subject Catagoty' titleTypographyProps={{ variant: 'h6' }} />
            <Divider sx={{ margin: 0 }} />
            <form onSubmit={e => e.preventDefault()}>
              <CardContent>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={8}>
                    <TextField fullWidth label='Category Name *' placeholder='Subject Type Name' />
                  </Grid>
                </Grid>
              </CardContent>
              <Divider sx={{ margin: 0 }} />
            </form>
          </Card>
          {/* /////////////////////////////////////////////////////////////////////////// */}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant='contained' onClick={handleClose}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SubjectCategoryDialog
