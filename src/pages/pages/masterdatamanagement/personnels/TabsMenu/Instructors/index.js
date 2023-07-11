import React, { useEffect, useState } from 'react'
import CardContent from '@mui/material/CardContent'
import { DataGrid } from '@mui/x-data-grid'
import { Box, Button, Typography } from '@mui/material'
import ExportButton from 'src/custom-components/BtnExport'
import InstructorDialog from 'src/custom-components/Dialog/InstructorDialog'
import ConfirmDeleteDialog from 'src/custom-components/Dialog/ConfirmDeleteDialog'
import axios from 'axios'
import { useRouter } from 'next/router'

function InstructorsTab({ data }) {
  const router = useRouter()
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false)
  const [rows, setRows] = useState(data)
  const [instructor, setInstructor] = useState([])
  const [openInsDialog, setOpenInsDialog] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [value, setValue] = useState('') // use when delete button is clicked
  const [deleteId, setDeleteId] = useState('')
  const tableName = 'Instructors'

  // console.log('Id', deleteId)

  const handleClose = () => {
    setOpenConfirmDelete(false)
  }

  const handleDelete = () => {
    if (deleteId !== '') {
      axios
        .post(`${process.env.NEXT_PUBLIC_API}.MasterData.delete_data.delete`, {
          table: 'tabinstrutors',
          primary: deleteId
        })
        .then(function (response) {
          // console.log(response.message)
        })
        .catch(function (error) {
          console.log(error)
        })
        .finally(() => {
          handleClose()
          router.replace(router.asPath)
        })
    } else {
      console.log('not have any id to delete')
    }
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
            setDeleteId(cellValues.row.ist_id)
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

  const DataExport = rows?.map(val => ({
    FirstNameTH: val.ist_fname_th,
    LastNameTH: val.ist_lname_th,
    FirstNameEN: val.ist_fname_en,
    LastNameEN: val.ist_lname_en,
    Tel: val.ist_tel,
    Email: val.ist_email,
    Faculty: val.fi_name_th
  }))

  // console.log(data)
  if (!data || data.length === 0) {
    return <p>No data available.</p> // Display a message when rows are empty or undefined
  }

  return (
    <CardContent>
      <Box sx={{ mb: 2 }}>
        <Button variant='contained' sx={{ mr: 2 }} onClick={() => setOpenInsDialog(true)}>
          + Instructor
        </Button>
        <ExportButton
          isEmpty={rows?.length > 0 ? 0 : 1}
          fileName={tableName + '_' + Date().toLocaleString()}
          excelData={DataExport}
        />
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
        handleDelete={handleDelete}
      />
    </CardContent>
  )
}

export default InstructorsTab
