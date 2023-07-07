import React, { useEffect, useState } from 'react'
import CardContent from '@mui/material/CardContent'
import { DataGrid } from '@mui/x-data-grid'
import { Box, Button, Typography } from '@mui/material'
import ExportButton from 'src/custom-components/BtnExport'
import CollegianDialog from 'src/custom-components/Dialog/CollegiansDialog'
import ConfirmDeleteDialog from 'src/custom-components/Dialog/ConfirmDeleteDialog'
import axios from 'axios'
import { useRouter } from 'next/router'

function CollegiansTab({ data }) {
  const router = useRouter()
  const [openDialog, setOpenDialog] = useState(false)
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false)
  const [value, setValue] = useState('')
  const [dialogType, setDialogType] = useState('')
  const [dataRow, setDataRow] = useState('')

  // * หัวตาราง
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
            setDataRow(cellValues.row)
            setDialogType('edit')
            setOpenDialog(true)
          }}
        >
          ...
        </Button>
      )
    },
    { field: 'co_code', headerName: 'code', width: 120 },
    { field: 'co_fname_th', headerName: 'first name(TH)', width: 150 },
    { field: 'co_lname_th', headerName: 'last name(TH)', width: 150 },
    { field: 'co_fname_en', headerName: 'first name(EN)', width: 150 },
    { field: 'co_lname_en', headerName: 'last name(EN)', width: 150 },
    { field: 'co_email', headerName: 'email', width: 270 },
    { field: 'co_tel', headerName: 'tel', width: 120 },
    { field: 'cur_name_th', headerName: 'curriculum', width: 220 },
    { field: 'fi_name_th', headerName: 'faculty', width: 120 }
  ]

  // * ถ้าไม่มีข้อมูลให้แสดงข้อความ
  console.log(data)
  if (!data || data.length === 0) {
    return <p>No data available.</p> // Display a message when rows are empty or undefined
  }

  const handleDeleteSubmit = id => {
    axios
      .post('http://192.168.1.168:8000/api/method/frappe.help-api.delete', {
        table: 'tabcollegians',
        primary: id
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    router.replace(router.asPath)
    setOpenConfirmDelete(false)
  }

  return (
    <CardContent>
      <Box sx={{ mb: 2 }}>
        <Button
          variant='contained'
          sx={{ mr: 2 }}
          onClick={() => {
            setOpenDialog(true)
            setDialogType('insert')
          }}
        >
          + Collegian
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
      <CollegianDialog type={dialogType} open={openDialog} onClose={() => setOpenDialog(false)} row={dataRow} />
      <ConfirmDeleteDialog
        open={openConfirmDelete}
        value={value.co_fname_th + ' ' + value.co_lname_th}
        handleClose={() => {
          setOpenConfirmDelete(false)
          router.replace(router.asPath)
        }}
        handleDelete={() => handleDeleteSubmit(value.co_id)}
      />
    </CardContent>
  )
}

export default CollegiansTab
