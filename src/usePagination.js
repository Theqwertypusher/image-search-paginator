import { useState, useEffect } from "react";

export function usePagination(data, itemsPerPage) {
  const [pageSize, setPageSize] = useState(itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(Math.ceil(data.length / itemsPerPage));

  useEffect(() => {
    const max = Math.ceil(data.length / pageSize);
    setMaxPage(max);
  }, [pageSize, data]);

  function currentData() {
    const begin = (currentPage - 1) * pageSize;
    let end = begin + pageSize;
    // if (!data[end]) end = data.length - 1
    return data.slice(begin, end);
  }

  function handlePageChange(val) {
    console.log("log val", val);
    if (val > currentPage) next();
    if (val < currentPage) prev();
  }

  function next() {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  }

  function prev() {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  }

  function handleSizeChange(val) {
    setPageSize(val);
  }

  return {
    currentData,
    currentPage,
    maxPage,
    pageSize,
    handlePageChange,
    handleSizeChange,
  };
}
