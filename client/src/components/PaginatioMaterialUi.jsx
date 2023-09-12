import React from 'react'

import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
function PaginatioMaterialUi({ currentPage, handleClick }) {

  const handlePageClick = (num) => {
    handleClick(num)
  }

  return (
  
      <Stack spacing={2}>
        <Pagination count={30} variant="outlined" onChange={(_, page) => handlePageClick(page)} />
      </Stack>

  )
}

export default PaginatioMaterialUi