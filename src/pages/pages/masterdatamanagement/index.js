// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import Icon from '@mdi/react'
import { mdiDatabaseSettingsOutline } from '@mdi/js'
import { mdiCalendarRange } from '@mdi/js'
import { mdiBadgeAccountHorizontalOutline } from '@mdi/js'
import { mdiClipboardSearchOutline } from '@mdi/js'
import { mdiApplicationExport } from '@mdi/js'
import { useRouter } from 'next/router'
import { useTheme } from '@mui/material/styles'
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

const MainMenu = () => {
  const theme = useTheme()
  const router = useRouter()
  const currentPath = router.pathname

  return (
    <CardContent>
      <Grid container sx={{ mb: 10 }}>
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <Typography variant='h4' sx={{ fontWeight: 'bold' }}>
            Main Menu
          </Typography>
        </Grid>
      </Grid>

      {/* --------------------------------------Grid ใหญ่------------------------------------------ */}
      <Grid container spacing={12}>
        {/* -------------------------------------- Grid ลูกที่ 1---------------------------------------------------- */}
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent
              sx={{
                display: 'flex',
                textAlign: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                padding: theme => `${theme.spacing(9.75, 5, 9.25)} !important`
              }}
            >
              <Avatar
                sx={{
                  width: 70,
                  height: 70,
                  marginBottom: 2.25,
                  color: 'common.white',
                  background: `linear-gradient(${theme.palette.primary.main} 30%,${hexToRGBA(
                    theme.palette.primary.light,
                    1
                  )} 100%,${hexToRGBA(theme.palette.background.default, 0.05)})`

                  // backgroundColor: 'primary.main'
                }}
              >
                <Icon path={mdiDatabaseSettingsOutline} size={2} />
              </Avatar>

              <Typography variant='h6' sx={{ marginBottom: 2.75 }}>
                Master Data
              </Typography>
              <Typography variant='body2' sx={{ marginBottom: 6, mx: 15, minWidth: 200, width: '30%', height: 65 }}>
                Describe what this feature does, and how it benefits your customers.
              </Typography>
              <Button
                onClick={function () {
                  router.push(`${currentPath}/masterdatamenu`)
                }}
                variant='contained'
                sx={{
                  px: 8
                }}
              >
                MORE
              </Button>
            </CardContent>
          </Card>
        </Grid>
        {/* -------------------------------------- Grid ลูกที่ 2---------------------------------------------------- */}
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent
              sx={{
                display: 'flex',
                textAlign: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                padding: theme => `${theme.spacing(9.75, 5, 9.25)} !important`
              }}
            >
              <Avatar
                sx={{
                  width: 70,
                  height: 70,
                  marginBottom: 2.25,
                  color: 'common.white',
                  background: `linear-gradient(${theme.palette.primary.main} 30%,${hexToRGBA(
                    theme.palette.primary.light,
                    1
                  )} 100%,${hexToRGBA(theme.palette.background.default, 0.05)})`
                }}
              >
                <Icon path={mdiCalendarRange} size={2} />
              </Avatar>
              <Typography variant='h6' sx={{ marginBottom: 2.75 }}>
                Study Plan
              </Typography>
              <Typography variant='body2' sx={{ marginBottom: 6, mx: 15, minWidth: 200, width: '30%', height: 65 }}>
                Describe what this feature does, and how it benefits your customers.
              </Typography>
              <Button variant='contained' sx={{ px: 8 }}>
                MORE
              </Button>
            </CardContent>
          </Card>
        </Grid>
        {/* -------------------------------------- Grid ลูกที่ 3---------------------------------------------------- */}
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent
              sx={{
                display: 'flex',
                textAlign: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                padding: theme => `${theme.spacing(9.75, 5, 9.25)} !important`
              }}
            >
              <Avatar
                sx={{
                  width: 70,
                  height: 70,
                  marginBottom: 2.25,
                  color: 'common.white',
                  background: `linear-gradient(${theme.palette.primary.main} 30%,${hexToRGBA(
                    theme.palette.primary.light,
                    1
                  )} 100%,${hexToRGBA(theme.palette.background.default, 0.05)})`
                }}
              ></Avatar>
              <Typography variant='h6' sx={{ marginBottom: 2.75 }}>
                User
              </Typography>
              <Typography variant='body2' sx={{ marginBottom: 6, mx: 15, minWidth: 200, width: '30%', height: 65 }}>
                Describe what this feature does, and how it benefits your customers.
              </Typography>
              <Button variant='contained' sx={{ px: 8 }}>
                MORE
              </Button>
            </CardContent>
          </Card>
        </Grid>
        {/* -------------------------------------- Grid ลูกที่ 4---------------------------------------------------- */}
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent
              sx={{
                display: 'flex',
                textAlign: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                padding: theme => `${theme.spacing(9.75, 5, 9.25)} !important`
              }}
            >
              <Avatar
                sx={{
                  width: 70,
                  height: 70,
                  marginBottom: 2.25,
                  color: 'common.white',
                  background: `linear-gradient(${theme.palette.primary.main} 30%,${hexToRGBA(
                    theme.palette.primary.light,
                    1
                  )} 100%,${hexToRGBA(theme.palette.background.default, 0.05)})`
                }}
              >
                <Icon path={mdiBadgeAccountHorizontalOutline} size={2} />
              </Avatar>
              <Typography variant='h6' sx={{ marginBottom: 2.75 }}>
                Co-operation
              </Typography>
              <Typography variant='body2' sx={{ marginBottom: 6, mx: 15, minWidth: 200, width: '30%', height: 65 }}>
                Describe what this feature does, and how it benefits your customers.
              </Typography>
              <Button variant='contained' sx={{ px: 8 }}>
                MORE
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* -------------------------------------- Grid ลูกที่ 5---------------------------------------------------- */}
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent
              sx={{
                display: 'flex',
                textAlign: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                padding: theme => `${theme.spacing(9.75, 5, 9.25)} !important`
              }}
            >
              <Avatar
                sx={{
                  width: 70,
                  height: 70,
                  marginBottom: 2.25,
                  color: 'common.white',
                  background: `linear-gradient(${theme.palette.primary.main} 30%,${hexToRGBA(
                    theme.palette.primary.light,
                    1
                  )} 100%,${hexToRGBA(theme.palette.background.default, 0.05)})`
                }}
              >
                <Icon path={mdiClipboardSearchOutline} size={2} />
              </Avatar>
              <Typography variant='h6' sx={{ marginBottom: 2.75 }}>
                Overview
              </Typography>
              <Typography variant='body2' sx={{ marginBottom: 6, mx: 15, minWidth: 200, width: '30%', height: 65 }}>
                Describe what this feature does, and how it benefits your customers.
              </Typography>
              <Button variant='contained' sx={{ px: 8 }}>
                MORE
              </Button>
            </CardContent>
          </Card>
        </Grid>
        {/* -------------------------------------- Grid ลูกที่ 6---------------------------------------------------- */}
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent
              sx={{
                display: 'flex',
                textAlign: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                padding: theme => `${theme.spacing(9.75, 5, 9.25)} !important`
              }}
            >
              <Avatar
                sx={{
                  width: 70,
                  height: 70,
                  marginBottom: 2.25,
                  color: 'common.white',
                  background: `linear-gradient(${theme.palette.primary.main} 30%,${hexToRGBA(
                    theme.palette.primary.light,
                    1
                  )} 100%,${hexToRGBA(theme.palette.background.default, 0.05)})`
                }}
              >
                <Icon path={mdiApplicationExport} size={1.5} />
              </Avatar>
              <Typography variant='h6' sx={{ marginBottom: 2.75 }}>
                Etc
              </Typography>
              <Typography variant='body2' sx={{ marginBottom: 6, mx: 15, minWidth: 200, width: '30%', height: 65 }}>
                Describe what this feature does, and how it benefits your customers.
              </Typography>
              <Button variant='contained' sx={{ px: 8 }}>
                MORE
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default MainMenu
