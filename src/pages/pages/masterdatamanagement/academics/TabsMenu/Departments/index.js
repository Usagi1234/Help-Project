// ** React Import
import React, { useState } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Imports
import { Box, Button, Typography } from '@mui/material'
import CardContent from '@mui/material/CardContent'

// ** MUI X Import
import { DataGrid } from '@mui/x-data-grid'

// ** Axios Import
import axios from 'axios'

// File Imports
import ExportButton from 'src/custom-components/BtnExport'
import DepartmentsDialog from 'src/custom-components/Dialog/DepartmentsDialog'
import ConfirmDeleteDialog from 'src/custom-components/Dialog/ConfirmDeleteDialog'

function DepartmentsTab({ data }) {
  const [openInsDialog, setOpenInsDialog] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false)

  const [value, setValue] = useState('')
  const [deleteId, setDeleteId] = useState('') // set delete state

  const Route = useRouter()

  const [inRow, setInRow] = useState({
    dpm_id: data.dpm_id,
    dpm_name_th: data.dpm_name_th,
    dpm_name_en: data.dpm_name_en,
    faculty_institutes_fi_id: data.faculty_institutes_fi_id,
    fi_name_th: data.fi_name_th
  })

  console.log('in the row', inRow)

  if (!data || data.length === 0) {
    return <p>No data available.</p> // Display a message when rows are empty or undefined
  }

  const handleClose = () => {
    setOpenConfirmDelete(false)

    // router.replace(router.asPath)
  }

  const handleDelete = () => {
    if (deleteId !== '') {
      axios
        .put('http://111.223.38.19/api/method/frappe.API.MasterData.delete_data.delete', {
          table: 'tabdepartments',
          primary: deleteId
        })
        .then(function (response) {
          console.log(response.message)
        })
        .catch(function (error) {
          console.log(error)
        })
        .finally(() => {
          handleClose()
          Route.replace(Route.asPath)
        })
    } else {
      console.log('not have any id to delete')
    }
  }

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
            setDeleteId(cellValues.row.dpm_id)
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
            // console.log(cellValues.row)
            setOpenEditDialog(true)
            setInRow(cellValues.row)
          }}
        >
          ...
        </Button>
      )
    },
    { field: 'dpm_name_th', headerName: 'name(TH)', width: 120 },
    { field: 'dpm_name_en', headerName: 'name(EN)', width: 220 },
    { field: 'fi_name_th', headerName: 'type(TH)', width: 220 },
    { field: 'fi_name_en', headerName: 'type(EN)', width: 220 }
  ]

  return (
    <CardContent>
      <Box sx={{ mb: 2 }}>
        <Button variant='contained' sx={{ mr: 2 }} onClick={() => setOpenInsDialog(true)}>
          + Departments
        </Button>
        <ExportButton />
      </Box>
      {data.length > 0 && (
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } }
          }}
          pageSizeOptions={[10, 25, 50]}
        />
      )}
      <DepartmentsDialog type={'insert'} open={openInsDialog} handleClose={() => setOpenInsDialog(false)} />
      <DepartmentsDialog
        type={'edit'}
        open={openEditDialog}
        DataInRow={inRow}
        handleClose={() => setOpenEditDialog(false)}
      />
      <ConfirmDeleteDialog
        open={openConfirmDelete}
        value={value.dpm_name_th + ' ' + value.dpm_name_th}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
    </CardContent>
  )
}

export default DepartmentsTab
