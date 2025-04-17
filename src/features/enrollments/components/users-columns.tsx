import LongText from "@/components/long-text";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { cn, formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { callTypes } from "../data/data";
import { enroll } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<enroll>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    meta: {
      className: cn(
        "sticky md:table-cell left-0 z-10 rounded-tl",
        "bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted"
      ),
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   id: "fullName",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Name" />
  //   ),
  //   cell: ({ row }) => {
  //     const { firstName, lastName } =
  //       row.original?.userId?.UserInformation[0] || {};
  //     const fullName = `${firstName} ${lastName}`;
  //     return <LongText>{fullName}</LongText>;
  //   },
  // },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => (
      <div className="w-fit text-nowrap">
        {row.original?.userId?.email || "N/A"}
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "nameEn",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Exam Name EN" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-x-2">
          <span className="text-sm capitalize">
            {row.original?.exam?.nameEn || "N/A"}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "examNameAr",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Exam Name AR" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-x-2">
          <span className="text-sm capitalize">
            {row.original?.exam?.nameAr || "n/a"}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.original.isActivate ? "active" : "inactive";
      const badgeColor = callTypes.get(status);
      return (
        <div className="flex space-x-2">
          <Badge variant="outline" className={cn("capitalize", badgeColor)}>
            {status}
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: "ActivatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Activated At" />
    ),
    cell: ({ row }) => (
      <div className="w-fit text-nowrap">
        {formatDate(row.getValue("ActivatedAt"))}
      </div>
    ),
  },
  {
    accessorKey: "ActiveUntil",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Activated Until" />
    ),
    cell: ({ row }) => (
      <div className="w-fit text-nowrap">
        {formatDate(row.getValue("ActiveUntil"))}
      </div>
    ),
  },

  {
    id: "actions",
    cell: DataTableRowActions,
  },
];
