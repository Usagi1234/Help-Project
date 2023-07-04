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
  const queryCollegians = await fetch(`${process.env.NEXT_PUBLIC_API}frappe.help-api.getAllcollegians`)
  const queryInstructors = await fetch(`${process.env.NEXT_PUBLIC_API}frappe.help-api.getAllinstructors`)

  const resCollegians = await queryCollegians.json()
  const resInstructor = await queryInstructors.json()

  const WrapData = {
    collegians: resCollegians.message.Data,
    instructors: resInstructor.message.Data
  }

  return {
    props: { data: WrapData }
  }
}
