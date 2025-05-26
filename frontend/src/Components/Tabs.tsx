import { FC, useState } from 'react'
import { TabContext } from '@mui/lab'
import { Box, Tab, Tabs, TabsOwnProps } from '@mui/material'
import logo from '../assets/react.svg'
import { useToken } from '../Hooks/Token'
import { LLMRequest, Message } from '../types'
import { askLLM } from '../Api/llm_agent'
import { AxiosResponse } from 'axios'

interface RenderTabsProps {
  permission: 'admin' | 'designer' | 'user'
}

const RenderTabs: FC<RenderTabsProps> = ({ permission }) => {
  const [value, setValue] = useState<string>('home')
  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  // console.log('Current tab value:', value)

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
        <img src={logo} alt="Logo" style={{ width: 80, marginBottom: 16 }} />
        <h2>Chat with LLM</h2>
        <LLMChatInterface />
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

const LLMChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const token = useToken()

  const handleSend = async () => {
    if (!input.trim()) return
    if (!token) return
    const userMessage: Message = { role: 'user', content: input }
    setMessages(previous => [...previous, userMessage])
    setInput('')

    // Simulate LLM response (replace with real API call)
    const assistantMessage: Message = await askLLM(
      token, input, messages
    )
    console.log('Assistant message:', assistantMessage)
    setTimeout(() => {
      setMessages(previous => [...previous, assistantMessage])
    }, 500)
  }


  return (
    <div style={{ width: '100%', maxWidth: 500 }}>
      <div style={{
        border: '1px solid #ccc',
        borderRadius: 8,
        padding: 12,
        height: 250,
        overflowY: 'auto',
        marginBottom: 8,
        background: '#fafafa'
      }}>
        {messages.length === 0 && <div style={{ color: '#888' }}>Start the conversation…</div>}
        {messages.map((msg, idx) => (
          <div key={idx} style={{
            textAlign: msg.role === 'user' ? 'right' : 'left',
            margin: '4px 0'
          }}>
            <span style={{
              display: 'inline-block',
              background: msg.role === 'user' ? '#1976d2' : '#eee',
              color: msg.role === 'user' ? '#fff' : '#222',
              borderRadius: 12,
              padding: '6px 12px',
              maxWidth: '80%',
              wordBreak: 'break-word'
            }}>
              {msg.content}
            </span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleSend() }}
          placeholder="Type your message…"
          style={{
            flex: 1,
            padding: 8,
            borderRadius: 6,
            border: '1px solid #ccc'
          }}
        />
        <button
          onClick={handleSend}
          style={{
            padding: '8px 16px',
            borderRadius: 6,
            border: 'none',
            background: '#1976d2',
            color: '#fff',
            cursor: 'pointer'
          }}
        >
          Send
        </button>
      </div>
    </div>
  )
}