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
import FacultyDialog from 'src/custom-components/Dialog/FacultyDialog'
import ConfirmDeleteDialog from 'src/custom-components/Dialog/ConfirmDeleteDialog'

function FacultyTab({ data }) {
  const [openInsDialog, setOpenInsDialog] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false)
  const tableName = 'Faculty'
  const [value, setValue] = useState('')
  const [deleteId, setDeleteId] = useState('') // set delete state

  const Route = useRouter()

  const [inRow, setInRow] = useState({
    fi_id: data.fi_id,
    fi_name_th: data.fi_name_th,
    fi_name_en: data.fi_name_en,
    ac_id: data.ac_id,
    ac_name_th: data.ac_name_th
  })

  // console.log('in the row', inRow)

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
        .post(`http://192.168.1.168:8000/api/method/frappe.help-api.delete`, {
          table: 'tabfaculty_institutes',
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
            setDeleteId(cellValues.row.fi_id)
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
    { field: 'fi_name_th', headerName: 'name(TH)', width: 120 },
    { field: 'fi_name_en', headerName: 'name(EN)', width: 220 },
    { field: 'ac_name_th', headerName: 'type(TH)', width: 220 },
    { field: 'ac_name_en', headerName: 'type(EN)', width: 220 }
  ]

  const DataExport = data?.map(val => ({
    FacultyNameTH: val.fi_name_th,
    FacultyNameEN: val.fi_name_en,
    AcademicTypeTH: val.ac_name_th,
    AcademicTypeEN: val.ac_name_en
  }))

  return (
    <CardContent>
      <Box sx={{ mb: 2 }}>
        <Button variant='contained' sx={{ mr: 2 }} onClick={() => setOpenInsDialog(true)}>
          + Faculty
        </Button>
        <ExportButton
          isEmpty={data?.length > 0 ? 0 : 1}
          fileName={tableName + '_' + Date().toLocaleString()}
          excelData={DataExport}
        />
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
      <FacultyDialog type={'insert'} open={openInsDialog} handleClose={() => setOpenInsDialog(false)} />
      <FacultyDialog
        type={'edit'}
        open={openEditDialog}
        DataInRow={inRow}
        handleClose={() => setOpenEditDialog(false)}
      />
      <ConfirmDeleteDialog
        open={openConfirmDelete}
        value={value.fi_name_th + ' ' + value.fi_name_th}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
    </CardContent>
  )
}

export default FacultyTab
