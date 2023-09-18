import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import qs from 'qs'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../redux/slice/cakeSlice';
import PaginatioMaterialUi from './PaginatioMaterialUi';
import { fetchAlbums } from '../redux/slice/getUrlAlbums';
import { fetch_Id_Albums } from '../redux/slice/getUrl_Id_Albums';
import IsLoading from './IsLoading';

function AllAlbomsPhoto() {

    // const [filDataMore, setFilDataMore] = useState([])
    // const [title, setTitle] = useState('')
    const [albomId, setAlbomId] = useState(0)
    const { id } = useParams()
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const { dataAlbums,status } = useSelector(store => store.getUrlAlbums)
    const {data_Id_Albums, statusId}= useSelector(store => store.getUrl_Id_Albums)
    const { currentPage } = useSelector((store) => store.cakeSlice)
    console.log(dataAlbums);
    
    const data_Id_AlbumsAll = data_Id_Albums.data
    
    const isLoading = [...new Array(12)].map((_, idx) => <IsLoading key={idx} />)

    const getUrlAlbum = async () => {
        // const filter = dataAlbums.filter((el)=> el.album_number === id)
        const urlAlbums = `/api/albums?id=${id}&page=${currentPage}&limit=20&filter=${+id}`
        dispatch(fetchAlbums({ urlAlbums })
        )
    }
    // const getUrl_Id_Albums = async () => {
    //     const url_Id_Albums = '/api/albums/_id'
    //     dispatch(fetch_Id_Albums({ url_Id_Albums })    
    //     )
    // }

    useEffect(() => {
        getUrlAlbum()
    }, [currentPage,id])


    const onClickPages = (num) => {
        dispatch(setCurrentPage(num))
    }

    const onClickImg = (id) => {
        const queryString = qs.stringify({
            id,
            albomId
        })
        navigate(`/cake?${queryString}`)
    }

      return (
            <>
              {
        status/* && statusId*/ === 'error' ? (
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
        ) : (<div className='photos_in_album'>{status/* && statusId*/ === 'loading' ? isLoading :
        // urlAlbums 
         dataAlbums.map((el) =>
                <div onClick={() => onClickImg(id)} key={el.album_number} >
                    <div className='one_photo_from_alb'>
                        {/* <img src={el.album.src} alt="" /> */}
                        <div className='title_price'>
                            <p>{id + '.'/* + el.album.display_number*/}</p>
                        </div>
                   </div>
                </div>
                    )
        } </div>)
        }
          <div className='pagination'>{
            status /* && statusId */=== 'successful' &&  <PaginatioMaterialUi currentPage={currentPage} handleClick={(num) => onClickPages(num)} />
          }
          </div>
            </>


            )
}

export default AllAlbomsPhoto
