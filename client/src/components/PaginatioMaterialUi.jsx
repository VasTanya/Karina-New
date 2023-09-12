import React from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'

import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

function PaginatioMaterialUi({ currentPage, handleClick }) {
  const {dataAlbums} = useSelector(store=> store.getUrlAlbums)

  const handlePageClick = (num) => {
    handleClick(num)
  }

  return (
  
      <Stack spacing={2}>
        <Pagination count={30} variant="outlined" onChange={(_, page) => handlePageClick(page)} page={currentPage} />
      </Stack>

  )
}

export default PaginatioMaterialUi