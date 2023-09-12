import React, { useEffect, useState } from 'react'
import qs from 'qs'
import { Link, useParams } from 'react-router-dom'

function AskCoustOfThisCake({ dataImages }) {
    const [filterCakes, setFilterCakes] = useState({})
    const [title, setTitle] = useState({})
    const [albomsId, setAlbomsId] = useState(0)
    const { id } = useParams()

    useEffect(() => {
        const urlLink = qs.parse(window.location.search.substring(1))
        const oneCake = dataImages.filter((obj) => obj.title === urlLink.title)

        setAlbomsId(urlLink.albomId)
        let img = oneCake[0].imgArray.filter((el) => el.id === +urlLink.id)
        setFilterCakes({ ...img[0] })
        setTitle(urlLink.title)
    }, [])

    return (
        <div className='one_cake_div_and_mail'>
            <div className='one_cake_div'>
                <img src={filterCakes.src} alt="" />
                <p>{albomsId + '.' + filterCakes.id}</p>
            </div>


            <form className='mail_form' action="">
                <h6>Send a request to calculate the cost of this cake:</h6>
                <img src={filterCakes.src} alt="" />
                <p>{albomsId + '.' + filterCakes.id}</p>
                <input type="text" placeholder='Youre name' />
                <input type="text" required placeholder='Youre phone*' />
                <input type="text" required placeholder='Youre email*' />
                <input type="text" placeholder='Size(inches)' />
                <input type="text" placeholder='Cake filling' />
                <Link style={{ textDecoration: 'none' }} to={'mailto:karinas515@gmail.com'}>
                    <button>Send</button>
                </Link>
            </form>
        </div>
    )
}

export default AskCoustOfThisCake
