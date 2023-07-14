import Grid from '@mui/material/Grid'
import { Fragment } from 'react'
import HeaderCard from './HeaderCard'
import Tabs from './TabsMenu'

const AcademicsPage = ({ data }) => {
  console.log(data)

  return (
    <Fragment>
      <Grid container direction={'row'} item xs={12} spacing={2}>
        <Grid item xs={12}>
          <HeaderCard />
          <Tabs data={data} />
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default AcademicsPage

export async function getServerSideProps(context) {
  const WrapData = []

  // ? API academics
  try {
    const queryAcademics = await fetch(`${process.env.NEXT_PUBLIC_API}.MasterData.academic.getAllAcademics`)
    const resAcademics = await queryAcademics.json()
    if (!resAcademics) {
      WrapData.push({ academics: [] })
    } else {
      const newRow = resAcademics.message.Data.map((row, index) => ({
        ...row,
        id: index + 1 // กำหนด id ใหม่โดยใช้ index + 1 เป็นค่า
      }))
      WrapData.push({ academics: newRow })
    }
  } catch (err) {
    WrapData.push({ academics: [] })
  }

  // ? API academicType
  try {
    const queryAcademicType = await fetch(`${process.env.NEXT_PUBLIC_API}.MasterData.academic_type.getallacademictype`)
    const resAcademicType = await queryAcademicType.json()
    if (!resAcademicType) {
      WrapData.push({ academicType: [] })
    } else {
      const newRow = resAcademicType.message.Data.map((row, index) => ({
        ...row,
        id: index + 1 // กำหนด id ใหม่โดยใช้ index + 1 เป็นค่า
      }))
      WrapData.push({ academicType: newRow })
    }
  } catch (err) {
    WrapData.push({ academicType: [] })
  }

  // ? API faculty
  try {
    const queryFaculty = await fetch(`${process.env.NEXT_PUBLIC_API}.MasterData.faculty.getAllfacultys`)
    const resFaculty = await queryFaculty.json()
    if (!resFaculty) {
      WrapData.push({ faculty: [] })
    } else {
      const newRow = resFaculty.message.Data.map((row, index) => ({
        ...row,
        id: index + 1 // กำหนด id ใหม่โดยใช้ index + 1 เป็นค่า
      }))
      WrapData.push({ faculty: newRow })
    }
  } catch (err) {
    WrapData.push({ faculty: [] })
  }

  // ? API departments
  try {
    const queryDepartments = await fetch(`${process.env.NEXT_PUBLIC_API}.MasterData.department.getAllDepartments`)
    const resDepartments = await queryDepartments.json()
    if (!resDepartments) {
      WrapData.push({ departments: [] })
    } else {
      const newRow = resDepartments.message.Data.map((row, index) => ({
        ...row,
        id: index + 1 // กำหนด id ใหม่โดยใช้ index + 1 เป็นค่า
      }))
      WrapData.push({ departments: newRow })
    }
  } catch (err) {
    WrapData.push({ departments: [] })
  }

  // const WrapData = {
  //   academics: resAcademics.message.Data,
  //   academictype: resAcademicType.message.Data,
  //   faculty: resFaculty.message.Data
  // }

  return {
    props: { data: WrapData }
  }
}
