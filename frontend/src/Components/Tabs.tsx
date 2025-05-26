import { FC, useState } from 'react'
import { TabContext } from '@mui/lab'
import { Box, Tab, Tabs, TabsOwnProps } from '@mui/material'
import logo from '../assets/react.svg'

interface RenderTabsProps {
  permission: 'admin' | 'designer' | 'user'
}

const RenderTabs: FC<RenderTabsProps> = ({ permission }) => {
  const [value, setValue] = useState<string>('home')
  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  console.log('Current tab value:', value)

  return (
    <TabContext value={value}>
      <Box sx={{ borderColor: 'divider' }}>
        <RenderTabHeaders value={value} onChange={handleChange} permission={permission} />
      </Box>
      <RenderTabPanels
        value={value}
        permission={permission}
      />
    </TabContext>
  )
}

type RenderTabHeadersProps = RenderTabPanelsProps & {
  onChange: TabsOwnProps['onChange']
}

const RenderTabHeaders: FC<RenderTabHeadersProps> = ({ value, onChange, permission }) => {
  const tabs = []
  tabs.push(
    <Tab label="Home" value="home" {...ariaProps} key="home" />
  )
  return (
    <Tabs value={value} onChange={onChange} aria-label="Table Tabs">
      {tabs}
    </Tabs>
  )
}


type RenderTabPanelsProps = RenderTabsProps & {
  value: string
}

const RenderTabPanels: FC<RenderTabPanelsProps> = ({ value, permission }) => {
  const tabPanels = []
  tabPanels.push(
    <TabPanel value={value} index="home" key="home" >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <img src={logo} alt="Logo" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: '600px',
          padding: '1%',
          height: '60%',
          width: '60%'
        }} />
      </div>
    </TabPanel >
  )
  return <>{tabPanels}</>
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: string;
  value: string;
}

const TabPanel: FC<TabPanelProps> = (props) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value != index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        padding: '1%',
        height: '80%'
      }}
      {...other}
    >
      {value == index && children}
    </div>
  )
}


function ariaProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

export default RenderTabs
