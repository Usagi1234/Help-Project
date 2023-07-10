import React, { useState } from 'react'
import CardContent from '@mui/material/CardContent'
import { DataGrid } from '@mui/x-data-grid'
import { Box, Button, Typography } from '@mui/material'
import ExportButton from 'src/custom-components/BtnExport'
import SubjectGroupDialog from 'src/custom-components/Dialog/SubjectGroupDialog'

function SubjectGroupsTab({ data, data1 }) {
  const [openDialog, setOpenDialog] = useState(false)
  const [dialogType, setDialogType] = useState('')
  const [dataRow, setDataRow] = useState({})

  const columns = [
    {
      sortable: false,
      headerAlign: 'center',
      align: 'center',
      filterable: false,
      field: 'delete',
      headerName: 'Delete',
      width: 85,
      renderCell: () => (
        <Button
          variant='contained'
          color='error'
          m={1}
          onClick={() => {
            console.log(cellValues.row)
          }}
        >
          <Typography variant='caption' color={'white'}>
            Delete
          </Typography>
        </Button>
      )
    },
    {
      field: '',
      headerName: 'Edit',
      width: 100,
      renderCell: () => (
        <Button
          variant='text'
          onClick={cellValues => {
            console.log(cellValues.row)
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
    return <p>No data available.</p> // Display a message when rows are empty or undefined
  }

  return (
    <CardContent>
      <Box sx={{ mb: 2 }}>
        <Button
          variant='contained'
          sx={{ mr: 2 }}
          onClick={() => {
            setDialogType('edit')
            setOpenDialog(true)
          }}
        >
          + Subject Groups
        </Button>
        <ExportButton />
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
        Dropdown={data1}
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
      />
    </CardContent>
  )
}

export default SubjectGroupsTab
