import Grid from '@mui/material/Grid'
import { Fragment } from 'react'
import HeaderCard from './HeaderCard'
import Path from './Path'
import Tabs from '../personnels/TabsMenu'

const PersonnelsPage = ({ data }) => {
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

export default PersonnelsPage

export async function getServerSideProps(context) {
  const queryAcademics = await fetch(`${process.env.NEXT_PUBLIC_API}frappe.help-api.getAllAcademics`)
  const queryAcademicType = await fetch(`${process.env.NEXT_PUBLIC_API}frappe.help-api.getallacademictype`)
  const queryFaculty = await fetch(`${process.env.NEXT_PUBLIC_API}frappe.help-api.getAllfacultys`)

  const resAcademics = await queryAcademics.json()
  const resAcademicType = await queryAcademicType.json()
  const resFaculty = await queryFaculty.json()

  const WrapData = {
    academics: resAcademics.message.Data,
    academictype: resAcademicType.message.Data,
    faculty: resFaculty.message.Data
  }

  return {
    props: { data: WrapData }
  }
}
