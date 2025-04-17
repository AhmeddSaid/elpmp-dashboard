import {ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon,} from '@radix-ui/react-icons'
import {Table} from '@tanstack/react-table'
import {Button} from '@/components/ui/button'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

interface DataTablePaginationProps<TData> {
    table: Table<TData>
}

export function DataTablePagination<TData>({
                                               page,
                                               size,
                                               showing,
                                               lastPage,
                                               total,
                                               handlePageSize,
                                               handlePageChange,
                                               table,
                                           }: DataTablePaginationProps<TData>) {
    return (

        <div
            className="flex items-center justify-between overflow-clip px-2"
            style={{overflowClipMargin: 1}}
        >
            <div className="hidden flex-1 text-sm text-muted-foreground sm:block">
                {table.getFilteredSelectedRowModel().rows.length} of {showing} row(s)
                selected.
            </div>
            <div className="flex items-center sm:space-x-6 lg:space-x-8">
             <div className="flex items-center space-x-2">
          <p className="hidden text-sm font-medium sm:block">Rows per page</p>
          <Select
            name="size"
            id="size"
            value={size.toString()}
            defaultValue={size.toString()}
            onValueChange={(value) => {
              handlePageSize(value.toString());
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={size} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                    Page {page} of {lastPage}
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => handlePageChange("1")}
                        disabled={page === 1}
                    >
                        <span className="sr-only">Go to first page</span>
                        <DoubleArrowLeftIcon className="h-4 w-4"/>
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => handlePageChange(String(Number(page) - 1))}
                        disabled={page === 1}
                    >
                        <span className="sr-only">Go to previous page</span>
                        <ChevronLeftIcon className="h-4 w-4"/>
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => handlePageChange(String(Number(page) + 1))}
                        disabled={page === lastPage}
                    >
                        <span className="sr-only">Go to next page</span>
                        <ChevronRightIcon className="h-4 w-4"/>
                    </Button>
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => handlePageChange(String(lastPage))}
                        disabled={page === lastPage}
                    >
                        <span className="sr-only">Go to last page</span>
                        <DoubleArrowRightIcon className="h-4 w-4"/>
                    </Button>
                </div>
            </div>
        </div>
    )
}
