import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

// ? Import Mui
import { DataGrid } from '@mui/x-data-grid'
import { Box, Button, Typography, CardContent } from '@mui/material'

// ? Import Component
import ExportButton from 'src/custom-components/BtnExport'
import SubjectGroupDialog from 'src/custom-components/Dialog/SubjectGroupDialog'
import ConfirmDeleteDialog from 'src/custom-components/Dialog/DeleteDialogAc_Type/ConfirmDeleteDalog '

function SubjectGroupsTab({ data, dataDropdown }) {
  const router = useRouter()
  const [openDialog, setOpenDialog] = useState(false)
  const [openDialogDel, setOpenDialogDel] = useState(false)
  const [dataRowDel, setDataRowDel] = useState('')
  const [dialogType, setDialogType] = useState('')
  const [dataRow, setDataRow] = useState('')
  const tableName = 'Subject Groups'

  // console.log('data: ', data)

  const handleDeleteRow = () => {
    axios
      .put('http://111.223.38.19/api/method/frappe.API.MasterData.delete_data.delete', {
        table: 'tabsubject_groups',
        primary: dataRowDel.sjg_id
      })
      .then(response => {
        // console.log(response)
      })
      .catch(error => {
        // console.log(error)
      })
    router.replace(router.asPath)
    setOpenDialogDel(false)
  }

  const DataExport = data?.map(val => ({
    SubjectCategory: val.subject_category_name,
    SubjectType: val.subject_type_name,
    GroupName: val.sjg_name
  }))

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
            // console.log(cellValues.row)
            setOpenDialogDel(true)
            setDataRowDel(cellValues.row)
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
    { field: 'subject_category_name', headerName: 'Subject Category', width: 200 },
    { field: 'subject_type_name', headerName: 'Subject Type', width: 200 },
    { field: 'sjg_name', headerName: 'Group Name', width: 200 }
  ]

  if (!data || data.length === 0) {
    return <CardContent>No data available.</CardContent> // Display a message when rows are empty or undefined
  }

  return (
    <CardContent>
      <Box sx={{ mb: 2 }}>
        <Button
          variant='contained'
          sx={{ mr: 2 }}
          onClick={() => {
            setDialogType('insert')
            setOpenDialog(true)
          }}
        >
          + Subject Groups
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
      <SubjectGroupDialog
        type={dialogType}
        row={dataRow}
        dropdown={dataDropdown}
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
      />
      <ConfirmDeleteDialog
        open={openDialogDel}
        handleClose={() => setOpenDialogDel(false)}
        value={dataRowDel.sjg_name}
        handleDelete={handleDeleteRow}
      />
    </CardContent>
  )
}

export default SubjectGroupsTab
