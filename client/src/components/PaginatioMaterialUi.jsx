import React from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'

import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

function PaginatioMaterialUi({ currentPage, handleClick }) {
  const {data_Id_Albums}= useSelector(store => store.getUrl_Id_Albums)
  const data_Id_AlbumsAll = data_Id_Albums.data

  const handlePageClick = (num) => {
    handleClick(num)
  }

  return (
  
      <Stack spacing={2}>
        <Pagination count={Math.ceil(data_Id_AlbumsAll.count/48)} variant="outlined" onChange={(_, page) => handlePageClick(page)} page={currentPage} />
      </Stack>

  )
}

export default PaginatioMaterialUi