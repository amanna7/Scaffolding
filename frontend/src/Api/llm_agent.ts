import { createApiHeaders } from '../Utils/f'
import axiosClient from './axios'
import { Message } from '../types'


export const askLLM = async (token: string, message: string, message_history: Message[]): Promise<Message> => {
  const response = await axiosClient.post(`/chat/`, { message, message_history }, { ...createApiHeaders(token), responseType: 'stream' })
  console.log('LLM response:', response.data)
  console.log("type data:", typeof response.data) // substitute with raw (see below)
  // const data = JSON.parse(response.data)
  // console.log('Parsed LLM response:', data)
  // console.log("type obj data: ", typeof data)

  const raw = '{"response":"Hi"}{"response":" there!"}{"response":"More text"}'; // Working example
  const regex = /{[^{}]*(".*?"\s*:\s*".*?"[^{}]*)*}/g;

  const matches = raw.match(regex);
  const messages = matches!.map(json => JSON.parse(json.trim())) // Valutare se serve il trim

  return { content: (messages.map((message) => message.response)).join(""), role: 'assistant' }
}
