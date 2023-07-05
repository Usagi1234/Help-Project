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
  const WrapData = []
  try {
    const queryCollegians = await fetch(`${process.env.NEXT_PUBLIC_API}frappe.help-api.getAllcollegians`)
    const resCollegians = await queryCollegians.json()
    if (!resCollegians) {
      return { notFound: true }
    } else {
      WrapData.push({ collegians: resCollegians.message.Data })
    }
  } catch (err) {
    return { error: err }
  }

  try {
    const queryInstructors = await fetch(`${process.env.NEXT_PUBLIC_API}frappe.help-api.getAllinstructors`)
    const resInstructor = await queryInstructors.json()
    if (!resInstructor) {
      return { notFound: true }
    } else {
      WrapData.push({ instructors: resInstructor.message.Data })
    }
  } catch (err) {
    return { error: err }
  }

  // const WrapData = {
  //   collegians: resCollegians.message.Data,
  //   instructors: resInstructor.message.Data
  // }

  return {
    props: { data: WrapData }
  }
}
