import Grid from '@mui/material/Grid'
import { Fragment } from 'react'
import HeaderCard from './HeaderCard'
import Path from './Path'
import Tabs from './TabsMenu'

const AcademicsPage = ({ data }) => {
  console.log(data)

  return (
    <Fragment>
      <Path name={'test name'} path={'test path'} />
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
  try {
    const queryAcademics = await fetch(`${process.env.NEXT_PUBLIC_API}frappe.API.MasterData.academic.getAllAcademics`)
    const resAcademics = await queryAcademics.json()
    if (!resAcademics) {
      return { notFound: true }
    } else {
      WrapData.push({ academics: resAcademics.message.Data })
    }
  } catch (err) {
    return { error: err }
  }
  try {
    const queryAcademicType = await fetch(
      `${process.env.NEXT_PUBLIC_API}frappe.API.MasterData.academic_type.getallacademictype`
    )
    const resAcademicType = await queryAcademicType.json()
    if (!resAcademicType) {
      return { notFound: true }
    } else {
      WrapData.push({ academictype: resAcademicType.message.Data })
    }
  } catch (err) {
    return { error: err }
  }
  try {
    const queryFaculty = await fetch(`${process.env.NEXT_PUBLIC_API}frappe.API.MasterData.faculty.getAllfacultys`)
    const resFaculty = await queryFaculty.json()
    if (!resFaculty) {
      return { notFound: true }
    } else {
      WrapData.push({ faculty: resFaculty.message.Data })
    }
  } catch (err) {
    return { error: err }
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
