import { FC } from 'react'
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import RenderTable from './Table'
import { tableColumns } from '../types'
import fetchData from '../Api/fetchData'
import { useToken } from '../Hooks/Token'
import { useQuery, } from '@tanstack/react-query'
import Loader from './Loader'


const columnHelper = createColumnHelper<tableColumns>()

type ColumnHeaderTypes = 'user_id' | 'name' | 'surname' | 'company' | 'start_date' | 'end_date' | 'job_title' | 'actions'
const columnHeaders: ColumnHeaderTypes[] = ['user_id', 'name', 'surname', 'company', 'start_date', 'end_date', 'job_title', 'actions']

const columns = columnHeaders.map((key) => {
  return columnHelper.accessor(key, {
    header: key.toUpperCase().replace(new RegExp('_', 'g'), ' '),
    cell: (info) => info.getValue()
  })
})

type EmployeeTableProps = {
  actions: boolean
}

const EmployeeTable: FC<EmployeeTableProps> = ({ actions }) => {
  const token = useToken()

  const example_data: tableColumns[] = [{
    id: '',
    user_id: '',
    name: '',
    surname: '',
    company: '',
    start_date: '',
    end_date: '',
    job_title: '',
  }]

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['getEmployees', 'employees', token],
    queryFn: () => fetchData('employees', token, example_data),
  })

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    initialState: {
      columnVisibility: {
        id: false,
        actions: actions
      }
    }
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

export default EmployeeTable
