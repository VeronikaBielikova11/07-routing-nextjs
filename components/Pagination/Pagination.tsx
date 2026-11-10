"use client";

import ReactPaginateModule from "react-paginate";
import css from "./Pagination.module.css";

type ReactPaginateComponent = typeof ReactPaginateModule;

// react-paginate is a CommonJS package: after bundling, the component can be
// either the import itself or its "default" field.
const ReactPaginate =
  (ReactPaginateModule as unknown as { default?: ReactPaginateComponent })
    .default ?? ReactPaginateModule;

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  pageCount,
  currentPage,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }: { selected: number }) =>
        onPageChange(selected + 1)
      }
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
}
