import React from 'react'



function Regular({regular}) {


    return (
        <div className='photos_in_album'> {
            regular.map((el) =>
                <div className='one_photo_from_alb' key={el.id}>
                    <img src={el.src} alt="" />
                    <div className='title_price'>
                        <p>{el.title + '(№' + el.id + ')'}</p>
                        <p>{el.price}</p>
                    </div>


                </div>)
        }

        </div>
    )
}

export default Regular