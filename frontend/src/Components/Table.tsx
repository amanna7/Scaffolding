import { flexRender, Table, Cell } from '@tanstack/react-table'
import { tableHeaderColor, tableRowcolors } from '../Utils/config'
import { tableColumns } from '../types'
import { FC } from 'react'
import DeleteButton from './DeleteButton'

interface RenderTableProps {
  table: Table<tableColumns>
}
const RenderTable: FC<RenderTableProps> = ({ table }) => {
  return (
    <div
      style={{
        overflow: 'auto',
        width: '100%'
      }}
    >
      <div>
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{
                      position: 'sticky',
                      top: 0,
                      backgroundColor: tableHeaderColor,
                      zIndex: 1
                    }}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody style={{ overflow: 'auto', width: '100%' }}>
            {table.getRowModel().rows.map((row, index) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    style={{
                      backgroundColor: (index % 2 === 0) ? tableRowcolors[0] : tableRowcolors[1]
                    }}>
                    <RenderCell cell={cell} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div >
    </div>
  )
}

interface RenderCellProps {
  cell: Cell<tableColumns, unknown>
}
const RenderCell: FC<RenderCellProps> = ({ cell }) => {
  if (cell.id.includes('actions')) {
    console.log('Adding button to cell row', cell.row.index)
    return <div>
      <DeleteButton cell={cell} />
    </div>
  } else {
    return flexRender(cell.column.columnDef.cell, cell.getContext())
  }
}


export default RenderTable
