import React from 'react'

function Slices({ slices }) {

    return (

        <div className='photos_in_album'> {
            slices.map((el) =>
                <div key={el.id} className='one_photo_from_alb'>
                    <img src={el.src} alt="" />
                    <div className='title_price'>
                        <p>{el.title + '(№' + el.id + ')'}</p>
                        <p>{el.price}</p>
                    </div>

                </div>

            )
        }

        </div>
    )
}

export default Slices