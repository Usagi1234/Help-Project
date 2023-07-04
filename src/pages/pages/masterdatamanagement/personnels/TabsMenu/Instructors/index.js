import React, { useState } from 'react'
import CardContent from '@mui/material/CardContent'
import { DataGrid } from '@mui/x-data-grid'
import { Box, Button } from '@mui/material'
import ExportButton from 'src/custom-components/BtnExport'
import InsertDialog from 'src/custom-components/Dialog'

const columns = [
  {
    field: '',
    headerName: 'Edit',
    width: 100,
    renderCell: cellValues => (
      <Button
        variant='text'
        onClick={() => {
          console.log(cellValues.row)
        }}
      >
        ...
      </Button>
    )
  },
  { field: 'ist_fname_th', headerName: 'first name(TH)', width: 120 },
  { field: 'ist_lname_th', headerName: 'last name(TH)', width: 150 },
  { field: 'ist_fname_en', headerName: 'first name(EN)', width: 150 },
  { field: 'ist_lname_en', headerName: 'last name(EN)', width: 150 },
  { field: 'ist_email', headerName: 'email', width: 180 },
  { field: 'ist_tel', headerName: 'tel', width: 120 },
  { field: 'fi_name_th', headerName: 'faculty', width: 140 }
]

function InstructorsTab({ data }) {
  const [openInsDialog, setOpenInsDialog] = useState(false)

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
      {data.length > 0 && (
        <DataGrid
          rows={data}
          columns={columns}
          getRowId={row => row.ist_id}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } }
          }}
          pageSizeOptions={[10, 25, 50]}
        />
      )}
      <InsertDialog header={'Insert Form'} open={openInsDialog} handleClose={() => setOpenInsDialog(false)} />
    </CardContent>
  )
}

export default InstructorsTab