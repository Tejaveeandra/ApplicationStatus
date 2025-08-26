import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import "./ApplicationStatusDataTable.css";

const ApplicationStatusDataTable = ({ columns, data, onUpdate, onSelectRow, pageIndex, setPageIndex, pageSize, totalData }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Helper to determine indeterminate state
  const isIndeterminate =
    table.getRowModel().rows.some((r) => r.original.isSelected) &&
    !table.getRowModel().rows.every((r) => r.original.isSelected);

  return (
    <div className="table-wrapper">
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              {/* Checkbox header (for "select all") */}
              <th className="checkbox-header">
                <input
                  type="checkbox"
                  className={`custom-checkbox ${isIndeterminate ? "indeterminate" : ""}`}
                  checked={table.getRowModel().rows.every((r) => r.original.isSelected)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    table.getRowModel().rows.forEach((row) =>
                      onSelectRow(row.original, checked)
                    );
                  }}
                />
              </th>

              {table.getHeaderGroups().map((headerGroup) =>
                headerGroup.headers.map((header) => (
                  <th key={header.id} className="table-header">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))
              )}
              <th className="table-header-empty"></th>
            </tr>
          </thead>
          <tbody className="table-body">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="table-row">
                {/* Checkbox for each row */}
                <td className="checkbox-cell">
                  <input
                    type="checkbox"
                    className="custom-checkbox"
                    checked={row.original.isSelected || false}
                    onChange={(e) => onSelectRow(row.original, e.target.checked)}
                  />
                </td>

                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="table-cell">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                <td className="table-cell">
                  {row.original.status !== "Damaged" && row.original.status !== "Confirmed" && (
                    <button
                      onClick={() => onUpdate(row.original)}
                      className="update_btn"
                    >
                      Update
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination_content">
        <span className="pagination_content_left">
          Showing{" "}
          <span className="pagination_highlight">
            {pageIndex * pageSize + 1} to{" "}
            {Math.min((pageIndex + 1) * pageSize, totalData)}
          </span>{" "}
          of <span className="pagination_highlight">{totalData}</span> Entries
        </span>

        <div className="pagination_content_right">
          <span className="pagination_info">
            {pageIndex + 1} - {Math.ceil(totalData / pageSize)} of{" "}
            {Math.ceil(totalData / pageSize)}
          </span>

          <div className="pagination_buttons">
            {/* Prev Button */}
            <button
              className={`prev_button ${pageIndex === 0 ? "disabled" : ""}`}
              onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
              disabled={pageIndex === 0}
            >
              Prev
            </button>

            {/* Next Button */}
            <button
              className={`next_button ${
                (pageIndex + 1) * pageSize >= totalData ? "disabled" : ""
              }`}
              onClick={() =>
                setPageIndex((prev) =>
                  (prev + 1) * pageSize < totalData ? prev + 1 : prev
                )
              }
              disabled={(pageIndex + 1) * pageSize >= totalData}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationStatusDataTable;