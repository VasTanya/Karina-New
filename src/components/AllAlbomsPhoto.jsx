import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import qs from 'qs'

function AllAlbomsPhoto({ dataImages }) {

    const [filDataMore, setFilDataMore] = useState([])
    const [title, setTitle] = useState('')
    const [albomId, setAlbomId] = useState(0)
    const { id } = useParams()
    const navigate = useNavigate()
    
    useEffect(() => {
        const newData = dataImages.filter((obj) => obj.id === +id)
        if (newData) {
            setFilDataMore(...newData.map((el) => {
                if (el.imgArray) {
                    setTitle(el.title)
                    setAlbomId(el.id)
                    return el.imgArray
                } else {
                    navigate('/')
                }
            }))
        } else {
            navigate('/')
        }
    }, [])

    const onClickImg =(id)=> {
        const queryString = qs.stringify({
            id,
            title,
            albomId
        })      
        navigate(`/cake?${queryString}`)     
    }
    
    return (
        <div className='photos_in_album'>
            {
                filDataMore?.map((el) =><div onClick={()=>onClickImg(el.id)} key={el.id} >
                    <div className='one_photo_from_alb'>
                         <img src={el.src} alt="" />
                         <div className='title_price'>
                            <p>{albomId+ '.' +el.id}</p>
                         </div>
                         
                    </div>
                    </div>
                    )
            }
        </div>
    )
}

export default AllAlbomsPhoto