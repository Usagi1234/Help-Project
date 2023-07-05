// ** MUI Imports
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import { mdiArrowRightCircle } from '@mdi/js'
import { styled } from '@mui/material/styles'

// ** Icons Imports
import Grid from '@mui/material/Grid'
import Icon from '@mdi/react'
import { mdiSchoolOutline } from '@mdi/js'
import { mdiAccountGroupOutline } from '@mdi/js'
import { mdiAccountTie } from '@mdi/js'
import { useRouter } from 'next/router'
import { useTheme } from '@mui/material/styles'
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

const MasterDataMenu = () => {
  const theme = useTheme()
  const router = useRouter()

  const ColorIcon = styled(Icon)(({ theme }) => ({
    color: theme.palette.primary.main
  }))

  return (
    <CardContent>
      {/* Grid ใหม่ที่ครอบทั้งสามบล็อก */}
      <Grid
        container
        spacing={6}
        sx={{
          display: 'flex',
          padding: theme => `${theme.spacing(10, 10, 9.25)} !important`
        }}
      >
        {/* Grid ใหม่ที่ครอบ */}
        <Grid item>
          <Box
            onClick={() => router.push(`/pages/masterdatamanagement/academics`)}
            sx={{ alignItems: 'center', '&:hover': { cursor: 'pointer' } }}
          >
            <Card
              sx={{
                display: 'flex',
                py: 6,
                px: 12,
                '&:hover': { background: 'rgba(0, 0, 0, 0.01)' }
              }}
            >
              {/* ส่วนตกแต่งของ Icom */}
              <Avatar
                sx={{
                  width: 50,
                  height: 50,
                  mr: 5,
                  ml: -5,
                  marginBottom: 2.25,
                  color: 'common.white',
                  background: `linear-gradient(${theme.palette.primary.main} 30%,${hexToRGBA(
                    theme.palette.primary.light,
                    1
                  )} 100%,${hexToRGBA(theme.palette.background.default, 0.05)})`
                }}
              >
                <Icon path={mdiSchoolOutline} size={1.5} />
              </Avatar>
              <Box>
                <Box sx={{ mb: 6 }}>
                  <Box sx={{ display: 'flex' }}>
                    <Typography variant='h6'>Academics</Typography>
                    <IconButton aria-label='delete' sx={{ margin: 'auto' }}>
                      <ColorIcon path={mdiArrowRightCircle} size={0.8} />
                    </IconButton>
                  </Box>
                  <Typography sx={{ lineHeight: 1 }} variant='body2'>
                    Last update
                  </Typography>
                  <Typography variant='body2'>on March 13th,2023</Typography>
                </Box>
                {/* <Box sx={{ textAlign: 'end', mt: 1 }}>
                  <Typography variant='h4'>4 Tables</Typography>
                  <Typography variant='body2'>295 recorfs</Typography>
                </Box> */}
              </Box>
            </Card>
          </Box>
        </Grid>
        {/* /////////////////////////////////////////////////////////////////////////////////// */}
        <Grid item>
          <Box
            onClick={() => router.push(`/pages/masterdatamanagement/curriculums`)}
            sx={{ alignItems: 'center', '&:hover': { cursor: 'pointer' } }}
          >
            <Card
              sx={{
                display: 'flex',
                py: 6,
                px: 12,
                '&:hover': { background: 'rgba(0, 0, 0, 0.01)' }
              }}
            >
              {/* ส่วนตกแต่งของ Icom */}
              <Avatar
                sx={{
                  width: 50,
                  height: 50,
                  mr: 5,
                  ml: -5,
                  marginBottom: 2.25,
                  color: 'common.white',
                  background: `linear-gradient(${theme.palette.primary.main} 30%,${hexToRGBA(
                    theme.palette.primary.light,
                    1
                  )} 100%,${hexToRGBA(theme.palette.background.default, 0.05)})`
                }}
              >
                <Icon path={mdiAccountGroupOutline} size={1.3} />
              </Avatar>
              <Box>
                <Box sx={{ mb: 6 }}>
                  <Box sx={{ display: 'flex' }}>
                    <Typography variant='h6'>Curriculums</Typography>
                    <IconButton aria-label='delete' sx={{ margin: 'auto' }}>
                      <ColorIcon path={mdiArrowRightCircle} size={0.8} />
                    </IconButton>
                  </Box>
                  <Typography sx={{ lineHeight: 1 }} variant='body2'>
                    Last update
                  </Typography>
                  <Typography variant='body2'>on March 13th,2023</Typography>
                </Box>
                {/* <Box sx={{ textAlign: 'end' }}>
                  <Typography variant='h4'>5 Tables</Typography>
                  <Typography variant='body2'>5821 records</Typography>
                </Box> */}
              </Box>
            </Card>
          </Box>
        </Grid>
        {/* /////////////////////////////////////////////////////////////////////////////////// */}
        <Grid item>
          <Box
            onClick={() => router.push(`/pages/masterdatamanagement/personnels`)}
            sx={{ alignItems: 'center', '&:hover': { cursor: 'pointer' } }}
          >
            <Card
              sx={{
                display: 'flex',
                py: 6,
                px: 12,
                '&:hover': { background: 'rgba(0, 0, 0, 0.01)' }
              }}
            >
              {/* ส่วนตกแต่งของ Icom */}
              <Avatar
                sx={{
                  width: 50,
                  height: 50,
                  mr: 5,
                  ml: -5,
                  marginBottom: 2.25,
                  color: 'common.white',
                  background: `linear-gradient(${theme.palette.primary.main} 30%,${hexToRGBA(
                    theme.palette.primary.light,
                    1
                  )} 100%,${hexToRGBA(theme.palette.background.default, 0.05)})`
                }}
              >
                <Icon path={mdiAccountTie} size={1.4} />
              </Avatar>
              <Box sx={{ mb: 6 }}>
                <Box>
                  <Box sx={{ display: 'flex' }}>
                    <Typography variant='h6'>Personels</Typography>
                    <IconButton aria-label='delete' sx={{ margin: 'auto' }}>
                      <ColorIcon path={mdiArrowRightCircle} size={0.8} />
                    </IconButton>
                  </Box>
                  <Typography sx={{ lineHeight: 1 }} variant='body2'>
                    Last update
                  </Typography>
                  <Typography variant='body2'>on March 13th,2023</Typography>
                </Box>
                {/* <Box sx={{ textAlign: 'end' }}>
                  <Typography variant='h4'>2 Tables</Typography>
                  <Typography variant='body2'>12871 recorfs</Typography>
                </Box> */}
              </Box>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default MasterDataMenu

// import { Box } from '@mui/material'
// import { useRouter } from 'next/router'
// import Typography from '@mui/material/Typography'
// import React from 'react'

// function MaterDataPage() {
//   const router = useRouter()
//   const currentPath = router.pathname

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//       <Typography
//         sx={{ cursor: 'pointer', '&:hover': { color: 'blue' } }}
//         onClick={() => router.push(`${currentPath}/academics`)}
//       >
//         Academics
//       </Typography>
//       <Typography
//         sx={{ cursor: 'pointer', '&:hover': { color: 'blue' } }}

//         // onClick={() => router.push(`${currentPath}/curriculums`)}
//       >
//         Curriculums
//       </Typography>
//       <Typography
//         sx={{ cursor: 'pointer', '&:hover': { color: 'blue' } }}
//         onClick={() => router.push(`${currentPath}/personnels`)}
//       >
//         Personnels
//       </Typography>
//     </Box>
//   )
// }

// export default MaterDataPage
