import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchFirstFoto } from '../redux/slice/getUrlFirstFoto';
import IsLoading from '../components/IsLoading';

function Home() {
  const dispatch = useDispatch()
  const { dataFirstFoto, status } = useSelector(store => store.getUrlFirstFoto)
  const { searchValue } = useSelector(store => store.cakeSlice)
  const dataFirstPhoto = dataFirstFoto.data;
  // console.log(dataFirstPhoto);

  const getUrlFirstFoto = async () => {
    const searchUrl = searchValue ? `search=${searchValue}` : ''
    const urlFirstFoto = `/api/albums/firstPhoto?&${searchUrl}`
    dispatch(fetchFirstFoto({ urlFirstFoto })

    )
  }
  useEffect(() => {
    getUrlFirstFoto()
  }, [])

  const isLoading = [...new Array(22)].map((_, idx) => <IsLoading key={idx} />)

  return (
    <>
      <div className='choose_cake_div'>
        <div className='all_cakes'>
          <p>Choose a cake for your celebration</p>
        </div>
      </div>
      {
        status === 'error' ? (
          <div className='error_try-later'>
            <div className='error'>
              <p >An error has occurred
                <span> <img className='nosmile' src="./img/nosmile.png" alt="" />
                </span>
              </p>
            </div>
            <div>
              <p className='try later'>Please try again later.</p>
            </div>
          </div>
        ) : (<div className='albums'>{status === 'loading' ? isLoading :

          dataFirstPhoto.map((el) => <Link key={el.album.album_number} style={{ textDecoration: 'none' }} to={`${el.album._id}`} >
            <div className='first_foto'>
              <img src={el.firstPhoto.src} alt="" />
              <div className='title_price'>
                <p>{el.album.album_number}.{el.album.title}</p>
              </div>
            </div>
          </Link>)

        } </div>)
      }
    </>
  )
}

export default Home

