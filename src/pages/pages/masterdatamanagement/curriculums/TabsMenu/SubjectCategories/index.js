import React, { useState } from 'react'
import { Box, Button, CardContent } from '@mui/material'
import ExportButton from 'src/custom-components/BtnExport'
import { DataGrid } from '@mui/x-data-grid'
import SubjectCategoryDialog from 'src/custom-components/Dialog/SubjectCategoryDialog'
import ConfirmDeleteDialogCsc from 'src/custom-components/Dialog/DeleteDialogSubject_Cate/ConfirmDeleteDalogCsc'
import axios from 'axios'
import { useRouter } from 'next/router'

function SubjectCategoriesTab({ data }) {
  const router = useRouter()
  const [openInsDialogCsc, setOpenInsDialogCsc] = useState(false)
  const [openEditDialogCsc, setOpenEditDialogCsc] = useState(false)
  const [openDelDialogCsc, setOpenDelDialogCsc] = useState(false)
  const [rowData, setRowData] = useState('')
  const [value, setValue] = useState('')
  const tableName = 'Subject Category'

  // console.log(data)
  if (!data || data.length === 0) {
    return <p>No data available.</p> // Display a message when rows are empty or undefined
  }

  const DataExport = data?.map(val => ({
    SubjectCategory: val.subject_category_name
  }))

  const columns = [
    {
      sortable: false,
      headerAlign: 'center',
      align: 'center',
      filterable: false,
      field: 'Delete',
      headerName: 'Delete',
      width: 100,
      renderCell: cellValues => (
        <Button
          variant='contained'
          color='error'
          m={1}
          onClick={() => {
            setValue(cellValues.row)
            setOpenDelDialogCsc(true)
            // console.log(cellValues.row)
          }}
        >
          Del
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
            setRowData(cellValues.row)
            setOpenEditDialogCsc(true)
            // console.log(cellValues.row)
          }}
        >
          ...
        </Button>
      )
    },
    { field: 'subject_category_name', headerName: 'Category Name', width: 200 }
  ]

  const HandleDelCsc = id => {
    axios
      .put('http://111.223.38.19/api/method/frappe.API.MasterData.delete_data.delete', {
        table: 'tabsubject_category',
        primary: id
      })
      .then(res => {
        // console.log(res)
      })
    router.replace(router.asPath)
    setOpenDelDialogCsc(false)
  }

  return (
    <CardContent>
      <Box sx={{ mb: 2 }}>
        <Button variant='contained' sx={{ mr: 2 }} onClick={() => setOpenInsDialogCsc(true)}>
          + SubjectCategory
        </Button>
        <ExportButton
          isEmpty={data?.length > 0 ? 0 : 1}
          fileName={tableName + '_' + Date().toLocaleString()}
          excelData={DataExport}
        />
      </Box>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } }
        }}
        pageSizeOptions={[10, 25, 50]}
      />
      <SubjectCategoryDialog
        header={'Insert Form'}
        open={openInsDialogCsc}
        handleClose={() => setOpenInsDialogCsc(false)}
        rowData={rowData}
        type='insert'
      />
      <SubjectCategoryDialog
        header={'Edit Form'}
        open={openEditDialogCsc}
        handleClose={() => setOpenEditDialogCsc(false)}
        rowData={rowData}
        type='edit'
      />
      <ConfirmDeleteDialogCsc
        header={'Delete Form'}
        open={openDelDialogCsc}
        value={value.subject_category_name}
        handleClose={() => setOpenDelDialogCsc(false)}
        handleDelete={() => HandleDelCsc(value.subject_category_id)}
      />
    </CardContent>
  )
}

export default SubjectCategoriesTab
