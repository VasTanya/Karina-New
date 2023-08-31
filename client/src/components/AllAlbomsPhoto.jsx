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

    const [filDataMore, setFilDataMore] = useState([])
    const [title, setTitle] = useState('')
    const [albomId, setAlbomId] = useState(0)
    const { id } = useParams()
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const { dataAlbums,aloboms, status } = useSelector(store => store.getUrlAlbums)
    const {data_Id_Albums, statusId}= useSelector(store => store.getUrl_Id_Albums)
    const { currentPage } = useSelector((store) => store.cakeSlice)
    
    const data_Id_AlbumsAll = data_Id_Albums.data
    

    const isLoading = [...new Array(12)].map((_, idx) => <IsLoading key={idx} />)

    const getUrlAlbum = async () => {
        const urlAlboms = `/api/albums?id=${id}`
        dispatch(fetchAlbums({ urlAlboms })
        )
    }
    // const getUrl_Id_Albums = async () => {
    //     const url_Id_Albums = '/api/albums/_id'
    //     dispatch(fetch_Id_Albums({ url_Id_Albums })    
    //     )
    // }

    useEffect(() => {
        getUrlAlbum()
        // getUrl_Id_Albums()
        // const newPhotoAlbum = dataAlbumsAll.filter((obj) => obj.album_number === +id)
        // console.log(newPhotoAlbum);
    }, [])

    // useEffect(() => {
    //     const newData = dataAlbumsAll.filter((obj) => obj.album_number === +id)
    //     if (newData) {
    //         setFilDataMore(...newData.map((el) => {
    //             if (el.imgArray) {
    //                 setTitle(el.title)
    //                 setAlbomId(el.id)
    //                 return el.imgArray
    //             } else {
    //                 navigate('/')
    //             }
    //         }))
    //     } else {
    //         navigate('/')
    //     }
    // }, [])

    const onClickPages = (num) => {
        dispatch(setCurrentPage(num))
    }

    const onClickImg = (id) => {
        const queryString = qs.stringify({
            id,
            title,
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
        dataAlbums.map((el) =>
                <div onClick={() => onClickImg(el.display_number)} key={el.album_number} >
                    <div className='one_photo_from_alb'>
                        <img src={el.album.src} alt="" />
                        <div className='title_price'>
                            <p>{el.album_number + '.' + el.album.display_number}</p>
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





            //     {/* <div className='photos_in_album'>
            //     {
            //         filDataMore?.map((el) => 
            //         <div onClick={() => onClickImg(el.id)} key={el.id} >
            //             <div className='one_photo_from_alb'>
            //                 <img src={el.src} alt="" />
            //                 <div className='title_price'>
            //                     <p>{albomId + '.' + el.id}</p>
            //                 </div>

            //             </div>
            //         </div>
            //         )
            //     }


            // </div>
            //   */}


            //     {/* <div className='pagination'>
            //    status === 'successful' &&  <PaginatioMaterialUi currentPage={currentPage} handleClick={(num) => onClickPages(num)} />
            // </div> */}
            // <div>{

            //     status === 'successful' && <Pagination pageCount={pageCount} setPageCount={(num) => dispatch(setPageCount(num))} />
            //   }
      
            //   </div>