'use client';
import { tableColumnsArray, tableRowsArray } from '@/lib/constants';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React, { useState } from 'react';
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Eye,
  Search,
} from 'lucide-react';

function Table() {
  const [data] = useState(() => tableRowsArray ?? []);
  const [sorting, setSorting] = useState<any>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [selectedRows, setSelectedRows] = useState<{ [key: string]: boolean }>(
    {}
  );

  const columnHelper = createColumnHelper();

  const columns: any = [
    columnHelper.display({
      id: 'select',
      header: () => (
        <input
          type="checkbox"
          className="h-4 w-4"
          onChange={(e) => {
            const checked = e.target.checked;
            const newSelectedRows = Object.fromEntries(
              data.map((row, index) => [index, checked])
            );
            setSelectedRows(newSelectedRows);
          }}
          checked={
            Object.values(selectedRows).every(Boolean) && data.length > 0
          }
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          className="h-4 w-4"
          checked={selectedRows[row.index] || false}
          onChange={(e) => {
            setSelectedRows((prev) => ({
              ...prev,
              [row.index]: e.target.checked,
            }));
          }}
        />
      ),
    }),
    ...tableColumnsArray.map((val) =>
      columnHelper.accessor(val.value.toString(), {
        cell: (info) => info.getValue(),
        header: () => <div className="flex items-center">{val.label}</div>,
      })
    ),
    columnHelper.display({
      id: 'actions',
      header: () => <div className="text-center">Action</div>,
      cell: ({ row }) => (
        <button
          className="p-2 text-gray-600 hover:text-indigo-600"
          onClick={() => alert(`Viewing row ${row.index + 1}`)}
        >
          <Eye size={18} />
        </button>
      ),
    }),
  ];

  const table = useReactTable({
    columns,
    data,
    state: { sorting, globalFilter, pagination },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="flex flex-col min-h-screen max-w-4xl mx-auto py-12 px-4">
      <div className="mb-4 relative">
        <input
          value={globalFilter ?? ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 text-slate-900 focus:border-indigo-500"
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500"
          size={20}
        />
      </div>
      <div className="bg-slate-50 text-slate-900 shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, ind) => (
                  <th
                    key={header.id}
                    className="px-3 py-1 md:px-6 md:py-3 text-xs text-left font-medium text-slate-700 uppercase tracking-wider"
                  >
                    <div
                      {...{
                        className: `${
                          header.column.getCanSort()
                            ? 'cursor-pointer select-none flex items-center justify-center'
                            : ''
                        } ${ind > 0 && 'w-40'}`,
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanSort() && (
                        <ArrowUpDown className="ml-2" size={14} />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-slate-50 divide-y divide-slate-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-slate-100">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-3 py-1 md:px-6 md:py-3 whitespace-nowrap text-sm text-slate-700 text-center"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-sm text-gray-700">
        <div className="flex items-center mb-4 sm:mb-0">
          <span className="mr-2">Items per page</span>
          <select
            className="border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
            value={pagination.pageSize}
            onChange={(e) => {
              setPagination((prev) => ({
                ...prev,
                pageSize: Number(e.target.value),
              }));
            }}
          >
            {[5, 10, 20, 30].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <button
            className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft size={20} />
          </button>

          <button
            className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft size={20} />
          </button>

          <span className="flex items-center">
            <input
              min={1}
              max={table.getPageCount()}
              type="number"
              value={pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                setPagination((prev) => ({ ...prev, pageIndex: page }));
              }}
              className="w-16 p-2 rounded-md border border-gray-300 text-center"
            />
            <span className="ml-1">of {table.getPageCount()}</span>
          </span>

          <button
            className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight size={20} />
          </button>

          <button
            className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Table;
