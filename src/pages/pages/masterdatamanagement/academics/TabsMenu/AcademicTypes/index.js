import React, { useEffect, useState } from 'react'
import CardContent from '@mui/material/CardContent'
import { DataGrid } from '@mui/x-data-grid'
import { Box, Button } from '@mui/material'
import InsertDialog from '../../../../../../custom-components/Dialog'
import ExportButton from 'src/custom-components/BtnExport'

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
  { field: 'ac_type_name_th', headerName: 'name(TH)', width: 220 },
  { field: 'ac_type_name_en', headerName: 'name(EN)', width: 220 },
  { field: 'ac_area', headerName: 'area', width: 150 }
]

function AcademicTypeTab({ data }) {
  const [openInsDialog, setOpenInsDialog] = useState(false)

  console.log(data)
  if (!data || data.length === 0) {
    return <p>No data available.</p> // Display a message when rows are empty or undefined
  }

  return (
    <CardContent>
      <Box sx={{ mb: 2 }}>
        <Button variant='contained' sx={{ mr: 2 }} onClick={() => setOpenInsDialog(true)}>
          + Academic Type
        </Button>
        <ExportButton />
      </Box>
      {data.length > 0 && (
        <DataGrid
          rows={data}
          columns={columns}
          getRowId={row => row.ac_type_id}
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

export default AcademicTypeTab