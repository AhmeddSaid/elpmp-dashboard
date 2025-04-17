import {ColumnDef} from '@tanstack/react-table'
import {Badge} from '@/components/ui/badge'
import {labels} from '../data/data'
import {Task} from '../data/schema'
import {DataTableColumnHeader} from './data-table-column-header'
import {DataTableRowActions} from './data-table-row-actions'

export const columns: ColumnDef<Task>[] = [

    {
        accessorKey: 'questionEn',
        header: ({column}) => (
            <DataTableColumnHeader column={column} title='Name En'/>
        ),
        cell: ({row}) => {
            const label = labels.find((label) => label.value === row.original.label)

            return (
                <div className='flex space-x-2'>
                    {label && <Badge variant='outline'>{label.label}</Badge>}
                    <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[250px]'>
            {row.getValue('questionEn')}
          </span>
                </div>
            )
        },
    }, {
        accessorKey: 'questionAr',
        header: ({column}) => (
            <DataTableColumnHeader column={column} title='Name Ar'/>
        ),
        cell: ({row}) => {
            const label = labels.find((label) => label.value === row.original.label)

            return (
                <div className='flex space-x-2'>
                    {label && <Badge variant='outline'>{label.label}</Badge>}
                    <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[250px]'>
            {row.getValue('questionAr')}
          </span>
                </div>
            )
        },
    }, {
        accessorKey: 'correctAnswersCount',
        header: ({column}) => (
            <DataTableColumnHeader column={column} title='Correct answers'/>
        ),
        cell: ({row}) => {
            const label = labels.find((label) => label.value === row.original.label)

            return (
                <div className='flex space-x-2'>
                    {label && <Badge variant='outline'>{label.label}</Badge>}
                    <span className='max-w-32  ms-12  truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('correctAnswersCount')}
          </span>
                </div>
            )
        },
    }, {
        accessorKey: 'type',
        header: ({column}) => (
            <DataTableColumnHeader column={column} title='Type'/>
        ),
        cell: ({row}) => {
            const label = labels.find((label) => label.value === row.original.label)

            return (
                <div className='flex space-x-2'>
                    {label && <Badge variant='outline'>{label.label}</Badge>}
                    <span className='max-w-32  truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('type')}
          </span>
                </div>
            )
        },
    }, {
        accessorKey: 'reference',
        header: ({column}) => (
            <DataTableColumnHeader column={column} title='Reference'/>
        ),
        cell: ({row}) => {
            const label = labels.find((label) => label.value === row.original.label)

            return (
                <div className='flex space-x-2'>
                    {label && <Badge variant='outline'>{label.label}</Badge>}
                    <span className='max-w-32  truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('reference')}
          </span>
                </div>
            )
        },
    }, {
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
    },

    {
        id: 'actions',
        cell: ({row}) => <DataTableRowActions row={row}/>,

    },

]

