import { FC } from 'react'
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import RenderTable from './Table'
import { tableColumns } from '../types'
import { useToken } from '../Hooks/Token'
import fetchData from '../Api/fetchData'
import { useQuery, } from '@tanstack/react-query'
import Loader from './Loader'


const columnHelper = createColumnHelper<tableColumns>()

type ColumnHeaderTypes = 'id' | 'name' | 'surname' | 'birthdate' | 'address'
const columnHeaders: ColumnHeaderTypes[] = ['id', 'name', 'surname', 'birthdate', 'address']

const columns = columnHeaders.map((key) => {
  return columnHelper.accessor(key, {
    header: key.toUpperCase().replace(new RegExp('_', 'g'), ' '),
    cell: (info) => info.getValue()
  })
})


const UserTable: FC = () => {
  const token = useToken()

  const example_data: tableColumns[] = [{
    id: '',
    name: '',
    surname: '',
    address: '',
    birthdate: '',
  }]

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['getUsers', 'users', token],
    queryFn: () => fetchData('users', token, example_data),
  })

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  if (isPending) {
    console.log('fetching data is pending')
    return <Loader />
  }

  if (isError) {
    console.error(`Error while fetching data: ${error.message}`)
    return <span>Error: {error.message}</span>
  }

  return <RenderTable table={table} />
}

export default UserTable
