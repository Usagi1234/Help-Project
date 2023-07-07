import React, { useEffect, useState } from 'react'
import CardContent from '@mui/material/CardContent'
import { DataGrid } from '@mui/x-data-grid'
import { Box, Button, Typography } from '@mui/material'
import ExportButton from 'src/custom-components/BtnExport'
import InstructorDialog from 'src/custom-components/Dialog/InstructorDialog'
import ConfirmDeleteDialog from 'src/custom-components/Dialog/ConfirmDeleteDialog'
// import { useRouter } from 'next/router'

function InstructorsTab({ data }) {
  // const router = useRouter()
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false)
  const [rows, setRows] = useState(data)
  const [instructor, setInstructor] = useState([])
  const [openInsDialog, setOpenInsDialog] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [value, setValue] = useState('') // use when delete button is clicked

  const handleClose = () => {
    setOpenConfirmDelete(false)
    // router.replace(router.asPath)
  }

  useEffect(() => {
    if (data !== undefined) setRows(data)
  }, [data])

  const columns = [
    {
      sortable: false,
      headerAlign: 'center',
      align: 'center',
      filterable: false,
      field: 'delete',
      headerName: 'Delete',
      width: 85,
      renderCell: cellValues => (
        <Button
          variant='contained'
          color='error'
          m={1}
          onClick={() => {
            setValue(cellValues.row)
            setOpenConfirmDelete(true)
          }}
        >
          <Typography variant='caption' color={'white'}>
            Delete
          </Typography>
        </Button>
      )
    },
    {
      sortable: false,
      headerAlign: 'center',
      align: 'center',
      filterable: false,
      field: 'edit',
      headerName: 'Edit',
      width: 100,
      renderCell: cellValues => (
        <Button
          variant='text'
          onClick={() => {
            setInstructor(cellValues.row)
            setOpenEditDialog(true)
          }}
        >
          ...
        </Button>
      )
    },
    {
      field: 'ist_fname_th',
      headerName: 'first name(TH)',
      width: 120
    },
    { field: 'ist_lname_th', headerName: 'last name(TH)', width: 150 },
    { field: 'ist_fname_en', headerName: 'first name(EN)', width: 150 },
    { field: 'ist_lname_en', headerName: 'last name(EN)', width: 150 },
    { field: 'ist_email', headerName: 'email', width: 180 },
    { field: 'ist_tel', headerName: 'tel', width: 120 },
    { field: 'fi_name_th', headerName: 'faculty', width: 140 }
  ]

  console.log(data)
  if (!data || data.length === 0) {
    return <p>No data available.</p> // Display a message when rows are empty or undefined
  }

  return (
    <CardContent>
      <Box sx={{ mb: 2 }}>
        <Button variant='contained' sx={{ mr: 2 }} onClick={() => setOpenInsDialog(true)}>
          + Instructor
        </Button>
        <ExportButton />
      </Box>
      {rows?.length > 0 && (
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10
              }
            }
          }}
          disableRowSelectionOnClick
          pageSizeOptions={[10, 25, 50]}
        />
      )}
      <InstructorDialog Dialogtype={'insert'} open={openInsDialog} handleClose={setOpenInsDialog} />
      <InstructorDialog
        instructor={instructor}
        Dialogtype={'edit'}
        open={openEditDialog}
        handleClose={setOpenEditDialog}
      />
      <ConfirmDeleteDialog
        open={openConfirmDelete}
        value={value.ist_fname_th + ' ' + value.ist_lname_th}
        handleClose={handleClose}
      />
    </CardContent>
  )
}

export default InstructorsTab
