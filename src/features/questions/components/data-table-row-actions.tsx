import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { IconTrash } from "@tabler/icons-react";
import { Row } from "@tanstack/react-table";
import Link from "next/link";
import { useTasks } from "../context/tasks-context";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  // const task = taskSchema.parse(row.original)
  const { setOpen, setCurrentRow } = useTasks();

  // console.log(row, "row");
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <Link href={`/questions/${row.original.id}`}>
          <DropdownMenuItem
            onClick={() => {
              // setCurrentRow(task)
              // setOpen('update')
            }}
          >
            Edit
          </DropdownMenuItem>
        </Link>
        {/*<DropdownMenuItem disabled>Make a copy</DropdownMenuItem>*/}
        {/*<DropdownMenuItem disabled>Favorite</DropdownMenuItem>*/}
        {/*<DropdownMenuSeparator/>*/}
        {/*<DropdownMenuSub>*/}
        {/*    <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>*/}
        {/*    <DropdownMenuSubContent>*/}
        {/*        <DropdownMenuRadioGroup value={task.label}>*/}
        {/*            {labels.map((label) => (*/}
        {/*                <DropdownMenuRadioItem key={label.value} value={label.value}>*/}
        {/*                    {label.label}*/}
        {/*                </DropdownMenuRadioItem>*/}
        {/*            ))}*/}
        {/*        </DropdownMenuRadioGroup>*/}
        {/*    </DropdownMenuSubContent>*/}
        {/*</DropdownMenuSub>*/}
        {/*<DropdownMenuSeparator/>*/}
        <DropdownMenuItem
          onClick={() => {
            // setCurrentRow(task)
            setOpen("delete");
          }}
        >
          Delete
          <DropdownMenuShortcut>
            <IconTrash size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
