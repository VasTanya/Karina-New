import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSlice } from '../redux/slice/getUrlSlice'
import IsLoading from './IsLoading'

function Slices() {

  const dispatch = useDispatch()
  const { dataSlices, status } = useSelector(store => store.getUrlSlice)
  const dataSlice = dataSlices.data

  const getUrlSlices = async () => {
    const urlSlices = '/api/slices'
    dispatch(fetchSlice({ urlSlices })
    )

  }
  useEffect(() => {
    getUrlSlices()
  }, [])

  const isLoading = [...new Array(12)].map((_, idx) => <IsLoading key={idx} />)

  return (
    <>
      {
        status === 'error' ? (
          <div className='error_try-later'>
            <div className='error'>
              <p>An error has occurred
                <span> <img className='nosmile' src="./img/nosmile.png" alt="" />
                </span>
              </p>
            </div>
            <div>
              <p className='Try later'>Please try again later.</p>
            </div>
          </div>
        ) : (<div className='photos_in_album'>{status === 'loading' ? isLoading :
          dataSlice.map((el) =>
            <div key={el.display_number} className='one_photo_from_alb'>
              <img src={el.src} alt="" />
              <div className='title_price'>
                <p>{el.title + '(№' + el.display_number + ')'}</p>
                <p>{el.price}</p>
              </div>
            </div>
          )
        } </div>)
      }
    </>
  )
}

export default Slices