import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import qs from 'qs'
import { fetch_Id_Albums_Item } from '../redux/slice/getUrl_Id_Item'
import { fetch_Request } from '../redux/slice/getUrl_Request'
import IsLoading from './IsLoading'

function AskCoustOfThisCake() {

    const [idCakeOne, setIdCakeOne] = useState({})
    const [idItemOne, setIdItemOne] = useState()
    const [idItemPhotoOne, setIdItemPhotoOne] = useState({})
    const [album_idOne, setAlbum_idOne] = useState()
    const [item_idOne, setItem_idOne] = useState()

    const [name, setName] = useState()
    const [phone, setPhone] = useState()
    const [email, setEmail] = useState()
    const [size, setSize] = useState()
    const [filling, setFilling] = useState()

    const { data_Id_Albums_Item, status } = useSelector(store => store.getUrl_Id_Item)
    // const { data_request, status1 } = useSelector(store => store.getUrl_Request)

    console.log('data', data_Id_Albums_Item);

    const dispatch = useDispatch()
    const isLoading = [...new Array(1)].map((_, idx) => <IsLoading key={idx} />)

    useEffect(() => {
        const urlLink = qs.parse(window.location.search.substring(1))
        // setIdCakeOne(urlLink.idCake)
        setIdItemOne(urlLink.idItem)
        // setIdItemPhotoOne(urlLink.idItemPhoto)
        setAlbum_idOne(urlLink.album_id)
        setItem_idOne(urlLink.item_id)
    }, [])

    // console.log(album_idOne);
    // console.log(item_idOne);


    const getUrl_Id_AlbumsItem = async () => {
        const url_Id_Albums_Item = `api/albums/${album_idOne}/${item_idOne}`
        // const url_Id_Albums_Item = `/api/albums/65245bcf6d75c97a95da6b47/65245bd06d75c97a95da6b5f`
        dispatch(fetch_Id_Albums_Item({ url_Id_Albums_Item })
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newRequest = {
            name: e.target[0].value,
            phone: e.target[1].value,
            email: e.target[2].value,
            size: e.target[3].value,
            filling: e.target[4].value,
            cakeCode: idCakeOne + '.' + idItemOne,
        }
        const url_request = 'api/request'
        dispatch(fetch_Request({ url: url_request, datainp: newRequest }))
    }

    useEffect(() => {
        getUrl_Id_AlbumsItem()
    }, [])

    return (
        <div className='one_cake_div_and_mail'>
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
                ) : (<div className='one_cake_div_and_mail'>{status === 'loading' ? isLoading :
                    
                        <div className='one_cake_div'>
                <img src={data_Id_Albums_Item.src} alt="" />
                <p>{data_Id_Albums_Item.display_number + '.' + idItemOne}</p>
            </div>
                    
                } </div>)
            }

            {/* <div className='one_cake_div'>
                <img src={data_Id_Albums_Item.src} alt="" />
                <p>{data_Id_Albums_Item.display_number + '.' + idItemOne}</p>
            </div> */}

            <form onSubmit={handleSubmit} className='mail_form' action="">
                <h6>Send a request to calculate the cost of this cake:</h6>
                <img src={data_Id_Albums_Item.src} alt="" />
                <p>{data_Id_Albums_Item.display_number + '.' + idItemOne}</p>

                <input value={name} type="text" placeholder='Youre name' />
                <input value={phone} type="text" required placeholder='Youre phone*' />
                <input value={email} type="text" required placeholder='Youre email*' />
                <input value={size} type="text" placeholder='Size(inches)' />
                <input value={filling} type="text" placeholder='Cake filling' />
                <button>Send</button>
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
    //                 data_Id_Albums_Item.map((el) =>
    //                     <div key={el.display_number} className='one_cake_div'>
    //                         {/* <img src={el.src} alt="" />
    //                         <p>{idCakeOne + '.' + idItemOne}</p> */}
    //                     </div>
    //                 )
    //             } </div>)
    //         }

    //         <form onSubmit={handleSubmit} className='mail_form' action="">
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
