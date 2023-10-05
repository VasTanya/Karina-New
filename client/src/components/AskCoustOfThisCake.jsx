import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import qs from 'qs'
import { Link, useParams } from 'react-router-dom'
import { fetch_Id_Albums_Item } from '../redux/slice/getUrl_Id_Item'
import IsLoading from './IsLoading'

function AskCoustOfThisCake() {

    const [idCakeOne, setIdCakeOne] = useState({})
    const [idItemOne, setIdItemOne] = useState({})
    const [idItemPhotoOne, setIdItemPhotoOne] = useState({})
    // `/api/albums/${idCakeOne}/${idItemOne}`
    // fetch(`api/albums/${album_id}/${data._id}`);
    const { data_Id_Albums_Item, status } = useSelector(store => store.getUrl_Id_Item)
    const data_Id_Albums_ItemOne = data_Id_Albums_Item.data
    console.log(data_Id_Albums_ItemOne);

    const dispatch = useDispatch()
    const { id } = useParams()
    const isLoading = [...new Array(1)].map((_, idx) => <IsLoading key={idx} />)

    useEffect(() => {
        const urlLink = qs.parse(window.location.search.substring(1))
        setIdCakeOne(+urlLink.idCake)
        setIdItemOne(+urlLink.idItem)
        setIdItemPhotoOne(urlLink.idItemPhoto)
    }, [])

    const getUrl_Id_AlbumsItem = async () => {
        const url_Id_Albums_Item = `api/albums/${idCakeOne}/${idItemOne._id}`
        // const url_Id_Albums_Item = '/api/regular'
        dispatch(fetch_Id_Albums_Item({ url_Id_Albums_Item })
        )
    }

    useEffect(() => {
        getUrl_Id_AlbumsItem()
    }, [])

    return (
        <div className='one_cake_div_and_mail'>
            <div className='one_cake_div'>
                <img src={idItemPhotoOne} alt="" />
                <p>{idCakeOne + '.' + idItemOne}</p>
            </div>


            <form className='mail_form' action="">
                <h6>Send a request to calculate the cost of this cake:</h6>
                <img src={idItemPhotoOne} alt="" />
                <p>{idCakeOne + '.' + idItemOne}</p>
                <input type="text" placeholder='Youre name' />
                <input type="text" required placeholder='Youre phone*' />
                <input type="text" required placeholder='Youre email*' />
                <input type="text" placeholder='Size(inches)' />
                <input type="text" placeholder='Cake filling' />
                <Link style={{ textDecoration: 'none' }} to={'mailto:k2406718@gmail.com'}>
                    <button>Send</button>
                </Link>
            </form>
        </div>
    )

    // return (

    //     <div>

    //         {
    //             status === 'error' ? (
    //                 <div className='error_try-later'>
    //                     <div className='error'>
    //                         <p>An error has occurred
    //                             <span> <img className='nosmile' src="./img/nosmile.png" alt="" />
    //                             </span>
    //                         </p>
    //                     </div>
    //                     <div>
    //                         <p className='Try later'>Please try again later.</p>
    //                     </div>
    //                 </div>
    //             ) : (<div className='one_cake_div_and_mail'>{status === 'loading' ? isLoading :
    //                 data_Id_Albums_ItemOne.map((el) =>
    //                     <div key={el.album_number} className='one_cake_div'>
    //                         {/* <img src={idItemPhotoOne} alt="" />
    //                         <p>{idCakeOne + '.' + idItemOne}</p> */}
    //                     </div>
    //                 )
    //             } </div>)
    //         }

    //         <form className='mail_form' action="">
    //             <h6>Send a request to calculate the cost of this cake:</h6>
    //             <img src={idItemPhotoOne} alt="" />
    //             <p>{idCakeOne + '.' + idItemOne}</p>
    //             <input type="text" placeholder='Youre name' />
    //             <input type="text" required placeholder='Youre phone*' />
    //             <input type="text" required placeholder='Youre email*' />
    //             <input type="text" placeholder='Size(inches)' />
    //             <input type="text" placeholder='Cake filling' />
    //             <Link style={{ textDecoration: 'none' }} to={'mailto:k2406718@gmail.com'}>
    //                 <button>Send</button>
    //             </Link>
    //         </form>
    //     </div >
    // )

}

export default AskCoustOfThisCake
