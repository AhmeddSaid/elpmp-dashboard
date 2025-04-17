import {ColumnDef} from '@tanstack/react-table'
import {Badge} from '@/components/ui/badge'
import {labels} from '../data/data'
import {Task} from '../data/schema'
import {DataTableColumnHeader} from './data-table-column-header'
import {formatDate} from "@/lib/utils";

export const columns: ColumnDef<Task>[] = [
    // {
    //   id: 'select',
    //   header: ({ table }) => (
    //     <Checkbox
    //       checked={
    //         table.getIsAllPageRowsSelected() ||
    //         (table.getIsSomePageRowsSelected() && 'indeterminate')
    //       }
    //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //       aria-label='Select all'
    //       className='translate-y-[2px]'
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       onCheckedChange={(value) => row.toggleSelected(!!value)}
    //       aria-label='Select row'
    //       className='translate-y-[2px]'
    //     />
    //   ),
    //   enableSorting: false,
    //   enableHiding: false,
    // },
    // {
    //   accessorKey: 'id',
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title='Task' />
    //   ),
    //   cell: ({ row }) => <div className='w-[80px]'>{row.getValue('id')}</div>,
    //   enableSorting: false,
    //   enableHiding: false,
    // },
    {
        accessorKey: 'nameEn',
        header: ({column}) => (
            <DataTableColumnHeader column={column} title='Name EN'/>
        ),
        cell: ({row}) => {
            const label = labels.find((label) => label.value === row.original.label)

            return (
                <div className='flex space-x-2'>
                    {label && <Badge variant='outline'>{label.label}</Badge>}
                    <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('nameEn')}
          </span>
                </div>
            )
        },
    }, {
        accessorKey: 'nameAr',
        header: ({column}) => (
            <DataTableColumnHeader column={column} title='Name AR'/>
        ),
        cell: ({row}) => {
            const label = labels.find((label) => label.value === row.original.label)

            return (
                <div className='flex space-x-2'>
                    {label && <Badge variant='outline'>{label.label}</Badge>}
                    <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('nameAr')}
          </span>
                </div>
            )
        },
    }, {
        accessorKey: 'createdAt',
        header: ({column}) => (
            <DataTableColumnHeader column={column} title='Created At'/>
        ),
        cell: ({row}) => {
            const label = labels.find((label) => label.value === row.original.label)

            return (
                <div className='flex space-x-2'>
                    {label && <Badge variant='outline'>{label.label}</Badge>}
                    <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {formatDate(row.getValue('createdAt'))}
          </span>
                </div>
            )
        },
    }, {
        accessorKey: 'updateAt',
        header: ({column}) => (
            <DataTableColumnHeader column={column} title='Update At'/>
        ),
        cell: ({row}) => {
            const label = labels.find((label) => label.value === row.original.label)

            return (
                <div className='flex space-x-2'>
                    {label && <Badge variant='outline'>{label.label}</Badge>}
                    <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {formatDate(row.getValue('updateAt'))}
          </span>
                </div>
            )
        },
    }, {
        accessorKey: 'examsCount',
        header: ({column}) => (
            <DataTableColumnHeader column={column} title='Exams Count'/>
        ),
        cell: ({row}) => {
            const label = labels.find((label) => label.value === row.original.label)

            return (
                <div className='flex space-x-2'>
                    {label && <Badge variant='outline'>{label.label}</Badge>}
                    <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('examsCount')}
          </span>
                </div>
            )
        },
    }, {
        accessorKey: 'questionsCount',
        header: ({column}) => (
            <DataTableColumnHeader column={column} title='Questions Count'/>
        ),
        cell: ({row}) => {
            const label = labels.find((label) => label.value === row.original.label)

            return (
                <div className='flex space-x-2'>
                    {label && <Badge variant='outline'>{label.label}</Badge>}
                    <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('questionsCount')}
          </span>
                </div>
            )
        },
    },
    {
        accessorKey: 'isDeleted',
        header: ({column}) => (
            <DataTableColumnHeader column={column} title='Status'/>
        ),
        cell: ({row}) => {
            const label = labels.find((label) => label.value === row.original.label)

            return (
                <div className='flex space-x-2'>
                    {label && <Badge variant='outline'>{label.label}</Badge>}
                    <span className='max-w-32  truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('isDeleted') ? <>  <Badge variant="destructive">
                Deleted
            </Badge>  </> : <Badge variant="default">
                Active
            </Badge>}
          </span>
                </div>
            )
        },
    }
    // {
    //   accessorKey: 'status',
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title='Status' />
    //   ),
    //   cell: ({ row }) => {
    //     const status = statuses.find(
    //       (status) => status.value === row.getValue('status')
    //     )
    //
    //     if (!status) {
    //       return null
    //     }
    //
    //     return (
    //       <div className='flex w-[100px] items-center'>
    //         {status.icon && (
    //           <status.icon className='mr-2 h-4 w-4 text-muted-foreground' />
    //         )}
    //         <span>{status.label}</span>
    //       </div>
    //     )
    //   },
    //   filterFn: (row, id, value) => {
    //     return value.includes(row.getValue(id))
    //   },
    // },
    // {
    //   accessorKey: 'priority',
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title='Priority' />
    //   ),
    //   cell: ({ row }) => {
    //     const priority = priorities.find(
    //       (priority) => priority.value === row.getValue('priority')
    //     )
    //
    //     if (!priority) {
    //       return null
    //     }
    //
    //     return (
    //       <div className='flex items-center'>
    //         {priority.icon && (
    //           <priority.icon className='mr-2 h-4 w-4 text-muted-foreground' />
    //         )}
    //         <span>{priority.label}</span>
    //       </div>
    //     )
    //   },
    //   filterFn: (row, id, value) => {
    //     return value.includes(row.getValue(id))
    //   },
    // },
    // {
    //   id: 'actions',
    //   cell: ({ row }) => <DataTableRowActions row={row} />,
    // },
]
