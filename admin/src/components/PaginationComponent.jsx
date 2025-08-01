import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import "../css/Pagination.css";

function PaginationComponent({ currentPage, handleClick, count }) {
  const handlePageChange = (num) => {
    handleClick(num);
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={Math.ceil(count / 48)}
        variant="outlined"
        onChange={(_, page) => handlePageChange(page)}
        page={currentPage}
      />
    </Stack>
  );
}

export default PaginationComponent;
