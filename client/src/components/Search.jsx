import React, { useState, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { setSearchValue } from '../redux/slice/cakeSlice'
import { useDispatch, useSelector } from 'react-redux'
import qs from 'qs'
import debounce from 'lodash.debounce'
import Home from '../pages/Home'

function Search() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()
  const [velInp, setVelInp] = useState('')
  const { searchValue } = useSelector(store => store.cakeSlice)

  const updataSearch = useCallback(
    debounce((text) => {
      dispatch(setSearchValue(text))
    }, 1000),
    [],
  )

  const onClickInput = (e) => {
    setVelInp(e.target.value)
    // setSearchValue(e.target.value)
    updataSearch(e.target.value)
    const queryString = qs.stringify({
      id,
      // title,
      // albomId
    })
    navigate(`/search?${queryString}`)
  }

  const onClickIcons = () => {
    dispatch(setSearchValue(''))
    setVelInp('')
    navigate('/')
  }
  // const test = '21.277'
  // let text = '.'
  // const idxSin = test.indexOf(text)

  // const resultPrevSlice = test.slice(0, idxSin)
  // const resultNextSlice = test.slice(idxSin + 1)
  // console.log(resultPrevSlice + resultNextSlice);
  // console.log(resultNextSlice);
  return (
    <div className='div_search'>

      <input onChange={onClickInput}
        value={velInp}
        className='searchCake'
        type="text"
        placeholder='admin only'
      />
      {searchValue && <i onClick={onClickIcons} className="fa fa-times" aria-hidden="true"></i>}

    </div>
  )
}

export default Search

