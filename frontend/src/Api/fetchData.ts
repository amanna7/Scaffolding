import axiosClient from './axios'
import { createApiHeaders } from '../Utils/f'
import { tableColumns } from '../types'


async function fetchData(tableName: string, token: string | undefined, example_data: tableColumns[]): Promise<tableColumns[]> {
  if (!token) return example_data
  console.log('fetching data')
  const response = await axiosClient.get(`/${tableName}/`, createApiHeaders(token))
  return response.data
}

export default fetchData
