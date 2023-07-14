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
  const tableName = 'Subjects'

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

  const DataExport = data?.map(val => ({
    Code: val.sj_code,
    SubjectNameTH: val.sj_name_th,
    SubjectNameEN: val.sj_name_en,
    SubjectGroup: val.sjg_name,
    Theory: val.sj_theory_credit,
    Action: val.sj_action_credit,
    Overtime: val.sj_ot_credit,
    Credit: val.sj_credit,
    Curriculum: val.cur_name_th,
    Year: val.release_year
  }))

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
          // console.log(error)
        })
        .finally(() => {
          setOpenConfirmDelete(false)
          router.replace(router.asPath)
        })
    } else {
      // console.log('not have any id to delete')
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
    { field: 'sjg_name', headerName: 'Subject Group', width: 120 },
    { field: 'sj_theory_credit', headerName: 'Theory', width: 120 },
    { field: 'sj_action_credit', headerName: 'Action', width: 100 },
    { field: 'sj_ot_credit', headerName: 'Overtime', width: 100 },
    { field: 'sj_credit', headerName: 'Credit', width: 100 },
    { field: 'cur_name_th', headerName: 'Curriculum', width: 140 },
    { field: 'release_year', headerName: 'Year', width: 100 }
  ]

  if (!data || data.length === 0) {
    return (
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Button variant='contained' sx={{ mr: 2 }} onClick={() => setOpenIns(true)}>
            + Subject
          </Button>
        </Box>
        <SubjectsDialog
          Dialogtype={'insert'}
          open={openIns}
          curriculums={curriculums}
          subjectGroups={subjectGroups}
          handleClose={setOpenIns}
        />
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
          <img
            src='https://cdn.dribbble.com/users/634336/screenshots/2246883/media/21b6eeac8c36a79c6b4b2a1930bd89a6.png'
            alt='Image'
          />
        </Box>
      </CardContent>
    ) // Display a message when rows are empty or undefined
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
          isEmpty={data?.length > 0 ? 0 : 1}
          fileName={tableName + '_' + Date().toLocaleString()}
          excelData={DataExport}
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
