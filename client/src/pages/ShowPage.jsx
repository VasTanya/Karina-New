import React from 'react'
import { Link } from 'react-router-dom'

function ShowPage({ dataFirstPhoto }) {
  return (
    <>
      <div className='choose_cake_div'>
        <div className='all_cakes'>
          <p>Choose a cake for your celebration</p>
        </div>
      </div>
      <div className='albums'>
        {
          dataFirstPhoto.map((el) => <Link  key={el.id}  style={{ textDecoration: 'none' }} to={`${el.id}`} >
            <div className='first_foto'>
              <img src={el.img} alt="" />
              <div className='title_price'>
                <p>{el.id}.{el.title}</p>
              </div>           
            </div>
          </Link>)
        }
      </div>
    </>
  )
}


export default ShowPage

