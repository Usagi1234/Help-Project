import React, { useEffect, useState } from 'react'
import CardContent from '@mui/material/CardContent'
import { DataGrid } from '@mui/x-data-grid'
import { Box, Button, Typography } from '@mui/material'
import ExportButton from 'src/custom-components/BtnExport'
import AcademicTypeDialog from 'src/custom-components/Dialog/AcademicTypeDialog'
import ConfirmDeleteDialog from '../../../../../../custom-components/Dialog/DeleteDialogAc_Type/ConfirmDeleteDalog '
import axios from 'axios'
import { useRouter } from 'next/router'

function AcademicTypeTab({ data }) {
  // console.log('data', data)
  const router = useRouter()
  const [openInsDialog, setOpenInsDialog] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [value, setValue] = useState('')
  const tableName = 'AcademicType'

  const [rowData, setRowdata] = useState('')

  const handleOnDelete = id => {
    axios
      .post('http://192.168.1.168:8000/api/method/frappe.help-api.delete', {
        table: 'tabacademic_types',
        primary: id
      })
      .then(res => {
        // console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    router.replace(router.asPath)
    setOpenDeleteDialog(false)
  }

  const columns = [
    {
      field: 'delete',
      headerAlign: 'center',
      align: 'center',
      filterable: false,
      headerName: 'Delete',
      width: 85,
      renderCell: cellValues => (
        <Button
          variant='contained'
          color='error'
          m={1}
          onClick={() => {
            setValue(cellValues.row)
            setOpenDeleteDialog(true)
            console.log(cellValues.id)
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
            setRowdata(cellValues.row)
            setOpenEditDialog(true)
            console.log(cellValues.row)
          }}
        >
          ...
        </Button>
      )
    },
    { field: 'ac_type_name_th', headerName: 'name(TH)', width: 220 },
    { field: 'ac_type_name_en', headerName: 'name(EN)', width: 220 },
    { field: 'ac_area', headerName: 'area', width: 150 }
  ]

  const DataExport = data?.map(val => ({
    AcademicTypeTH: val.ac_type_name_th,
    AcademicTypeEN: val.ac_type_name_en,
    Area: val.ac_area
  }))

  // console.log(data)
  if (!data || data.length === 0) {
    return <p>No data available.</p> // Display a message when rows are empty or undefined
  }

  return (
    <CardContent>
      <Box sx={{ mb: 2 }}>
        <Button variant='contained' sx={{ mr: 2 }} onClick={() => setOpenInsDialog(true)}>
          + Academic Type
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
          // getRowId={row => row.ac_type_id}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } }
          }}
          pageSizeOptions={[10, 25, 50]}
        />
      )}
      <AcademicTypeDialog
        type='insert'
        open={openInsDialog}
        handleClose={() => setOpenInsDialog(false)}
        // handleSubmit={console.log('Submit!')}
        rowData={rowData}
      />
      <AcademicTypeDialog
        type='edit'
        open={openEditDialog}
        handleClose={() => setOpenEditDialog(false)}
        // handleSubmit={console.log('Submit!')}
        rowData={rowData}
      />
      <ConfirmDeleteDialog
        value={value.ac_type_name_th + ' ' + value.ac_type_name_en}
        open={openDeleteDialog}
        handleClose={() => setOpenDeleteDialog(false)}
        handleDelete={() => handleOnDelete(value.ac_type_id)}
      />
    </CardContent>
  )
}

export default AcademicTypeTab
