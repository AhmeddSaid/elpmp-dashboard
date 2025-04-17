import {IconDownload, IconPlus} from '@tabler/icons-react'
import {Button} from '@/components/ui/button'
import {useTasks} from '../context/tasks-context'
import Link from "next/link";

export function TasksPrimaryButtons() {
    const {setOpen} = useTasks()
    return (
        <div className='flex gap-2'>
            <Button
                variant='outline'
                className='space-x-1'
                onClick={() => setOpen('import')}
            >
                <span>Import</span> <IconDownload size={18}/>
            </Button>

            <Link href={"/questions/create-question"}>

                <Button className='space-x-1'>
                    <span>Create</span> <IconPlus size={18}/>
                </Button>
            </Link>
        </div>
    )
}
