import React, { useEffect, useState } from 'react'
import CardContent from '@mui/material/CardContent'
import { DataGrid } from '@mui/x-data-grid'
import { Box, Button } from '@mui/material'
import ExportButton from 'src/custom-components/BtnExport'
import InsertDialog from 'src/custom-components/Dialog/FacultyInsert'

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
  { field: 'fi_name_th', headerName: 'name(TH)', width: 120 },
  { field: 'fi_name_en', headerName: 'name(EN)', width: 220 },
  { field: 'ac_name_th', headerName: 'type(TH)', width: 220 },
  { field: 'ac_name_en', headerName: 'type(EN)', width: 220 }
]

function FacultyTab({ data }) {
  const [openInsDialog, setOpenInsDialog] = useState(false)

  console.log(data)
  if (!data || data.length === 0) {
    return <p>No data available.</p> // Display a message when rows are empty or undefined
  }

  return (
    <CardContent>
      <Box sx={{ mb: 2 }}>
        <Button variant='contained' sx={{ mr: 2 }} onClick={() => setOpenInsDialog(true)}>
          + Faculty
        </Button>
        <ExportButton />
      </Box>
      {data.length > 0 && (
        <DataGrid
          rows={data}
          columns={columns}
          getRowId={row => row.fi_id}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } }
          }}
          pageSizeOptions={[10, 25, 50]}
        />
      )}
      <InsertDialog
        type={'insert'}
        open={openInsDialog}
        handleClose={() => setOpenInsDialog(false)}
        handleSubmit={console.log('Submit!')}
      />
    </CardContent>
  )
}

export default FacultyTab
