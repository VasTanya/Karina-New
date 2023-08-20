import React, { useState } from 'react'

function Search() {

    const [velInp, setVelInp] = useState('')
    const [searchValue, setSearchValue] = useState('')
  
    const onClickInput =(e)=> {
      setVelInp(e.target.value)
      setSearchValue(e.target.value)
    }
   
    const onClickIcons = ()=> {
      setSearchValue('')
      setVelInp('')
    }
    const test = '21.277'
    let text = '.'
    const idxSin = test.indexOf(text)
   
    const resultPrevSlice = test.slice(0,idxSin)
    const resultNextSlice = test.slice(idxSin+1)
    console.log(resultPrevSlice+resultNextSlice);
    // console.log(resultNextSlice);
  return (
    <div className='div_search'>
        
        <input onChange={onClickInput}
          value={velInp}
          className='searchCake'
          type="text"
          placeholder='search'
        />
        {searchValue && <i onClick={onClickIcons} className="fa fa-times" aria-hidden="true"></i>}
    
    </div>
  )
}

export default Search

