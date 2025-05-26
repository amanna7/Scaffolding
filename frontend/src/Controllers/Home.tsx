import { useEffect, useState, type FC } from 'react'
import { useKindeAuth } from '@kinde-oss/kinde-auth-react'
import { useTheme, CssBaseline, Box } from '@mui/material'
import { HomeAdmin, HomeDesigner, HomeNoPermissions } from '../Components/Home'
import ImageLayout from '../Components/ImageLayout'
import Loader from '../Components/Loader'
import * as ls from '../Utils/ls'
import { PermissionType } from '../types'


const Home: FC = () => {
  const theme = useTheme()
  const { logout, isLoading, getPermissions } = useKindeAuth()
  const [permission, setPermission] = useState<PermissionType>('user')

  useEffect(() => {
    // console.log('Checking permissions')
    if (getPermissions != undefined) {
      const permissions = getPermissions()
      // console.log('Permissions', permissions)
      if (permissions != undefined) {
        const permission_list = permissions['permissions']
        // console.log('Permission list ', permission_list)
        if (permission_list.includes('admin')) {
          setPermission('admin')
        } else if (permission_list.includes('designer')) {
          setPermission('designer')
        }
      }
    }
  }, [getPermissions])

  const handleLogOut = async () => {
    await logout()

    ls.del('YOUR_PROJECT')
  }

  if (isLoading) {
    return <Loader />
  }

  return <ImageLayout
    style={{
      backgroundColor: theme.palette.secondary.main,
      height: '100vh',
      width: '100vw',
      flexDirection: 'row'
    }}
  >
    <CssBaseline />
    <Box width='20%' />
    {(permission == 'admin')
      ? <HomeAdmin handleLogOut={handleLogOut} />
      : (permission == 'designer')
        ? <HomeDesigner handleLogOut={handleLogOut} />
        : <HomeNoPermissions handleLogOut={handleLogOut}
        />
    }
  </ImageLayout>
}

export default Home
