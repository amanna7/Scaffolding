import { Cell } from '@tanstack/react-table'
import { tableColumns } from '../types'
import axiosClient from '../Api/axios'
import { createApiHeaders } from '../Utils/f'
import { useToken } from '../Hooks/Token'
import { FC } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'


interface DeleteButtonProps {
  cell: Cell<tableColumns, unknown>
}

const DeleteButton: FC<DeleteButtonProps> = ({ cell }) => {
  const queryClient = useQueryClient()
  const token = useToken()
  const employee_id = cell.row.original['id']
  const mutation = useMutation({
    mutationFn: () => {
      return handleDelete(employee_id, token)
    },
    onSuccess: () => {
      queryClient.setQueryData(['getEmployees', 'employees', token], (data: tableColumns[]) => data.filter((item) => (item.id != employee_id)))
    }
  })
  return (
    <button className='delete_button' id={`delete_button_${cell.row.index}`} onClick={() => mutation.mutate()}>
      Delete
    </button>
  )
}


const handleDelete = async (employee_id: string, token: string | undefined) => {
  if (!token) return
  console.log('Deleting employee with id: ', employee_id)
  return await axiosClient.delete(`/employees/${employee_id}`, createApiHeaders(token))
}

export default DeleteButton
