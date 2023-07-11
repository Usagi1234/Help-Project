import React, { useEffect, useState } from 'react'
import CardContent from '@mui/material/CardContent'
import { DataGrid } from '@mui/x-data-grid'
import { Box, Button, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import ExportButton from 'src/custom-components/BtnExport'
import InstructorDialog from 'src/custom-components/Dialog/InstructorDialog'
import ConfirmDeleteDialog from 'src/custom-components/Dialog/ConfirmDeleteDialog'
import axios from 'axios'
import SubjectsDialog from 'src/custom-components/Dialog/SubjectDialog'

function SubjectsTab({ data, subjectGroups, curriculums }) {
  const router = useRouter()
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false)
  const [rows, setRows] = useState(data)
  const [openIns, setOpenIns] = useState(false)
  const [openUpd, setOpenUpd] = useState(false)
  const [getSubject, setGetSubject] = useState([])
  const [value, setValue] = useState('') // use when delete button is clicked
  const [deleteId, setDeleteId] = useState('')

  const [initialState, setInitialState] = useState({
    curriculum: '0'
  })

  const [dropDown, setDropDown] = useState({
    curriculum: curriculums
  })

  const handleChange = e => {
    setInitialState(pre => ({ ...pre, curriculum: e.target.value }))
  }

  useEffect(() => {
    setRows(data)
  }, [data])

  useEffect(() => {
    if (initialState.curriculum === '0') {
      setRows(data)
    } else {
      const FilterRows = rows.filter(row => row.cur_id === initialState.curriculum)
      setRows(FilterRows)
    }
  }, [initialState])

  const handleDelete = () => {
    if (deleteId !== '') {
      axios
        .put(`${process.env.NEXT_PUBLIC_API}.MasterData.delete_data.delete`, {
          table: 'tabsubjects',
          primary: deleteId
        })
        .then(function (response) {
          // console.log(response.message)
        })
        .catch(function (error) {
          console.log(error)
        })
        .finally(() => {
          setOpenConfirmDelete(false)
          router.replace(router.asPath)
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
            setDeleteId(cellValues.row.sj_id)
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
            // console.log(cellValues.row)
            setGetSubject(cellValues.row)
            // setInstructor(cellValues.row)
            setOpenUpd(true)
          }}
        >
          ...
        </Button>
      )
    },
    {
      field: 'sj_code',
      headerName: 'code',
      width: 120
    },
    {
      field: 'sj_name_th',
      headerName: 'name(TH)',
      width: 120
    },
    { field: 'sjg_name', headerName: 'subject group', width: 120 },
    { field: 'sj_theory_credit', headerName: 'theory', width: 120 },
    { field: 'sj_action_credit', headerName: 'action', width: 100 },
    { field: 'sj_ot_credit', headerName: 'ot', width: 100 },
    { field: 'sj_credit', headerName: 'credit', width: 100 },
    { field: 'cur_name_th', headerName: 'curriculum', width: 140 },
    { field: 'release_year', headerName: 'year', width: 100 }
  ]

  console.log(data)
  if (!data || data.length === 0) {
    return <p>No data available.</p> // Display a message when rows are empty or undefined
  }

  return (
    <CardContent>
      <Box sx={{ mb: 2 }}>
        <Button variant='contained' sx={{ mr: 2 }} onClick={() => setOpenIns(true)}>
          + Subject
        </Button>
        <FormControl sx={{ width: 200 }}>
          <Select size='small' value={initialState.curriculum} onChange={handleChange}>
            <MenuItem value={'0'}>หลักสูตรทั้งหมด</MenuItem>
            {dropDown?.curriculum.map(curri => (
              <MenuItem key={curri.cur_id} value={String(curri.cur_id)}>
                {curri.cur_name_th}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <ExportButton
        // isEmpty={data?.length > 0 ? 0 : 1}
        // fileName={tableName + '_' + Date().toLocaleString()}
        // excelData={DataExport}
        />
      </Box>
      {data?.length > 0 && (
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10
              }
            }
          }}
          disableRowSelectionOnClick
          pageSizeOptions={[10, 25, 50]}
        />
      )}
      <SubjectsDialog
        Dialogtype={'insert'}
        open={openIns}
        curriculums={curriculums}
        subjectGroups={subjectGroups}
        handleClose={setOpenIns}
        // subject={getSubject}
      />

      <SubjectsDialog
        Dialogtype={'update'}
        open={openUpd}
        curriculums={curriculums}
        subjectGroups={subjectGroups}
        handleClose={setOpenUpd}
        subject={getSubject}
      />
      <ConfirmDeleteDialog
        open={openConfirmDelete}
        value={value.sj_code + ' ' + value.sj_name_th}
        handleClose={() => setOpenConfirmDelete(false)}
        handleDelete={handleDelete}
      />
    </CardContent>
  )
}

export default SubjectsTab
