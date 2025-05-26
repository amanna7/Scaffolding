import { ReactNode, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme, Box, Button, Paper } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import RenderTabs from './Tabs'

interface HomeProps {
  handleLogOut: () => void
  content: ReactNode
}

const Home: FC<HomeProps> = ({ handleLogOut, content }) => {
  const { t } = useTranslation()
  const theme = useTheme()

  return <Box
    component={Paper}
    elevation={10}
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'space-between',
      width: '60%',
      padding: '4%',
      borderRadius: '5%',
      height: '60%',
      backgroundColor: theme.palette.background.default,
      color: theme.palette.primary.main
    }}
    data-testid="home-component"
  >
    <Box display="flex" justifyContent="center" gap="2vw" width="100%" flexDirection="column">

    </Box>

    {content}

    <Button
      variant="contained"
      endIcon={<FontAwesomeIcon icon={faArrowRightFromBracket} />}
      sx={{ boxShadow: 10 }}
      fullWidth
      onClick={handleLogOut}
      data-testid="logout-button"
    >
      {t('home.logoutButton')}
    </Button>
  </Box>
}

interface CustomHomeProps {
  handleLogOut: () => void
}

const HomeAdmin: FC<CustomHomeProps> = ({ handleLogOut }) => {

  return <Home handleLogOut={handleLogOut} content={<RenderTabs permission='admin' />} />
}

const HomeDesigner: FC<CustomHomeProps> = ({ handleLogOut }) => {
  return <Home handleLogOut={handleLogOut} content={<RenderTabs permission='designer' />} />
}

const HomeNoPermissions: FC<CustomHomeProps> = ({ handleLogOut }) => {
  return <Home handleLogOut={handleLogOut} content={<RenderTabs permission='user' />} />
}

export { HomeAdmin, HomeDesigner, HomeNoPermissions }
